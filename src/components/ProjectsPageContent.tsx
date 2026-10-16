"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectsFilterNav } from "@/components/ProjectsFilterNav";
import type { Project, ProjectFilter } from "@/lib/projects";

const PROJECTS_PER_PAGE = 8;

export function ProjectsPageContent({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showArchiveInfo, setShowArchiveInfo] = useState(false);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) =>
      project.stacks.some(
        (stack) => stack.toLowerCase() === activeFilter.toLowerCase(),
      ),
    );
  }, [activeFilter, projects]);
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const pageProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE,
  );

  function handleFilterChange(filter: ProjectFilter) {
    setActiveFilter(filter);
    setCurrentPage(1);
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
          <p className="theme-body mx-auto max-w-prose text-md leading-relaxed md:text-xl">
            Browse my projects.
            <br />
            Select a category to filter.
          </p>
          <button
            type="button"
            aria-expanded={showArchiveInfo}
            aria-controls="archive-info"
            onClick={() => setShowArchiveInfo((visible) => !visible)}
            className="theme-nav-link mt-3 cursor-pointer rounded-full px-5 py-2 text-sm font-semibold tracking-wide transition-colors duration-200"
          >
            {showArchiveInfo ? "Read less" : "Read me"}
          </button>
          {showArchiveInfo && (
            <p
              id="archive-info"
              className="theme-body mx-auto mt-3 max-w-prose text-sm leading-relaxed md:text-base"
            >
              Some projects will be removed and updated over time. When they
              are, visit the{" "}
              <Link
                href="/archive"
                className="theme-accent-text underline underline-offset-2 hover:opacity-80"
              >
                archive
              </Link>{" "}
              to read about older projects and view their live links.
            </p>
          )}
          <ProjectsFilterNav active={activeFilter} onChange={handleFilterChange} />
        </section>

        <section aria-label="Project list" className="mt-10">
          {filteredProjects.length === 0 ? (
            <p className="theme-muted-soft mt-16 text-center">
              No projects match this filter yet. Check back soon!
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pageProjects.map((project) => (
                <li key={project.slug} className="h-full">
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          )}

          {totalPages > 1 ? (
            <nav
              aria-label="Project pagination"
              className="mt-10 flex items-center justify-center gap-2"
            >
              <button
                type="button"
                onClick={() => setCurrentPage((page) => page - 1)}
                disabled={currentPage === 1}
                className="theme-pill rounded-full border px-3 py-1.5 text-sm font-medium disabled:pointer-events-none disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                    className={`min-w-9 rounded-full border px-3 py-1.5 text-center text-sm font-medium transition-colors duration-200 ${
                      page === currentPage
                        ? "border-teal-400/50 bg-white text-slate-900 shadow-[0_0_12px_rgba(45,212,191,0.4)]"
                        : "theme-pill"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() => setCurrentPage((page) => page + 1)}
                disabled={currentPage === totalPages}
                className="theme-pill rounded-full border px-3 py-1.5 text-sm font-medium disabled:pointer-events-none disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          ) : null}
        </section>
      </main>

      <Footer />
    </div>
  );
}
