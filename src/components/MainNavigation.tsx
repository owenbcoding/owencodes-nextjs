"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Projects", href: "/projects" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

export function MainNavigation() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-teal-500/20 bg-white/5 p-2 shadow-[inset_0_0_8px_rgba(255,255,255,0.1),0_0_15px_rgba(45,212,191,0.15)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-bold text-teal-400 transition-colors duration-200 hover:text-teal-300"
        >
          Owencodes
        </Link>

        <ul className="hidden shrink-0 space-x-2 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 font-medium transition-colors duration-200 hover:bg-white/10 hover:text-teal-400 ${
                    active
                      ? "bg-white/10 text-teal-400"
                      : "text-gray-200"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <a
          href="https://github.com/owenbcoding"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full px-3 py-2 text-gray-200 transition duration-200 hover:bg-white/10 hover:text-white lg:inline-flex"
          aria-label="Open GitHub"
        >
          <span className="text-sm font-semibold">Github</span>
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 .5C5.3.5 0 5.8 0 12.4c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.3-1.5-1.3-1.5-1.1-.8.1-.8.1-.8 1.3.1 2 1.4 2 1.4 1.1 2 2.9 1.4 3.6 1.1.1-.8.4-1.4.7-1.7-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.4.1-2.8 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.4.2 2.5.1 2.8.7.9 1.2 1.9 1.2 3.2 0 4.5-2.8 5.4-5.4 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C24 5.8 18.7.5 12 .5z" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
