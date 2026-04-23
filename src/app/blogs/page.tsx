import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { BlogCard } from "@/components/BlogCard";
import { BlogsPagination } from "@/components/BlogsPagination";
import {
  BLOGS_PER_PAGE,
  getAllBlogs,
  getTotalPages,
  paginateBlogs,
} from "@/lib/blogs";

export const metadata = {
  title: "Blogs | Owencodes",
  description: "Thoughts on full-stack development, projects, and tooling.",
};

const BLOG_WORDS = [
  "Always learning",
  "Blogs",
  "Career",
  "Codecademy",
  "Copilot",
  "Cursor",
  "Docs",
  "freeCodeCamp",
  "GitHub",
  "JavaScript",
  "Laravel",
  "OpenAI",
  "Open source",
  "Podcasts",
  "Portfolio",
  "Practice",
  "Projects",
  "REST",
  "Tailwind",
  "Tooling",
  "TypeScript",
  "YouTube",
  "AI",
  "</>",
  "=>",
  "< />",
];

type PageProps = {
  searchParams?: Promise<{ page?: string | string[] }>;
};

function parsePage(raw: string | string[] | undefined, totalPages: number): number {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = Number.parseInt(value ?? "1", 10);
  if (Number.isNaN(parsed) || parsed < 1) return 1;
  if (parsed > totalPages) return totalPages;
  return parsed;
}

export default async function BlogsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const blogs = getAllBlogs();
  const totalPages = getTotalPages(blogs.length);
  const currentPage = parsePage(resolvedSearchParams.page, totalPages);
  const pageBlogs = paginateBlogs(blogs, currentPage);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-br from-black via-slate-950 to-teal-950" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-black/70 via-transparent to-teal-900/40" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

      <ParticlesBackground words={BLOG_WORDS} id="blogs-particles" />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-14 flex w-full max-w-3xl flex-1 flex-col px-4 py-8">
        <section aria-labelledby="blogs-heading" className="mt-5 flex justify-center">
          <div className="rounded-lg border border-white/10 bg-black/30 px-12 py-4 shadow-2xl backdrop-blur-sm">
            <h1
              id="blogs-heading"
              className="text-center text-3xl font-bold tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
            >
              Blogs
            </h1>
          </div>
        </section>

        <section aria-label="Blog posts" className="mt-8">
          {blogs.length === 0 ? (
            <p className="mt-16 text-center text-slate-300">
              No blog posts yet. Check back soon!
            </p>
          ) : (
            <ul className="flex flex-col gap-6">
              {pageBlogs.map((blog) => (
                <li key={blog.slug}>
                  <BlogCard blog={blog} />
                </li>
              ))}
            </ul>
          )}

          <BlogsPagination currentPage={currentPage} totalPages={totalPages} />

          {blogs.length > 0 && (
            <p className="mt-4 text-center text-xs text-slate-400">
              Showing {pageBlogs.length} of {blogs.length}{" "}
              {blogs.length === 1 ? "post" : "posts"}
              {totalPages > 1 && <> · {BLOGS_PER_PAGE} per page</>}
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
