import { NextResponse } from "next/server";
import { removeNewsletterSubscriber } from "@/lib/newsletter";

function renderUnsubscribePage(removed: boolean): string {
  const heading = removed ? "You’ve been unsubscribed" : "No subscription found";
  const message = removed
    ? "You won’t receive any more emails from Owencodes updates."
    : "We couldn’t find an active subscription for that email address — you may have already unsubscribed.";

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
</style>
</head>
<body>
  <div class="card">
    <div class="icon">${removed ? "✓" : "!"}</div>
    <h1>${heading}</h1>
    <p>${message}</p>
    <a href="/">Back to Owencodes</a>
  </div>
</body>
</html>`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email") ?? "";
  const removed = await removeNewsletterSubscriber(email);

  return new NextResponse(renderUnsubscribePage(removed), {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
