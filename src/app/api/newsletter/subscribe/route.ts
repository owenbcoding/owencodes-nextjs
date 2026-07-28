import { NextResponse } from "next/server";
import { addNewsletterSubscriber } from "@/lib/newsletter";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const email = typeof payload?.email === "string" ? payload.email : "";
    const result = addNewsletterSubscriber(email);

    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  } catch {
    return NextResponse.json(
      { ok: false, created: false, message: "Unable to subscribe right now." },
      { status: 500 },
    );
  }
}
