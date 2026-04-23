import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL = "eoghankb@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "Owencodes Contact <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const { name, email, message } = payload as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Email service is not configured. Please try again later." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

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
      from: FROM_EMAIL,
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected contact form error:", err);
    return NextResponse.json(
      { error: "Unexpected error. Please try again." },
      { status: 500 },
    );
  }
}
