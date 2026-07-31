import { Resend } from "resend";
import { getSiteUrl } from "@/lib/site";

export type NewsletterSubscriber = {
  id?: string;
  email: string;
  subscribedAt?: string;
};

export type NewsletterSendPayload = {
  subject: string;
  title: string;
  preview: string;
  content: string;
  url?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function resolveResendConfig():
  | { resend: Resend; audienceId: string }
  | { error: string } {
  const apiKey =
    process.env.RESEND_API_KEY ??
    process.env.RESEND_KEY ??
    process.env.MAIL_PASSWORD;

  if (!apiKey) {
    return { error: "Resend API key is not configured." };
  }

  const audienceId =
    process.env.RESEND_AUDIENCE_ID ?? process.env.RESEND_SEGMENT_ID;

  if (!audienceId) {
    return {
      error:
        "Resend audience is not configured. Set RESEND_AUDIENCE_ID.",
    };
  }

  return {
    resend: new Resend(apiKey),
    audienceId,
  };
}

function resolveFromAddress(): string {
  if (process.env.CONTACT_FROM_EMAIL) return process.env.CONTACT_FROM_EMAIL;

  const address = process.env.MAIL_FROM_ADDRESS;
  const name = process.env.MAIL_FROM_NAME;
  if (address && name) return `${name} <${address}>`;
  if (address) return address;

  return "Owencodes Newsletter <onboarding@resend.dev>";
}

function resolveNoReplyFromAddress(): string {
  if (process.env.NEWSLETTER_NO_REPLY_FROM) {
    return process.env.NEWSLETTER_NO_REPLY_FROM;
  }

  const address = process.env.MAIL_FROM_ADDRESS;
  if (address && address.includes("@")) {
    const [, domain] = address.split("@");
    if (domain) {
      return `Owencodes No Reply <no-reply@${domain}>`;
    }
  }

  return "Owencodes No Reply <onboarding@resend.dev>";
}

function extractEmailAddress(value: string): string {
  const angleMatch = value.match(/<([^>]+)>/);
  if (angleMatch?.[1]) {
    return angleMatch[1].trim();
  }
  return value.trim();
}

function isContactAlreadyPresent(message: string): boolean {
  return /already|exists|duplicate/i.test(message);
}

export async function addNewsletterSubscriber(email: string): Promise<{
  ok: boolean;
  created: boolean;
  message: string;
  subscriber?: NewsletterSubscriber;
}> {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || !EMAIL_RE.test(trimmed)) {
    return {
      ok: false,
      created: false,
      message: "Please enter a valid email address.",
    };
  }

  const config = resolveResendConfig();
  if ("error" in config) {
    return {
      ok: false,
      created: false,
      message: config.error,
    };
  }

  const { resend, audienceId } = config;

  const existing = await resend.contacts.get({
    audienceId,
    email: trimmed,
  });

  if (existing.data) {
    return {
      ok: true,
      created: false,
      message: "You’re already subscribed to updates.",
      subscriber: {
        id: existing.data.id,
        email: existing.data.email,
        subscribedAt: existing.data.created_at,
      },
    };
  }

  const created = await resend.contacts.create({
    audienceId,
    email: trimmed,
    unsubscribed: false,
  });

  if (created.error) {
    if (isContactAlreadyPresent(created.error.message)) {
      return {
        ok: true,
        created: false,
        message: "You’re already subscribed to updates.",
      };
    }

    console.error("Failed to create newsletter contact:", created.error);
    return {
      ok: false,
      created: false,
      message: "Unable to subscribe right now. Please try again later.",
    };
  }

  return {
    ok: true,
    created: true,
    message: "Thanks for subscribing — you’ll hear from me with new updates.",
    subscriber: {
      id: created.data?.id,
      email: trimmed,
      subscribedAt: new Date().toISOString(),
    },
  };
}

export async function sendWelcomeEmail(email: string): Promise<{
  ok: boolean;
  error?: string;
}> {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || !EMAIL_RE.test(trimmed)) {
    return {
      ok: false,
      error: "Please enter a valid email address.",
    };
  }

  const config = resolveResendConfig();
  if ("error" in config) {
    return {
      ok: false,
      error: config.error,
    };
  }

  const templateId = process.env.RESEND_WELCOME_TEMPLATE_ID;
  if (!templateId) {
    return {
      ok: false,
      error: "Welcome email template is not configured.",
    };
  }

  const { resend } = config;
  const fromAddress = resolveNoReplyFromAddress();
  const siteUrl = getSiteUrl();
  const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(trimmed)}`;

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: [trimmed],
    replyTo: [extractEmailAddress(fromAddress)],
    template: {
      id: templateId,
      variables: {
        SITE_URL: siteUrl,
        UNSUBSCRIBE_URL: unsubscribeUrl,
      },
    },
  });

  if (error) {
    console.error("Failed to send newsletter welcome email:", error);
    return {
      ok: false,
      error: String(error),
    };
  }

  return { ok: true };
}

export async function removeNewsletterSubscriber(email: string): Promise<boolean> {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return false;

  const config = resolveResendConfig();
  if ("error" in config) {
    return false;
  }

  const { resend, audienceId } = config;
  const removed = await resend.contacts.remove({
    audienceId,
    email: trimmed,
  });

  return Boolean(removed.data?.deleted);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendNewsletter(payload: NewsletterSendPayload): Promise<{
  ok: boolean;
  broadcastId?: string;
  error?: string;
}> {
  const config = resolveResendConfig();
  if ("error" in config) {
    return {
      ok: false,
      error: config.error,
    };
  }

  const { resend, audienceId } = config;
  const fromAddress = resolveFromAddress();
  const siteUrl = getSiteUrl();

  const textBody = [
    payload.title,
    "",
    payload.preview,
    "",
    payload.content,
    "",
    `Read more: ${payload.url ?? siteUrl}`,
    "",
    "Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}",
  ].join("\n");

  const htmlBody = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #0f172a; line-height: 1.6;">
      <h2 style="margin: 0 0 12px;">${escapeHtml(payload.title)}</h2>
      <p style="margin: 0 0 12px;">${escapeHtml(payload.preview)}</p>
      <div style="padding: 16px; border-radius: 8px; background: #f8fafc; border: 1px solid #e2e8f0; margin: 16px 0; white-space: pre-line;">
        ${escapeHtml(payload.content)}
      </div>
      <p style="margin: 16px 0 0;"><a href="${escapeHtml(payload.url ?? siteUrl)}" style="color: #0891b2;">Read the update</a></p>
      <p style="margin: 24px 0 0; font-size: 12px; color: #64748b;">
        You’re receiving this because you subscribed to updates from Owencodes.
        <br />
        <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: #64748b;">Unsubscribe</a>
      </p>
    </div>
  `;

  const { data, error } = await resend.broadcasts.create({
    audienceId,
    from: fromAddress,
    subject: payload.subject,
    previewText: payload.preview,
    html: htmlBody,
    text: textBody,
    send: true,
  });

  if (error) {
    console.error("Failed to send newsletter broadcast:", error);
    return {
      ok: false,
      error: String(error),
    };
  }

  return { ok: true, broadcastId: data?.id };
}
