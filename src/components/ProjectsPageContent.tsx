"use client";

import { useState } from "react";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { ProjectsFilterNav } from "@/components/ProjectsFilterNav";
import type { ProjectFilter } from "@/lib/projects";

export function ProjectsPageContent() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");

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
          <ProjectsFilterNav active={activeFilter} onChange={setActiveFilter} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
