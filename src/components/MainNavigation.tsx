"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { name: "Projects", href: "/projects" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

const GITHUB_HREF = "https://github.com/owenbcoding";

function GitHubAnchor({
  className,
  onClick,
}: {
  className: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={GITHUB_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
      aria-label="Open GitHub"
    >
      <span className="text-md font-semibold">Github</span>
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .5C5.3.5 0 5.8 0 12.4c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.3-1.5-1.3-1.5-1.1-.8.1-.8.1-.8 1.3.1 2 1.4 2 1.4 1.1 2 2.9 1.4 3.6 1.1.1-.8.4-1.4.7-1.7-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.4.1-2.8 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.4.2 2.5.1 2.8.7.9 1.2 1.9 1.2 3.2 0 4.5-2.8 5.4-5.4 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C24 5.8 18.7.5 12 .5z" />
      </svg>
    </a>
  );
}

export function MainNavigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuId = useId();

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="theme-nav fixed inset-x-0 top-0 z-50 border-b p-2 shadow-[inset_0_0_8px_rgba(255,255,255,0.1),0_0_15px_rgba(45,212,191,0.15)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="theme-brand-link text-lg font-bold transition-colors duration-200"
        >
          Owencodes
        </Link>

        <ul className="hidden shrink-0 space-x-4 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`theme-nav-link rounded-full px-5 py-2 text-lg font-semibold tracking-wide transition-colors duration-200 ${
                    active ? "theme-nav-link-active" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <GitHubAnchor className="theme-github-link hidden items-center gap-2 rounded-full px-4 py-2 tracking-wide transition duration-200 md:inline-flex" />
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgb(20_184_166/25%)] text-foreground transition hover:bg-white/10 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls={mobileMenuId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-x-0 bottom-0 top-18 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={closeMobile}
            aria-hidden
          />
          <div
            id={mobileMenuId}
            className="theme-nav absolute left-0 right-0 top-full z-50 max-h-[min(70vh,calc(100dvh-4.5rem))] overflow-y-auto border-b border-t border-[rgb(20_184_166/20%)] p-4 shadow-lg backdrop-blur-xl md:hidden"
            aria-label="Menu"
          >
            <ul className="flex flex-col gap-0.5">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      aria-current={active ? "page" : undefined}
                      className={`theme-nav-link block rounded-lg px-4 py-3 text-lg font-semibold ${
                        active ? "theme-nav-link-active" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 border-t border-[rgb(20_184_166/20%)] pt-3">
              <GitHubAnchor
                className="theme-github-link inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-lg font-semibold tracking-wide transition duration-200"
                onClick={closeMobile}
              />
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
