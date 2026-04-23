import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { ParticlesBackground } from "@/components/ParticlesBackground";

/*
Temporarily commented out projects UI:

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectsFilterNav } from "@/components/ProjectsFilterNav";
import { projects, type ProjectFilter } from "@/lib/projects";
*/

export default function ProjectsPage() {
  /*
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) =>
      project.stacks.some(
        (stack) => stack.toLowerCase() === activeFilter.toLowerCase(),
      ),
    );
  }, [activeFilter]);
  */

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
            className="mb-4 mt-5 text-4xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
          >
            Projects
          </h1>
          <p className="mx-auto max-w-xl text-base text-slate-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] md:text-lg">
            A refreshed project showcase is on the way.
          </p>
        </section>

        <section
          aria-label="Projects placeholder"
          className="flex flex-1 items-center justify-center py-12"
        >
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-black/40 px-8 py-16 text-center shadow-2xl backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-300">
              Projects
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
              Adding projects soon
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-slate-300">
              I&apos;m updating this section right now. Check back soon for the full
              project showcase.
            </p>
          </div>

          {/*
          <ProjectsFilterNav active={activeFilter} onChange={setActiveFilter} />

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
          */}
        </section>
      </main>

      <Footer />
    </div>
  );
}
