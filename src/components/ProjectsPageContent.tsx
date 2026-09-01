"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectsFilterNav } from "@/components/ProjectsFilterNav";
import { projects, type ProjectFilter } from "@/lib/projects";

export function ProjectsPageContent() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) =>
      project.stacks.some(
        (stack) => stack.toLowerCase() === activeFilter.toLowerCase(),
      ),
    );
  }, [activeFilter]);

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
          <p className="theme-body mx-auto mt-4 max-w-prose text-sm leading-relaxed md:text-base">
            Some projects will be removed and updated over time. If they do, visit the <Link href="/project-archive" className="underline underline-offset-2">archive</Link> page to read about the older project and view the live link.
          </p>
          <ProjectsFilterNav active={activeFilter} onChange={setActiveFilter} />
        </section>

        <section aria-label="Project list" className="mt-10">
          {filteredProjects.length === 0 ? (
            <p className="theme-muted-soft mt-16 text-center">
              No projects match this filter yet. Check back soon!
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProjects.map((project) => (
                <li key={project.slug} className="h-full">
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
