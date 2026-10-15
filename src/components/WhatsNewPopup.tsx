"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "owencodes-whats-new-v2";

export function WhatsNewPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const frame = window.requestAnimationFrame(() => {
      try {
        if (window.localStorage.getItem(STORAGE_KEY) !== "dismissed") {
          setIsOpen(true);
        }
      } catch (error) {
        console.error("Could not read the What's New popup preference:", error);
        setIsOpen(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen || pathname !== "/") return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, pathname]);

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch (error) {
      console.error("Could not save the What's New popup preference:", error);
    }
    setIsOpen(false);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="whats-new-title"
      aria-describedby="whats-new-description"
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
      className="fixed inset-0 m-0 h-full w-full max-h-none max-w-none bg-transparent p-4 text-foreground backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="grid min-h-full place-items-center">
        <section className="theme-card-strong relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl sm:p-8">
          <button
            type="button"
            onClick={dismiss}
            autoFocus
            aria-label="Close What's New"
            className="absolute right-4 top-4 cursor-pointer rounded-full p-2 text-foreground/70 transition hover:bg-white/10 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <p className="theme-accent-text mb-2 text-sm font-semibold uppercase tracking-[0.18em]">
            Portfolio update
          </p>
          <h2 id="whats-new-title" className="theme-heading pr-8 text-3xl font-bold">
            What&apos;s new?
          </h2>
          <div
            id="whats-new-description"
            className="theme-body mt-4 text-base leading-relaxed"
          >
            <p>Here are a few recent updates to my portfolio:</p>
            <ul className="mt-3 list-inside list-disc space-y-2 text-left">
              <li>Added pagination to the projects and project archive pages.</li>
              <li>
                Organized archive projects into categories and improved how
                archive posts are sorted and displayed.
              </li>
              <li>
                Improved blog sorting, pagination, and content queries.
              </li>
              <li>
                Made project and archive content more consistent between Sanity
                and locally managed content.
              </li>
              <li>
                Polished project cards, archive cards, blog layouts, and the
                portfolio footer.
              </li>
            </ul>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              onClick={dismiss}
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              Explore projects
            </Link>
            <Link
              href="/project-archive"
              onClick={dismiss}
              className="inline-flex items-center justify-center rounded-full border border-[rgb(20_184_166/35%)] px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              Browse archive
            </Link>
          </div>
        </section>
      </div>
    </dialog>
  );
}
