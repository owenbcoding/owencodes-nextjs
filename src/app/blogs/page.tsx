import Image from "next/image";
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
    <div className="relative flex min-h-dvh w-full min-w-0 max-w-full flex-col overflow-x-hidden overflow-y-auto overscroll-none bg-black">
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-br from-black via-slate-950 to-teal-950" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-black/70 via-transparent to-teal-900/40" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

      <ParticlesBackground words={BLOG_WORDS} id="blogs-particles" />

      <MainNavigation />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-start gap-0 px-4 pb-8 pt-18 md:justify-center">
        <h1
          id="blogs-heading"
          className="theme-heading mb-8 shrink-0 text-center text-2xl font-bold sm:mb-12 md:mb-16 md:text-3xl lg:mb-20"
        >
          My Blogs
        </h1>

        <div className="relative flex h-[clamp(24rem,52dvh,36rem)] w-full shrink-0 flex-col overflow-hidden rounded-2xl border border-teal-500/15 ring-1 ring-white/5 sm:h-[clamp(26rem,55dvh,34rem)]">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
            <Image
              src="/images/Animated.png"
              alt="Illustration: learning, code, and writing"
              width={1200}
              height={675}
              priority
              className="absolute left-0 top-0 h-[180%] w-full object-cover object-top"
              sizes="(min-width: 1200px) 72rem, 100vw"
            />
          </div>
          <div className="relative z-10 mt-6 flex h-full min-h-0 flex-1 flex-col sm:mt-8 md:mt-10">
            <BlogHyperScroll blogs={blogs} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
