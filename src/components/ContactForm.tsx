"use client";

import { useRef, useState, type FormEvent } from "react";

const CALENDLY_URL = "https://calendly.com/owencodes/30min";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function ContactForm() {
  const formLoadedAt = useRef(Date.now());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [hasBooked, setHasBooked] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const canSend =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    message.trim().length > 0 &&
    status.kind !== "sending";

  function handleBookCall() {
    window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    setHasBooked(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend) return;

    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          companyWebsite,
          formLoadedAt: formLoadedAt.current,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (res.status === 429) {
        const retryAfter = res.headers.get("Retry-After");
        const minutes = retryAfter ? Math.max(1, Math.ceil(Number(retryAfter) / 60)) : null;
        throw new Error(
          data.error ??
            (minutes
              ? `Too many attempts. Please wait about ${minutes} minute${minutes === 1 ? "" : "s"} and try again.`
              : "Too many attempts. Please wait a while and try again."),
        );
      }

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setStatus({
        kind: "success",
        message: "Thanks! Your message has been sent. I'll be in touch soon.",
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected error. Please try again.";
      setStatus({ kind: "error", message });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative mt-8 flex flex-col gap-5" noValidate>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <label htmlFor="contact-company-website">Company website</label>
        <input
          id="contact-company-website"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-name"
          className="text-sm font-semibold text-white"
        >
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Your Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-email"
          className="text-sm font-semibold text-white"
        >
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Your Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-sm font-semibold text-white"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={12}
          placeholder={`Put anything here to start the conversation\n\nTell me about your project...\n\n• Business or project name\n• Goal of the website/app\n• Example websites you like\n• Pages required\n• Features needed (Login, User Accounts, Payments, Booking, Dashboard, etc.)\n• Existing branding, content, or assets\n• Domain and hosting status\n• Expected launch date\n• Budget range`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="resize-y rounded-md border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 focus:outline-none"
        />
      </div>

      <div
        role="note"
        className="rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-200"
      >
        <p className="text-white font-bold">Prefer to talk live?</p>
        <p className="mt-5 text-slate-300">
          You can send a message anytime using the form above. If you&apos;d
          like a discovery call, book a time below &mdash; the form is great for
          project details, and the call is for a deeper conversation.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleBookCall}
          className={`flex-1 rounded-md border px-4 py-2.5 text-sm font-semibold transition-colors ${
            hasBooked
              ? "border-teal-400/60 bg-teal-500/10 text-teal-200 hover:bg-teal-500/20"
              : "border-white/20 bg-black/60 text-white hover:border-white/40 hover:bg-black/80"
          }`}
        >
          {hasBooked ? "Call booked \u2713" : "Book discovery call"}
        </button>

        <button
          type="submit"
          disabled={!canSend}
          aria-disabled={!canSend}
          className="flex-1 rounded-md border border-teal-500/60 bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-500 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-teal-900/40 disabled:text-slate-400"
        >
          {status.kind === "sending" ? "Sending\u2026" : "Send Message"}
        </button>
      </div>

      {status.kind === "success" && (
        <p
          role="status"
          className="rounded-md border border-teal-500/40 bg-teal-500/10 px-3 py-2 text-sm text-teal-200"
        >
          {status.message}
        </p>
      )}

      {status.kind === "error" && (
        <p
          role="alert"
          className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200"
        >
          {status.message}
        </p>
      )}

    </form>
  );
}
