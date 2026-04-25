"use client";

import Link from "next/link";
import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type TouchEvent,
  type WheelEvent,
} from "react";
import type { BlogMeta } from "@/lib/blogs";

type BlogHyperScrollProps = {
  blogs: BlogMeta[];
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function formatDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function BlogHyperScroll({ blogs }: BlogHyperScrollProps) {
  const touchStartY = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  if (blogs.length === 0) {
    return (
      <p className="mt-16 text-center text-slate-300">
        No blog posts yet. Check back soon!
      </p>
    );
  }

  const maxIndex = Math.max(blogs.length - 1, 1);
  const activePosition = progress * maxIndex;
  const activeIndex = Math.round(activePosition);

  const moveProgress = (delta: number) => {
    setProgress((current) => clamp(current + delta, 0, 1));
  };

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    moveProgress(event.deltaY / 900);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowDown" || event.key === "PageDown") {
      event.preventDefault();
      moveProgress(1 / maxIndex);
    }

    if (event.key === "ArrowUp" || event.key === "PageUp") {
      event.preventDefault();
      moveProgress(-1 / maxIndex);
    }

    if (event.key === "Home") {
      event.preventDefault();
      setProgress(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      setProgress(1);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartY.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchMove = (event: TouchEvent<HTMLElement>) => {
    const startY = touchStartY.current;
    const currentY = event.touches[0]?.clientY;
    if (startY === null || currentY === undefined) return;

    moveProgress((startY - currentY) / 700);
    touchStartY.current = currentY;
  };

  return (
    <section
      aria-label="Blog posts"
      className="mt-0 flex min-h-0 flex-1 flex-col overflow-hidden"
    >

      <ol
        className="perspective-distant relative flex min-h-0 flex-1 touch-none items-start justify-center overflow-hidden pt-4 md:pt-6"
        tabIndex={0}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        aria-live="polite"
        aria-label={`Blog post ${activeIndex + 1} of ${blogs.length}`}
      >
        {blogs.map((blog, index) => {
          const postNumber = String(index + 1).padStart(2, "0");
          const distance = index - activePosition;
          const absoluteDistance = Math.abs(distance);
          const isReadable = absoluteDistance < 0.65;
          const cardStyle = {
            opacity: clamp(1 - absoluteDistance * 0.42, 0, 1),
            transform: [
              `translate3d(0, ${distance * 38}%, ${-Math.abs(distance) * 220}px)`,
              `rotateX(${distance * -7}deg)`,
              `scale(${clamp(1 - absoluteDistance * 0.12, 0.72, 1)})`,
            ].join(" "),
            zIndex: blogs.length - Math.round(absoluteDistance * 10),
          } satisfies CSSProperties;

          const isActive = index === activeIndex;

          return (
            <li
              key={blog.slug}
              aria-hidden={!isReadable}
              className={`absolute inset-x-3 mx-auto flex max-w-2xl items-center justify-center transition-[opacity,transform] duration-200 ease-out motion-reduce:relative motion-reduce:inset-auto motion-reduce:my-4 motion-reduce:transform-none motion-reduce:opacity-100 md:inset-x-8 ${
                isActive ? "" : "pointer-events-none"
              }`}
              style={cardStyle}
            >
              <Link
                href={`/blogs/${blog.slug}`}
                tabIndex={isReadable ? 0 : -1}
                aria-label={`Read ${blog.title} — about ${blog.readingMinutes} min`}
                className="group relative flex min-h-[20px] w-full cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-950/35 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.5)] ring-1 ring-white/5 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-1 hover:border-teal-300/20 hover:ring-2 hover:ring-teal-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/70 md:min-h-[60px] md:p-6"
              >
                <div className="pointer-events-none absolute -right-16 -top-20 z-0 h-52 w-52 rounded-full bg-teal-400/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 left-8 z-0 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />
                <div
                  className="pointer-events-none absolute inset-0 z-0 rounded-3xl bg-linear-to-b from-white/6 to-transparent"
                  aria-hidden
                />

                <div className="relative z-10 flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-teal-300">
                      Post {postNumber}
                    </p>
                    <h2 className="theme-title-font mt-3 max-w-2xl text-2xl font-black text-white drop-shadow-[0_0_18px_rgba(45,212,191,0.18)] md:text-4xl">
                      <span aria-hidden="true" className="mr-3">
                        {blog.emoji}
                      </span>
                      {blog.title}
                    </h2>
                  </div>

                  <div className="hidden rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-teal-200 md:block">
                    {blog.category}
                  </div>
                </div>

                <div className="relative z-10 mt-6 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="max-w-2xl text-sm font-semibold leading-relaxed text-slate-200 md:text-lg">
                      {blog.description}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-400 md:text-sm">
                      <span>Published on {formatDate(blog.date)}</span>
                      <span aria-hidden="true" className="text-teal-400">
                        /
                      </span>
                      <span className="font-medium text-teal-300 md:hidden">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-teal-300 transition-all group-hover:gap-3 group-hover:text-teal-200 md:text-sm">
                    {blog.readingMinutes} min read
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 10h12" />
                      <path d="M11 5l5 5-5 5" />
                    </svg>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      <p className="mt-3 text-center text-xs text-slate-500">
        Use your mouse wheel, trackpad, arrow keys, or swipe to move through{" "}
        {blogs.length} {blogs.length === 1 ? "post" : "posts"}.
      </p>
    </section>
  );
}
