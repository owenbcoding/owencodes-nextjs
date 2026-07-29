import { NextResponse } from "next/server";
import { addNewsletterSubscriber } from "@/lib/newsletter";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const email = typeof payload?.email === "string" ? payload.email : "";
    const result = await addNewsletterSubscriber(email);

    const status = result.ok ? 200 : result.message.includes("configured") ? 500 : 400;
    return NextResponse.json(result, { status });
  } catch {
    return NextResponse.json(
      { ok: false, created: false, message: "Unable to subscribe right now." },
      { status: 500 },
    );
  }
}
