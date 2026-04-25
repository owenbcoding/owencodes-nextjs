import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { BlogHyperScroll } from "@/components/BlogHyperScroll";
import { getAllBlogs } from "@/lib/blogs";

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

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <div className="relative flex h-screen flex-col overflow-hidden overscroll-none bg-black">
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-br from-black via-slate-950 to-teal-950" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-black/70 via-transparent to-teal-900/40" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

      <ParticlesBackground words={BLOG_WORDS} id="blogs-particles" />

      <MainNavigation />

      <main className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-4 pt-16 pb-4">
        <section aria-labelledby="blogs-heading" className="flex justify-center">
          
            <h1
              id="blogs-heading"
              className="mt-28 text-center text-2xl font-bold tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] md:text-3xl"
            >
              My Blogs
            </h1>
        </section>

        <BlogHyperScroll blogs={blogs} />
      </main>

      <Footer />
    </div>
  );
}
