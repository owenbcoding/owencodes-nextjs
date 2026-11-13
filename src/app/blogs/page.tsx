import { BlogCard } from "@/components/BlogCard";
import { BlogsPagination } from "@/components/BlogsPagination";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { getSanityBlogs } from "@/lib/blogs";

const ARTICLES_PER_PAGE = 9;
const FEATURED_POSTS_COUNT = 3;

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
  const featuredPosts = blogs.slice(0, FEATURED_POSTS_COUNT);
  const articles = blogs.slice(FEATURED_POSTS_COUNT);
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const requestedPage = Number(pageParam);
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, Math.max(totalPages, 1))
      : 1;
  const pageArticles = articles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  return (
    <div className="site-shell relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="site-bg-primary pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-side pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-bottom pointer-events-none absolute inset-0 z-0" />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-18 flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6">
        <header className="relative mb-6 text-center">
          <div className="relative z-10">
            <h1 className="theme-heading mb-4 mt-5 text-4xl font-bold">
              Blogs
            </h1>
            <p className="theme-muted-soft mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base">
              Projects and ideas from my corner of the web.
            </p>
          </div>
        </header>

        {blogs.length === 0 ? (
          <p className="theme-muted-soft mx-auto w-fit max-w-full rounded-xl border border-white/10 bg-black/20 p-6 text-center text-sm">
            No published blog posts yet. Check back soon.
          </p>
        ) : (
          <>
            <section aria-labelledby="featured-heading" className="mb-14">
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

              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((blog) => (
                  <BlogCard key={blog.slug} blog={blog} />
                ))}
              </div>
            </section>

            {articles.length > 0 ? (
              <section aria-labelledby="articles-heading" className="mb-10">
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="theme-accent-text mb-1 text-xs font-semibold tracking-[0.2em] uppercase">
                      Keep exploring
                    </p>
                    <h2
                      id="articles-heading"
                      className="theme-heading text-2xl font-semibold sm:text-3xl"
                    >
                      Articles
                    </h2>
                  </div>
                  <span className="theme-muted text-sm">
                    {articles.length}{" "}
                    {articles.length === 1 ? "article" : "articles"}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  {pageArticles.map((blog) => (
                    <BlogCard key={blog.slug} blog={blog} />
                  ))}
                </div>

                <BlogsPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </section>
            ) : null}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
