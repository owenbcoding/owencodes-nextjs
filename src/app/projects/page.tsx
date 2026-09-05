import { ProjectsPageContent } from "@/components/ProjectsPageContent";
import { getAllProjects } from "@/lib/projects";

export const metadata = {
  title: "Owen | Projects",
  description: "Browse my projects and case studies.",
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  return <ProjectsPageContent projects={projects} />;
}
