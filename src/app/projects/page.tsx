import { ProjectsPageContent } from "@/components/ProjectsPageContent";

export const metadata = {
  title: "Projects | Full Stack Dev",
  description: "Browse my projects and case studies.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
