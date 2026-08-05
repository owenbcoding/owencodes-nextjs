"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isWarning, setIsWarning] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setIsError(false);
    setIsWarning(false);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = (await response.json()) as { message?: string; warning?: boolean };
      setMessage(result.message ?? "Thanks for subscribing.");
      setIsError(!response.ok);
      setIsWarning(Boolean(result.warning));
      if (response.ok) {
        setEmail("");
      }
    } catch {
      setMessage("Something went wrong. Please try again later.");
      setIsError(true);
      setIsWarning(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-6">
      <p className="mb-2 text-xs text-amber-300/80">
        Newsletter is currently under construction — some things may be broken.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 lg:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="w-full min-w-0 flex-1 text-center rounded-full border border-cyan-400/40 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="shrink-0 rounded-full cursor-pointer bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>

        {message ? (
          <p
            className={`text-sm ${isError ? "text-rose-300" : isWarning ? "text-amber-300" : "text-emerald-300"} sm:basis-full`}
            aria-live="polite"
          >
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
