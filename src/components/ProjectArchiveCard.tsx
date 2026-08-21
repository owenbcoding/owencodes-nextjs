import Link from "next/link";
import { formatArchiveDate, type ArchivePostMeta } from "@/lib/project-archive";

interface ProjectArchiveCardProps {
  post: ArchivePostMeta;
}

export function ProjectArchiveCard({ post }: ProjectArchiveCardProps) {
  return (
    <Link href={`/project-archive/${post.slug}`}>
      <article className="theme-card group relative flex flex-col gap-3 rounded-lg border px-4 py-5 transition-all hover:border-teal-400/60 hover:shadow-lg hover:shadow-teal-500/10 sm:px-5 sm:py-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            {post.number && (
              <p className="theme-muted-soft text-xs font-semibold uppercase tracking-wide">
                Project-Archive #{post.number}
              </p>
            )}
            <h3 className="theme-card-title mt-1 text-base font-bold leading-snug sm:text-lg">
              {post.title}
            </h3>
          </div>
          <span className="theme-muted-soft shrink-0 text-sm">→</span>
        </div>

        {post.preview && (
          <p className="theme-muted-soft line-clamp-2 text-sm">
            {post.preview}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between">
          <time className="theme-muted-soft text-xs">
            {formatArchiveDate(post.date)}
          </time>
          <span className="theme-muted-soft text-xs">Read more →</span>
        </div>
      </article>
    </Link>
  );
}
