import { sanityClient } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";

export type ProjectStatus = "live" | "coming-soon" | "in-development";

export type Project = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  /** Muted video thumbnail for the card (e.g. product walkthrough). */
  video?: string;
  stacks: string[];
  status: ProjectStatus;
  statusLabel?: string;
  imageHref?: string;
  link?: { href: string; label: string };
  /** Slug of the matching post in content/project-archive. */
  archiveSlug?: string;
};

export const PROJECT_FILTERS = [
  "All",
  "Laravel",
  "Vue.js",
  "Shopify",
  "Next.js",
  "Livewire",
  "AI",
] as const;

export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

const localProjects: Project[] = [
  {
    slug: "shopify-store-redesign",
    title: "Shopify Store",
    description: "A store I scaled and redesigned based in Ireland.",
    video: "/images/shopify-new.mp4",
    stacks: ["Shopify", "Liquid", "Dawn theme", "Ecommerce"],
    status: "live",
    statusLabel: "New Theme launching soon",
    imageHref: "/projects/shopify-store-preview",
    link: { href: "https://brioils.store/", label: "Visit live site" },
    archiveSlug: "Project-Archive-003",
  },
  {
    slug: "tracton-biodiversity-group",
    title: "Tracton Community",
    description: "A community made website for a local wildlife community",
    image: "/images/tractontbg.png",
    stacks: ["Next.js", "TailwindCSS", "TypeScript", "Sanity"],
    status: "live",
    link: { href: "https://www.tractonbiodiversity.org/", label: "Visit live site" },
  },
  {
    slug: "leadscout",
    title: "Leadscout",
    description: "A freelancing program to help find clients nearby online.",
    image: "/images/Leadscout-app.png",
    stacks: ["Next.js", "TailwindCSS", "TypeScript", "AI"],
    status: "live",
    imageHref: "https://www.leadscout.work/",
    link: { href: "https://www.leadscout.work/", label: "Visit live site" },
    archiveSlug: "Project-Archive-002",
  },
];

export async function getAllProjects(): Promise<Project[]> {
  if (!sanityClient) return localProjects;

  const sanityProjects = await sanityClient.fetch<Project[]>(projectsQuery);
  const projectsBySlug = new Map(
    localProjects.map((project) => [project.slug, project]),
  );

  for (const project of sanityProjects) {
    if (project.slug === "specsage") continue;
    projectsBySlug.set(
      project.slug,
      project.slug === "tracton-biodiversity-group"
        ? { ...project, title: "Tracton Community" }
        : project,
    );
  }

  return Array.from(projectsBySlug.values());
}

export const projects = localProjects;
