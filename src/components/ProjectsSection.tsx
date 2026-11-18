"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/projects";

const PROJECTS_PER_SLIDE = 3;

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  projects: Project[];
  emptyMessage: string;
};

const arrowButtonClass =
  "pointer-events-none absolute top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/85 text-slate-200 opacity-0 shadow-lg backdrop-blur transition-opacity duration-200 hover:border-teal-400/50 hover:text-teal-300 focus-visible:pointer-events-auto focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 group-hover/carousel:pointer-events-auto group-hover/carousel:opacity-100";

export function ProjectsSection({
  id,
  eyebrow,
  title,
  description,
  projects,
  emptyMessage,
}: Props) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slideCount = Math.ceil(projects.length / PROJECTS_PER_SLIDE);
  const currentSlide = slideCount > 0 ? activeSlide % slideCount : 0;
  const visibleProjects = projects.slice(
    currentSlide * PROJECTS_PER_SLIDE,
    (currentSlide + 1) * PROJECTS_PER_SLIDE,
  );

  function showPreviousSlide() {
    setActiveSlide((current) => (current - 1 + slideCount) % slideCount);
  }

  function showNextSlide() {
    setActiveSlide((current) => (current + 1) % slideCount);
  }

  return (
    <section aria-labelledby={id} className="mt-12 w-full first:mt-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="theme-accent-text mb-1 text-[0.65rem] font-semibold tracking-[0.2em] uppercase">
            {eyebrow}
          </p>
          <h2 id={id} className="theme-heading text-2xl font-semibold sm:text-3xl">
            {title}
          </h2>
          <p className="theme-muted-soft mt-1 max-w-2xl text-sm leading-relaxed">
            {description}
          </p>
        </div>
        {projects.length > 0 ? (
          <span className="theme-muted shrink-0 text-xs whitespace-nowrap">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </span>
        ) : null}
      </div>

      {projects.length === 0 ? (
        <p className="theme-muted-soft rounded-xl border border-dashed border-white/10 bg-black/20 px-5 py-8 text-center text-sm">
          {emptyMessage}
        </p>
      ) : (
        <>
          <div className="group/carousel relative">
            <div
              key={currentSlide}
              className="project-carousel-slide grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              role="group"
              aria-roledescription="slide"
              aria-label={`Projects ${currentSlide * PROJECTS_PER_SLIDE + 1}–${Math.min(
                (currentSlide + 1) * PROJECTS_PER_SLIDE,
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
              <>
                <button
                  type="button"
                  onClick={showPreviousSlide}
                  aria-label={`Show previous ${title.toLowerCase()}`}
                  className={`${arrowButtonClass} left-0 -translate-x-1/3`}
                >
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                    <path d="M16 10H4m0 0 5-5m-5 5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={showNextSlide}
                  aria-label={`Show next ${title.toLowerCase()}`}
                  className={`${arrowButtonClass} right-0 translate-x-1/3`}
                >
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                    <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            ) : null}
          </div>

          {slideCount > 1 ? (
            <div
              aria-label={`${title} carousel controls`}
              className="theme-muted mt-5 flex items-center justify-center gap-3"
            >
              <button
                type="button"
                onClick={showPreviousSlide}
                className="theme-pill flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:border-teal-400/50 hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                aria-label={`Show previous ${title.toLowerCase()}`}
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                  <path d="M16 10H4m0 0 5-5m-5 5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="min-w-12 text-center text-xs tabular-nums">
                {String(currentSlide + 1).padStart(2, "0")} /{" "}
                {String(slideCount).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={showNextSlide}
                className="theme-pill flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:border-teal-400/50 hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                aria-label={`Show next ${title.toLowerCase()}`}
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                  <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
