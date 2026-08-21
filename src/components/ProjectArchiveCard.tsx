import Link from "next/link";
import { formatNewsletterDate, type NewsletterMeta } from "@/lib/newsletters";

interface NewsletterCardProps {
  newsletter: NewsletterMeta;
}

export function NewsletterCard({ newsletter }: NewsletterCardProps) {
  return (
    <Link href={`/newsletters/${newsletter.slug}`}>
      <article className="theme-card group relative flex flex-col gap-3 rounded-lg border px-4 py-5 transition-all hover:border-teal-400/60 hover:shadow-lg hover:shadow-teal-500/10 sm:px-5 sm:py-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            {newsletter.number && (
              <p className="theme-muted-soft text-xs font-semibold uppercase tracking-wide">
                Newsletter #{newsletter.number}
              </p>
            )}
            <h3 className="theme-card-title mt-1 text-base font-bold leading-snug sm:text-lg">
              {newsletter.title}
            </h3>
          </div>
          <span className="theme-muted-soft shrink-0 text-sm">→</span>
        </div>

        {newsletter.preview && (
          <p className="theme-muted-soft line-clamp-2 text-sm">
            {newsletter.preview}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between">
          <time className="theme-muted-soft text-xs">
            {formatNewsletterDate(newsletter.date)}
          </time>
          <span className="theme-muted-soft text-xs">Read more →</span>
        </div>
      </article>
    </Link>
  );
}
