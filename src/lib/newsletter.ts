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

  const { resend } = config;
  const fromAddress = resolveNoReplyFromAddress();
  const siteUrl = getSiteUrl();
  const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(trimmed)}`;
  const subject = "Welcome to Owencodes updates";
  const textBody = [
    "Thanks for subscribing to updates from Owencodes.",
    "",
    "You’ll get occasional emails when I publish new blogs, projects, or useful updates.",
    "",
    `Visit the site: ${siteUrl}`,
    "",
    `Unsubscribe: ${unsubscribeUrl}`,
  ].join("\n");
  const htmlBody = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #0f172a; line-height: 1.6;">
      <h2 style="margin: 0 0 12px;">Welcome to Owencodes updates</h2>
      <p style="margin: 0 0 12px;">Thanks for subscribing. You’ll get occasional emails when I publish new blogs, projects, or useful updates.</p>
      <p style="margin: 16px 0 0;"><a href="${escapeHtml(siteUrl)}" style="color: #0891b2;">Visit the site</a></p>
      <p style="margin: 24px 0 0; font-size: 12px; color: #64748b;">
        You’re receiving this because you subscribed to updates from Owencodes.
        <br />
        <a href="${escapeHtml(unsubscribeUrl)}" style="color: #64748b;">Unsubscribe</a>
      </p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: [trimmed],
    subject,
    replyTo: [extractEmailAddress(fromAddress)],
    text: textBody,
    html: htmlBody,
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

async function getNewsletterSubscribers(): Promise<{
  subscribers: NewsletterSubscriber[];
  error?: string;
}> {
  const config = resolveResendConfig();
  if ("error" in config) {
    return {
      subscribers: [],
      error: config.error,
    };
  }

  const { resend, audienceId } = config;
  const subscribers: NewsletterSubscriber[] = [];
  let after: string | undefined;

  while (true) {
    const listResponse = await resend.contacts.list({
      audienceId,
      limit: 100,
      ...(after ? { after } : {}),
    });

    if (listResponse.error) {
      return {
        subscribers: [],
        error: "Unable to load newsletter subscribers from Resend.",
      };
    }

    const batch = listResponse.data?.data ?? [];
    subscribers.push(
      ...batch.map((item) => ({
        id: item.id,
        email: item.email,
        subscribedAt: item.created_at,
      })),
    );

    if (!listResponse.data?.has_more || batch.length === 0) {
      break;
    }

    after = batch[batch.length - 1]?.id;
    if (!after) break;
  }

  return { subscribers };
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
  sentCount: number;
  errors: string[];
  error?: string;
}> {
  const config = resolveResendConfig();
  if ("error" in config) {
    return {
      ok: false,
      sentCount: 0,
      errors: [],
      error: config.error,
    };
  }

  const subscribersResult = await getNewsletterSubscribers();
  if (subscribersResult.error) {
    return {
      ok: false,
      sentCount: 0,
      errors: [],
      error: subscribersResult.error,
    };
  }

  const subscribers = subscribersResult.subscribers;
  if (subscribers.length === 0) {
    return {
      ok: true,
      sentCount: 0,
      errors: [],
    };
  }

  const { resend } = config;
  const fromAddress = resolveFromAddress();
  const siteUrl = getSiteUrl();
  const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?email=`;
  const errors: string[] = [];

  for (const subscriber of subscribers) {
    const textBody = `${payload.title}\n\n${payload.preview}\n\n${payload.content}\n\nRead more: ${payload.url ?? siteUrl}`;
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
          <a href="${escapeHtml(`${unsubscribeUrl}${encodeURIComponent(subscriber.email)}`)}" style="color: #64748b;">Unsubscribe</a>
        </p>
      </div>
    `;

    try {
      const { error } = await resend.emails.send({
        from: fromAddress,
        to: [subscriber.email],
        subject: payload.subject,
        text: textBody,
        html: htmlBody,
      });

      if (error) {
        errors.push(`${subscriber.email}: ${String(error)}`);
      }
    } catch (err) {
      errors.push(`${subscriber.email}: ${String(err)}`);
    }
  }

  return {
    ok: errors.length === 0,
    sentCount: subscribers.length - errors.length,
    errors,
  };
}
