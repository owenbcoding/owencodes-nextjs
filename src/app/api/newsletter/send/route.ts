import { NextResponse } from "next/server";
import { sendNewsletter } from "@/lib/newsletter";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const authToken = typeof payload?.token === "string" ? payload.token : "";
    const expectedToken = process.env.NEWSLETTER_SEND_TOKEN;

    if (!expectedToken) {
      return NextResponse.json({ ok: false, error: "Newsletter send token is not configured." }, { status: 500 });
    }

    if (authToken !== expectedToken) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const result = await sendNewsletter({
      subject: typeof payload?.subject === "string" ? payload.subject : "New update from Owencodes",
      title: typeof payload?.title === "string" ? payload.title : "New update from Owencodes",
      preview: typeof payload?.preview === "string" ? payload.preview : "A fresh update is ready to read.",
      content: typeof payload?.content === "string" ? payload.content : "",
      url: typeof payload?.url === "string" ? payload.url : undefined,
    });

    return NextResponse.json(result, { status: result.ok ? 200 : 500 });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to send newsletter." }, { status: 500 });
  }
}
