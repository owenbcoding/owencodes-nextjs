import { NextResponse } from "next/server";
import { addNewsletterSubscriber, sendWelcomeEmail } from "@/lib/newsletter";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const email = typeof payload?.email === "string" ? payload.email : "";
    const result = await addNewsletterSubscriber(email);

    const status = result.ok ? 200 : result.message.includes("configured") ? 500 : 400;
    if (!result.ok || !result.created) {
      return NextResponse.json(result, { status });
    }

    const welcomeEmail = await sendWelcomeEmail(result.subscriber?.email ?? email);
    if (!welcomeEmail.ok) {
      return NextResponse.json(
        {
          ...result,
          welcomeEmailSent: false,
          warning: true,
          message:
            "You’re subscribed, but the welcome email could not be sent right now.",
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        ...result,
        welcomeEmailSent: true,
        message: "Thanks for subscribing — check your inbox for the welcome email.",
      },
      { status },
    );
  } catch {
    return NextResponse.json(
      { ok: false, created: false, message: "Unable to subscribe right now." },
      { status: 500 },
    );
  }
}
