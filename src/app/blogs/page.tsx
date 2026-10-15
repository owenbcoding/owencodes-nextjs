import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { BlogCard } from "@/components/BlogCard";
import { BlogsPagination } from "@/components/BlogsPagination";
import {
  getAllBlogs,
  getTotalPages,
  paginateBlogs,
} from "@/lib/blogs";

export const revalidate = 60;

export const metadata = {
  title: "Owen | Blogs",
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

type BlogsPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const { page: pageParam } = await searchParams;
  const blogs = await getAllBlogs();
  const totalPages = getTotalPages(blogs.length);
  const requestedPage = Number(pageParam);
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, totalPages)
      : 1;
  const pageBlogs = paginateBlogs(blogs, currentPage);

  return (
    <div className="site-shell relative flex min-h-dvh w-full min-w-0 max-w-full flex-col overflow-x-hidden overflow-y-auto overscroll-none">
      <div className="site-bg-primary pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-side pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-bottom pointer-events-none absolute inset-0 z-0" />

      <ParticlesBackground words={BLOG_WORDS} id="blogs-particles" />

      <MainNavigation />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-8 pt-24 md:pt-28">
        <h1
          id="blogs-heading"
          className="theme-heading mb-8 text-center text-2xl font-bold sm:mb-12 md:text-3xl"
        >
          My Blogs
        </h1>

        {pageBlogs.length > 0 ? (
          <ul
            aria-label="Blog posts"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {pageBlogs.map((blog) => (
              <li key={blog.slug} className="h-full">
                <BlogCard blog={blog} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="theme-muted-soft mt-16 text-center">
            No blog posts yet. Check back soon!
          </p>
        )}

        <BlogsPagination currentPage={currentPage} totalPages={totalPages} />
      </main>

      <Footer compact />
    </div>
  );
}
