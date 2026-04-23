import Link from "next/link";
import { formatBlogDate, type BlogMeta } from "@/lib/blogs";

export function BlogCard({ blog }: { blog: BlogMeta }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group block rounded-lg border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-teal-400/50 hover:ring-2 hover:ring-teal-400/50 hover:ring-offset-2 hover:ring-offset-gray-900"
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

      <div className="flex items-center gap-3 border-t border-white/5 pt-3 text-xs text-slate-400">
        <span>Published on {formatBlogDate(blog.date)}</span>
        <span aria-hidden="true" className="text-teal-400">
          •
        </span>
        <span className="font-medium text-teal-300">{blog.category}</span>
      </div>
    </Link>
  );
}
