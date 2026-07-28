import { NextResponse } from "next/server";
import { removeNewsletterSubscriber } from "@/lib/newsletter";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email") ?? "";
  const removed = removeNewsletterSubscriber(email);

  return NextResponse.json({ ok: removed, message: removed ? "You’ve been unsubscribed." : "No matching subscription was found." });
}
