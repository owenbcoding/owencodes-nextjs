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
      setHasBooked(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected error. Please try again.";
      setStatus({ kind: "error", message });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-name"
            className="theme-card-title text-sm font-semibold"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="theme-input theme-input-border min-h-12 rounded-lg border px-4 py-3 text-sm transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-email"
            className="theme-card-title text-sm font-semibold"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="theme-input theme-input-border min-h-12 rounded-lg border px-4 py-3 text-sm transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="theme-card-title text-sm font-semibold"
        >
          Your message description
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={8}
          placeholder="What are you looking to build? Include any goals, features, or timelines you already have in mind."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="theme-input theme-input-border resize-y rounded-lg border px-4 py-3 text-sm leading-relaxed transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 focus:outline-none"
        />
        <p className="theme-muted mt-1 text-xs">
          A few details will help me understand how I can help.
        </p>
      </div>

      <div className="theme-card rounded-xl border p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="theme-card-title font-semibold">Prefer to talk live?</p>
            <p className="theme-muted-soft mt-1 text-sm leading-relaxed">
              Book a discovery call and we can talk through your idea.
            </p>
          </div>
          <button
            type="button"
            onClick={handleBookCall}
            className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 ${
              hasBooked
                ? "theme-accent-text border-teal-400/60 bg-teal-500/10 hover:bg-teal-500/20"
                : "theme-card-title theme-input-border border bg-white/5 hover:border-teal-400/50 hover:bg-teal-500/10"
            }`}
          >
            {hasBooked ? "Call booked \u2713" : "Book a discovery call"}
          </button>
        </div>
      </div>

      <div className="theme-input-border flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="theme-muted text-xs">I usually reply within 1–2 days.</p>
        <button
          type="submit"
          disabled={!canSend}
          aria-disabled={!canSend}
          className="rounded-full border border-teal-500/60 bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-teal-900/40 disabled:text-slate-400"
        >
          {status.kind === "sending" ? "Sending\u2026" : "Send Message"}
        </button>
      </div>

      {status.kind === "success" && (
        <p
          role="status"
          className="theme-status-success rounded-md border border-teal-500/40 bg-teal-500/10 px-3 py-2 text-sm"
        >
          {status.message}
        </p>
      )}

      {status.kind === "error" && (
        <p
          role="alert"
          className="theme-status-error rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm"
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
