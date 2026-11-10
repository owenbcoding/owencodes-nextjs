"use client";

import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/projects";

const PREVIEW_PROJECTS: Project[] = [
  {
    slug: "layout-preview-05",
    title: "Preview Project 05",
    description: "Placeholder card to preview how a second row will look.",
    stacks: ["Preview only"],
    status: "coming-soon",
    statusLabel: "Layout preview",
  },
  {
    slug: "layout-preview-06",
    title: "Preview Project 06",
    description: "Replace this preview with a real project whenever you're ready.",
    stacks: ["Preview only"],
    status: "coming-soon",
    statusLabel: "Layout preview",
  },
  {
    slug: "layout-preview-07",
    title: "Preview Project 07",
    description: "Placeholder card to show the full two-row project layout.",
    stacks: ["Preview only"],
    status: "coming-soon",
    statusLabel: "Layout preview",
  },
  {
    slug: "layout-preview-08",
    title: "Preview Project 08",
    description: "Replace this preview with a real project whenever you're ready.",
    stacks: ["Preview only"],
    status: "coming-soon",
    statusLabel: "Layout preview",
  },
];

const PROJECTS_PER_SLIDE = 2;
const AUTOPLAY_INTERVAL = 6500;

export function ProjectsPageContent({ projects }: { projects: Project[] }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const displayedProjects =
    projects.length > 0 &&
    projects.length <= 4
      ? [
          ...projects,
          ...PREVIEW_PROJECTS.slice(0, 8 - projects.length),
        ]
      : projects;
  const slideCount = Math.ceil(displayedProjects.length / PROJECTS_PER_SLIDE);
  const visibleProjects = displayedProjects.slice(
    activeSlide * PROJECTS_PER_SLIDE,
    (activeSlide + 1) * PROJECTS_PER_SLIDE,
  );

  useEffect(() => {
    if (isPaused || slideCount < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideCount);
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(interval);
  }, [isPaused, slideCount]);

  function showPreviousSlide() {
    setActiveSlide((current) => (current - 1 + slideCount) % slideCount);
  }

  function showNextSlide() {
    setActiveSlide((current) => (current + 1) % slideCount);
  }

  return (
    <div className="site-shell relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="site-bg-primary pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-side pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-bottom pointer-events-none absolute inset-0 z-0" />

      <ParticlesBackground />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-18 flex w-full max-w-6xl flex-1 flex-col px-4 py-8">
        <section aria-labelledby="projects-heading" className="text-center">
          <h1
            id="projects-heading"
            className="theme-heading mb-4 mt-5 text-4xl font-bold"
          >
            Projects
          </h1>
        </section>

        <section
          aria-label="Featured projects"
          aria-roledescription="carousel"
          className="mt-10 w-full"
        >
          {projects.length === 0 ? (
            <p className="theme-muted-soft mt-16 text-center">
              No projects match this filter yet. Check back soon!
            </p>
          ) : (
            <>
              <div
                key={activeSlide}
                className="project-carousel-slide grid grid-cols-1 gap-6 md:grid-cols-2"
                role="group"
                aria-roledescription="slide"
                aria-label={`Projects ${activeSlide * PROJECTS_PER_SLIDE + 1}–${Math.min(
                  (activeSlide + 1) * PROJECTS_PER_SLIDE,
                  displayedProjects.length,
                )} of ${displayedProjects.length}`}
              >
                {visibleProjects.map((project, index) => (
                  <div
                    key={project.slug}
                    className={`project-card-enter min-w-0 project-card-enter-${index + 1}`}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>

              {slideCount > 1 ? (
                <div
                  aria-label="Project carousel controls"
                  className="theme-muted mt-5 flex items-center justify-center gap-3"
                >
                  <button
                    type="button"
                    onClick={showPreviousSlide}
                    className="theme-pill flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-teal-400/50 hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                    aria-label="Show previous projects"
                  >
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                      <path d="M16 10H4m0 0 5-5m-5 5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <span className="min-w-12 text-center text-sm tabular-nums">
                    {String(activeSlide + 1).padStart(2, "0")} /{" "}
                    {String(slideCount).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={showNextSlide}
                    className="theme-pill flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-teal-400/50 hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                    aria-label="Show next projects"
                  >
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                      <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPaused((paused) => !paused)}
                    className="theme-pill flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-teal-400/50 hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                    aria-label={isPaused ? "Play automatic project rotation" : "Pause automatic project rotation"}
                    aria-pressed={isPaused}
                  >
                    {isPaused ? (
                      <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path d="M6 4.8a1 1 0 0 1 1.52-.85l7.2 4.2a1 1 0 0 1 0 1.7l-7.2 4.2A1 1 0 0 1 6 13.2V4.8Z" />
                      </svg>
                    ) : (
                      <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path d="M6 4.5A1.5 1.5 0 0 1 7.5 6v8a1.5 1.5 0 0 1-3 0V6A1.5 1.5 0 0 1 6 4.5Zm8 0A1.5 1.5 0 0 1 15.5 6v8a1.5 1.5 0 0 1-3 0V6A1.5 1.5 0 0 1 14 4.5Z" />
                      </svg>
                    )}
                  </button>
                </div>
              ) : null}
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
