import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  checkContactProtection,
  getClientIp,
  recordSuccessfulContact,
  validateContactEmail,
  type ContactProtectionResult,
} from "@/lib/contact-protection";

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_MAIL_TO ?? "eoghankb@gmail.com";

function resolveFromAddress(): string {
  if (process.env.CONTACT_FROM_EMAIL) return process.env.CONTACT_FROM_EMAIL;

  const address = process.env.MAIL_FROM_ADDRESS;
  const name = process.env.MAIL_FROM_NAME;
  if (address && name) return `${name} <${address}>`;
  if (address) return address;

  return "Owencodes Contact <onboarding@resend.dev>";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function protectionResponse(
  result: Extract<ContactProtectionResult, { allowed: false }>,
) {
  if (result.silent) {
    return NextResponse.json({ ok: true });
  }

  const headers: HeadersInit = {};
  if (result.retryAfterSeconds > 0) {
    headers["Retry-After"] = String(result.retryAfterSeconds);
  }

  const status =
    result.kind === "blocked" || result.kind === "rate_limited" ? 429 : 400;

  return NextResponse.json({ error: result.message }, { status, headers });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message, companyWebsite, formLoadedAt } = payload as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    companyWebsite?: unknown;
    formLoadedAt?: unknown;
  };

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 },
    );
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(trimmedEmail)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (trimmedMessage.length > 5000) {
    return NextResponse.json(
      { error: "Message is too long." },
      { status: 400 },
    );
  }

  const clientIp = getClientIp(request);
  const protection = checkContactProtection({
    ip: clientIp,
    name: trimmedName,
    email: trimmedEmail,
    message: trimmedMessage,
    companyWebsite:
      typeof companyWebsite === "string" ? companyWebsite : undefined,
    formLoadedAt:
      typeof formLoadedAt === "number" ? formLoadedAt : undefined,
  });

  if (!protection.allowed) {
    return protectionResponse(protection);
  }

  const emailValidation = await validateContactEmail(trimmedEmail);
  if (emailValidation) {
    return protectionResponse(emailValidation);
  }

  const apiKey =
    process.env.RESEND_API_KEY ??
    process.env.RESEND_KEY ??
    process.env.MAIL_PASSWORD;

  if (!apiKey) {
    console.error(
      "Resend API key is not configured (set RESEND_API_KEY, RESEND_KEY or MAIL_PASSWORD).",
    );
    return NextResponse.json(
      { error: "Email service is not configured. Please try again later." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const fromAddress = resolveFromAddress();

  const subject = `New portfolio contact from ${trimmedName}`;
  const textBody = `New message from your portfolio contact form.

Name: ${trimmedName}
Email: ${trimmedEmail}

Message:
${trimmedMessage}
`;

  const htmlBody = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #0f172a;">
      <h2 style="margin: 0 0 16px;">New portfolio contact</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
      <p style="margin: 16px 0 4px;"><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; margin: 0; padding: 12px; background: #f1f5f9; border-radius: 6px;">
        ${escapeHtml(trimmedMessage)}
      </p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [TO_EMAIL],
      replyTo: trimmedEmail,
      subject,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 },
      );
    }

    recordSuccessfulContact(clientIp);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected contact form error:", err);
    return NextResponse.json(
      { error: "Unexpected error. Please try again." },
      { status: 500 },
    );
  }
}
