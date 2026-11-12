"use client";

import { useState } from "react";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/projects";

const PROJECTS_PER_SLIDE = 2;

export function ProjectsPageContent({ projects }: { projects: Project[] }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slideCount = Math.ceil(projects.length / PROJECTS_PER_SLIDE);
  const visibleProjects = projects.slice(
    activeSlide * PROJECTS_PER_SLIDE,
    (activeSlide + 1) * PROJECTS_PER_SLIDE,
  );

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
                  projects.length,
                )} of ${projects.length}`}
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
