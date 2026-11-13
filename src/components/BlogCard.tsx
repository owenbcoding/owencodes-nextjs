import Image from "next/image";
import Link from "next/link";
import { formatBlogDate, type BlogMeta } from "@/lib/blogs";

export function BlogCard({ blog }: { blog: BlogMeta }) {
  const cardContent = (
    <>
      <div className="blog-card-artwork relative mb-4 aspect-[1.65] overflow-hidden rounded-lg">
        {blog.coverImageUrl ? (
          <Image
            src={blog.coverImageUrl}
            alt={blog.coverImageAlt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="blog-card-placeholder flex h-full flex-col justify-between p-5"
          >
            <span className="theme-accent-text text-[0.65rem] font-semibold tracking-[0.2em] uppercase">
              {blog.category}
            </span>
            <span className="blog-card-placeholder-mark self-end">✳</span>
            <span className="theme-muted text-[0.6rem] tracking-[0.18em] uppercase">
              Field notes / {blog.date.slice(0, 4)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="theme-card-title mb-2 line-clamp-2 text-lg leading-snug font-semibold transition-colors group-hover:text-teal-300 sm:text-xl">
          {blog.title}
        </h3>
        <p className="theme-muted-soft line-clamp-3 text-sm leading-relaxed sm:text-base">
          {blog.description}
        </p>
        <div className="theme-muted mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-4 text-xs">
          <span className="theme-accent-text font-medium">{blog.category}</span>
          <span aria-hidden="true" className="ml-auto">
            {blog.readingMinutes} min read
          </span>
        </div>
        <span className="theme-accent-text mt-4 inline-flex text-sm font-semibold">
          Read More . . .
        </span>
        <time className="theme-muted mt-2 text-xs" dateTime={blog.date}>
          {formatBlogDate(blog.date)}
        </time>
      </div>
    </>
  );

  const className =
    "blog-card group relative block h-full rounded-xl p-[1.5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/70";
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      aria-label={`Read ${blog.title} — about ${blog.readingMinutes} min`}
      className={className}
    >
      <span aria-hidden="true" className="blog-card-rgb-border" />
      <div className="blog-card-content relative flex h-full flex-col rounded-[calc(0.75rem-1.5px)] p-4 sm:p-5">
        {cardContent}
      </div>
    </Link>
  );
}
