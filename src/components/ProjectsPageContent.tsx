import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { ProjectsSection } from "@/components/ProjectsSection";
import type { Project, ProjectCategory } from "@/lib/projects";

const SECTIONS: {
  id: string;
  category: ProjectCategory;
  eyebrow: string;
  title: string;
  titleAside?: string;
  description: string;
  emptyMessage: string;
}[] = [
  {
    id: "web-apps-heading",
    category: "software",
    eyebrow: "Web, apps & stores",
    title: "Apps I made",
    titleAside: "My Work",
    description:
      "Sites, apps and experiments I designed and built for clients or myself.",
    emptyMessage: "No web app projects yet. Check back soon.",
  },
  // Hidden for now until there are hardware projects to show. Restore by
  // uncommenting these entries (nothing was deleted).
  /*
  {
    id: "hardware-projects-heading",
    category: "hardware",
    eyebrow: "Built to touch",
    title: "Hardware projects",
    titleAside: "Save money the smart way fun DIY home projects",
    description:
      "Physical builds and electronics I have put together on the bench.",
    emptyMessage: "No hardware projects yet. Check back soon.",
  },
  {
    id: "iot-projects-heading",
    category: "iot",
    eyebrow: "Connected devices",
    title: "IoT projects",
    titleAside: "Fun home DIY projects",
    description:
      "Connected devices and sensor projects, from the board to the dashboard.",
    emptyMessage: "No IoT projects yet. Check back soon.",
  },
  */
];

export function ProjectsPageContent({ projects }: { projects: Project[] }) {
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

        {SECTIONS.map((section) => (
          <ProjectsSection
            key={section.category}
            id={section.id}
            eyebrow={section.eyebrow}
            title={section.title}
            titleAside={section.titleAside}
            description={section.description}
            emptyMessage={section.emptyMessage}
            projects={projects.filter(
              (project) => project.category === section.category,
            )}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
}
