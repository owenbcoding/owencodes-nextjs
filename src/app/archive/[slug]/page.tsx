import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { getArchiveItemBySlug, getAllArchiveItems, formatArchiveDate } from "@/lib/archive";

interface ArchiveDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArchiveDetailPageProps) {
  const { slug } = await params;
  const item = getArchiveItemBySlug(slug);

  if (!item) {
    return { title: "Archive Item Not Found" };
  }

  return {
    title: `${item.title} | Owencodes Archive`,
    description: item.preview,
    alternates: {
      canonical: `/archive/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const items = getAllArchiveItems();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ArchiveDetailPage({
  params,
}: ArchiveDetailPageProps) {
  const { slug } = await params;
  const item = getArchiveItemBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="site-shell relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="site-bg-primary pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-side pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-bottom pointer-events-none absolute inset-0 z-0" />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-18 flex w-full max-w-3xl flex-1 flex-col px-4 py-8">
        <article>
          <Link
            href="/archive"
            className="theme-accent-text inline-flex items-center gap-1 text-sm font-semibold transition hover:gap-2"
          >
            ← Back to archive
          </Link>

          <header className="mb-8 mt-6">
            {item.number && (
              <p className="theme-muted-soft mb-2 text-xs font-semibold uppercase tracking-wide">
                Issue #{item.number}
              </p>
            )}
            <h1 className="theme-heading mb-4 text-4xl font-bold leading-tight">
              {item.title}
            </h1>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <time className="theme-muted-soft text-sm">
                {formatArchiveDate(item.date)}
              </time>
              {item.subject && (
                <p className="theme-muted-soft text-sm">
                  <span className="font-semibold">Subject:</span> {item.subject}
                </p>
              )}
            </div>
          </header>

          <div className="prose prose-invert max-w-none dark:prose-invert">
            <div
              className="theme-body leading-relaxed [&>h2]:theme-heading [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h3]:theme-heading [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-xl [&>h3]:font-bold [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:ml-4 [&>ul]:space-y-2 [&>ol]:mb-4 [&>ol]:ml-4 [&>ol]:space-y-2 [&>li]:theme-body [&>blockquote]:border-l-4 [&>blockquote]:border-teal-400 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-4 [&>code]:theme-body [&>code]:bg-slate-900 [&>code]:rounded [&>code]:px-2 [&>code]:py-1 [&>pre]:bg-slate-900 [&>pre]:rounded [&>pre]:p-4 [&>pre]:overflow-x-auto [&>a]:theme-accent-text [&>a]:underline [&>a]:underline-offset-2 [&>a]:transition [&>a]:hover:opacity-80"
              dangerouslySetInnerHTML={{
                __html: item.content,
              }}
            />
          </div>

          <footer className="theme-card-title mt-12 border-t border-slate-700/50 pt-8">
            <div className="mb-6">
              <h3 className="mb-2 font-bold">Share this update</h3>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out: ${item.title}`)}%0A${encodeURIComponent(`https://owencodes.com/archive/${item.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-accent-text inline-flex items-center gap-1 text-sm font-semibold transition hover:opacity-70"
                >
                  Share on Twitter →
                </a>
              </div>
            </div>

            <div className="mt-8 rounded-lg border border-teal-500/20 bg-teal-500/5 p-4">
              <p className="theme-body mb-3">
                Like this update? Subscribe to get the next one.
              </p>
              <p className="theme-muted-soft text-sm">
                No spam, just occasional updates about projects and insights.
              </p>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
