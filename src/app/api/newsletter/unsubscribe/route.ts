import { NextResponse } from "next/server";
import {
  removeNewsletterSubscriber,
  verifyNewsletterUnsubscribeToken,
} from "@/lib/newsletter";

type UnsubscribePageState = "confirm" | "removed" | "not-found" | "invalid";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderUnsubscribePage(
  state: UnsubscribePageState,
  token?: string,
): string {
  const heading = {
    confirm: "Confirm your unsubscribe",
    removed: "You’ve been unsubscribed",
    "not-found": "No subscription found",
    invalid: "Invalid unsubscribe link",
  }[state];
  const message = {
    confirm: "Confirm below to stop receiving Owencodes updates.",
    removed: "You won’t receive any more emails from Owencodes updates.",
    "not-found":
      "We couldn’t find an active subscription for this link — you may have already unsubscribed.",
    invalid:
      "This unsubscribe link is invalid or expired. Use the link from one of your newsletter emails.",
  }[state];
  const action =
    state === "confirm"
      ? `<form method="post">
    <input type="hidden" name="token" value="${escapeHtml(token ?? "")}" />
    <button type="submit">Confirm unsubscribe</button>
  </form>`
      : "";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${heading} — Owencodes</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background-image: linear-gradient(to bottom right, #000000, #020617, #134e4a);
    color: #ededed;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    text-align: center;
  }
  .card {
    max-width: 28rem;
    width: 100%;
    padding: 40px 32px;
    border-radius: 20px;
    border: 1px solid rgba(34, 211, 238, 0.25);
    background: rgba(2, 6, 23, 0.6);
    backdrop-filter: blur(6px);
  }
  .icon {
    width: 56px;
    height: 56px;
    margin: 0 auto 20px;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(34, 211, 238, 0.12);
    color: #22d3ee;
    font-size: 24px;
  }
  h1 { margin: 0 0 12px; font-size: 1.25rem; color: #ffffff; }
  p { margin: 0; color: #94a3b8; line-height: 1.6; font-size: 0.95rem; }
  a {
    display: inline-block;
    margin-top: 24px;
    color: #0f172a;
    background: #22d3ee;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.85rem;
    padding: 10px 20px;
    border-radius: 9999px;
  }
  button {
    margin-top: 24px;
    border: 0;
    color: #0f172a;
    background: #22d3ee;
    font: inherit;
    font-weight: 600;
    font-size: 0.85rem;
    padding: 10px 20px;
    border-radius: 9999px;
    cursor: pointer;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="icon">${state === "removed" ? "✓" : "!"}</div>
    <h1>${heading}</h1>
    <p>${message}</p>
    ${action}
    <a href="/">Back to Owencodes</a>
  </div>
</body>
</html>`;
}

function renderResponse(state: UnsubscribePageState, token?: string, status = 200) {
  return new NextResponse(renderUnsubscribePage(state, token), {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
    },
  });
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  if (!verifyNewsletterUnsubscribeToken(token)) {
    return renderResponse("invalid", undefined, 400);
  }

  return renderResponse("confirm", token);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const token = formData.get("token");
  const email =
    typeof token === "string" ? verifyNewsletterUnsubscribeToken(token) : null;
  if (!email) {
    return renderResponse("invalid", undefined, 400);
  }

  const removed = await removeNewsletterSubscriber(email);
  return renderResponse(removed ? "removed" : "not-found");
}
