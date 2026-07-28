import fs from "node:fs";
import path from "node:path";
import { Resend } from "resend";
import { getSiteUrl } from "@/lib/site";

export type NewsletterSubscriber = {
  email: string;
  subscribedAt: string;
};

export type NewsletterSendPayload = {
  subject: string;
  title: string;
  preview: string;
  content: string;
  url?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NEWSLETTER_FILE_PATH = path.join(process.cwd(), "data", "newsletter-subscribers.json");

function resolveFromAddress(): string {
  if (process.env.CONTACT_FROM_EMAIL) return process.env.CONTACT_FROM_EMAIL;

  const address = process.env.MAIL_FROM_ADDRESS;
  const name = process.env.MAIL_FROM_NAME;
  if (address && name) return `${name} <${address}>`;
  if (address) return address;

  return "Owencodes Newsletter <onboarding@resend.dev>";
}

function ensureSubscribersFile(): void {
  const directory = path.dirname(NEWSLETTER_FILE_PATH);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  if (!fs.existsSync(NEWSLETTER_FILE_PATH)) {
    fs.writeFileSync(NEWSLETTER_FILE_PATH, "[]", "utf8");
  }
}

export function getNewsletterSubscribers(): NewsletterSubscriber[] {
  ensureSubscribersFile();

  try {
    const raw = fs.readFileSync(NEWSLETTER_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is NewsletterSubscriber =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as NewsletterSubscriber).email === "string" &&
        typeof (item as NewsletterSubscriber).subscribedAt === "string",
    );
  } catch {
    return [];
  }
}

export function saveNewsletterSubscribers(subscribers: NewsletterSubscriber[]): void {
  ensureSubscribersFile();
  fs.writeFileSync(NEWSLETTER_FILE_PATH, JSON.stringify(subscribers, null, 2), "utf8");
}

export function addNewsletterSubscriber(email: string): {
  ok: boolean;
  created: boolean;
  message: string;
  subscriber?: NewsletterSubscriber;
} {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || !EMAIL_RE.test(trimmed)) {
    return {
      ok: false,
      created: false,
      message: "Please enter a valid email address.",
    };
  }

  const subscribers = getNewsletterSubscribers();
  const existing = subscribers.find((item) => item.email === trimmed);
  if (existing) {
    return {
      ok: true,
      created: false,
      message: "You’re already subscribed to updates.",
    };
  }

  const subscriber: NewsletterSubscriber = {
    email: trimmed,
    subscribedAt: new Date().toISOString(),
  };

  subscribers.push(subscriber);
  saveNewsletterSubscribers(subscribers);

  return {
    ok: true,
    created: true,
    message: "Thanks for subscribing — you’ll hear from me with new updates.",
    subscriber,
  };
}

export function removeNewsletterSubscriber(email: string): boolean {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return false;

  const subscribers = getNewsletterSubscribers();
  const nextSubscribers = subscribers.filter((item) => item.email !== trimmed);
  if (nextSubscribers.length === subscribers.length) {
    return false;
  }

  saveNewsletterSubscribers(nextSubscribers);
  return true;
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
  const apiKey = process.env.RESEND_API_KEY ?? process.env.RESEND_KEY ?? process.env.MAIL_PASSWORD;
  if (!apiKey) {
    return {
      ok: false,
      sentCount: 0,
      errors: [],
      error: "Resend is not configured yet.",
    };
  }

  const subscribers = getNewsletterSubscribers();
  if (subscribers.length === 0) {
    return {
      ok: true,
      sentCount: 0,
      errors: [],
    };
  }

  const resend = new Resend(apiKey);
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
        <div style="padding: 16px; border-radius: 8px; background: #f8fafc; border: 1px solid #e2e8f0; margin: 16px 0;">
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
