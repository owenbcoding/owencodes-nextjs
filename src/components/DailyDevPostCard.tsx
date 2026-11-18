import { formatBlogDate } from "@/lib/blogs";
import type { DailyDevPost } from "@/lib/daily-dev";

function activityLabel(post: DailyDevPost): string {
  if (post.saved && post.upvoted) return "Saved & upvoted";
  return post.upvoted ? "Upvoted" : "Saved";
}

export function DailyDevPostCard({ post }: { post: DailyDevPost }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${post.title} on daily.dev (opens in a new tab)`}
      className="blog-card group relative block h-full rounded-xl p-[1.5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/70"
    >
      <span aria-hidden="true" className="blog-card-rgb-border" />
      <div className="blog-card-content relative flex h-full flex-col rounded-[calc(0.75rem-1.5px)] p-4 sm:p-5">
        <div className="blog-card-artwork relative mb-4 aspect-[1.65] overflow-hidden rounded-lg">
          {post.image ? (
            // daily.dev images come from arbitrary publisher/CDN hosts, which
            // next/image would need every one of them allow-listed for.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              aria-hidden="true"
              className="blog-card-placeholder flex h-full flex-col justify-between p-5"
            >
              <span className="theme-accent-text text-[0.65rem] font-semibold tracking-[0.2em] uppercase">
                daily.dev
              </span>
              <span className="blog-card-placeholder-mark self-end">✳</span>
              <span className="theme-muted text-[0.6rem] tracking-[0.18em] uppercase">
                {post.sourceName ?? "Dev news"}
              </span>
            </div>
          )}
          <span className="absolute top-3 left-3 rounded-full border border-teal-500/30 bg-black/60 px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.14em] text-teal-200 uppercase backdrop-blur-sm">
            {activityLabel(post)}
          </span>
        </div>

        <div className="flex flex-1 flex-col">
          <h3 className="theme-card-title mb-2 line-clamp-2 text-lg leading-snug font-semibold transition-colors group-hover:text-teal-300 sm:text-xl">
            {post.title}
          </h3>
          {post.summary ? (
            <p className="theme-muted-soft line-clamp-3 text-sm leading-relaxed">
              {post.summary}
            </p>
          ) : null}
          <div className="theme-muted mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-4 text-xs">
            {post.sourceName ? (
              <span className="theme-accent-text font-medium">
                {post.sourceName}
              </span>
            ) : null}
            {post.publishedAt ? (
              <time dateTime={post.publishedAt}>
                {formatBlogDate(post.publishedAt)}
              </time>
            ) : null}
            {post.readTime ? <span>{post.readTime} min read</span> : null}
            <span
              className="ml-auto"
              aria-label={`${post.numUpvotes} upvotes on daily.dev`}
            >
              ▲ {post.numUpvotes}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
