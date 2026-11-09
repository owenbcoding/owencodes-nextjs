import { BlogCard } from "@/components/BlogCard";
import { BlogsPagination } from "@/components/BlogsPagination";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import {
  getSanityBlogs,
  getTotalPages,
  paginateBlogs,
} from "@/lib/blogs";

export const metadata = {
  title: "Owen's Blogs",
  description: "Thoughts on full-stack development, projects, and tooling.",
  alternates: {
    canonical: "/blogs",
  },
};

export const revalidate = 60;

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const [{ page: pageParam }, blogs] = await Promise.all([
    searchParams,
    getSanityBlogs(),
  ]);
  const totalPages = getTotalPages(blogs.length);
  const requestedPage = Number(pageParam);
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, totalPages)
      : 1;
  const articles = paginateBlogs(blogs, currentPage);
  const featuredArticles = blogs.slice(0, 4);

  return (
    <div className="site-shell relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="site-bg-primary pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-side pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-bottom pointer-events-none absolute inset-0 z-0" />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-18 flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6">
        <header className="blog-hero relative mb-12 flex min-h-56 items-center justify-center overflow-hidden rounded-xl border px-5 py-14 text-center sm:mb-16 sm:min-h-64">
          <span aria-hidden="true" className="blog-hero-accent" />
          <div className="relative z-10">
            <p className="theme-accent-text mb-3 text-xs font-semibold tracking-[0.3em] uppercase">
              Notes from the build
            </p>
            <h1 className="theme-heading text-4xl font-bold tracking-tight sm:text-6xl">
              Owen&apos;s blogs
            </h1>
            <p className="theme-muted-soft mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base">
              Projects, lessons, and ideas from my corner of the web.
            </p>
          </div>
        </header>

        {featuredArticles.length > 0 ? (
          <section aria-labelledby="featured-heading" className="mb-16">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="theme-accent-text mb-1 text-xs font-semibold tracking-[0.2em] uppercase">
                  Hand-picked reads
                </p>
                <h2
                  id="featured-heading"
                  className="theme-heading text-2xl font-semibold sm:text-3xl"
                >
                  Featured
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {featuredArticles.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          </section>
        ) : null}

        <section aria-labelledby="all-articles-heading" className="mb-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="theme-accent-text mb-1 text-xs font-semibold tracking-[0.2em] uppercase">
                Keep exploring
              </p>
              <h2
                id="all-articles-heading"
                className="theme-heading text-2xl font-semibold sm:text-3xl"
              >
                All articles
              </h2>
            </div>
            <span className="theme-muted text-sm">
              {blogs.length} {blogs.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {articles.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          ) : (
            <p className="theme-muted-soft rounded-xl border border-white/10 bg-black/20 p-6 text-sm">
              No published Sanity posts yet. Check back soon.
            </p>
          )}

          <BlogsPagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
