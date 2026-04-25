"use client";

import { useMemo, useState } from "react";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectsFilterNav } from "@/components/ProjectsFilterNav";
import { projects, type ProjectFilter } from "@/lib/projects";

export default function ProjectsPage() {
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
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-br from-black via-slate-950 to-teal-950" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-black/70 via-transparent to-teal-900/40" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

      <ParticlesBackground />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-14 flex w-full max-w-6xl flex-1 flex-col px-4 py-8">
        <section aria-labelledby="projects-heading" className="text-center">
          <h1
            id="projects-heading"
            className="theme-heading mb-4 mt-5 text-4xl font-bold"
          >
            Projects
          </h1>
          <p className="theme-body mx-auto max-w-prose text-md leading-relaxed md:text-xl">
            Browse my projects by technology stack.
            <br />
            Select a category to filter and explore.
          </p>

          <ProjectsFilterNav active={activeFilter} onChange={setActiveFilter} />
        </section>

        <section aria-label="Project list" className="mt-10">
          {filteredProjects.length === 0 ? (
            <p className="mt-16 text-center text-slate-300">
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
