import Link from "next/link";
import { formatBlogDate, type BlogMeta } from "@/lib/blogs";

export function BlogCard({ blog }: { blog: BlogMeta }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      aria-label={`Read ${blog.title} — about ${blog.readingMinutes} min`}
      className="group block cursor-pointer rounded-lg border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-400/50 hover:ring-2 hover:ring-teal-400/50 hover:ring-offset-2 hover:ring-offset-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60"
    >
      <h2 className="font-mono text-2xl font-extrabold tracking-wide text-teal-300 drop-shadow-[0_0_8px_rgba(45,212,191,0.35)] transition-colors group-hover:text-teal-200 md:text-3xl">
        <span aria-hidden="true" className="mr-2">
          {blog.emoji}
        </span>
        {blog.title}
      </h2>

      <p className="my-6 text-base font-bold leading-relaxed text-slate-200 md:text-lg">
        {blog.description}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-3 text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-3">
          <span>Published on {formatBlogDate(blog.date)}</span>
          <span aria-hidden="true" className="text-teal-400">
            •
          </span>
          <span className="font-medium text-teal-300">{blog.category}</span>
        </div>

        <span className="inline-flex items-center gap-1.5 font-medium text-teal-300 transition-all group-hover:gap-2.5 group-hover:text-teal-200">
          {blog.readingMinutes} min read
          <svg
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
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
  );
}
