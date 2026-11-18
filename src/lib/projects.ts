import { plannedProjects } from "@/lib/planned-projects";
import { sanityClient } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";

export type ProjectStatus = "live" | "coming-soon" | "in-development";

/** Section of the projects page the project is listed under. */
export type ProjectCategory = "software" | "hardware" | "iot";

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  software: "Web apps",
  hardware: "Hardware",
  iot: "IoT",
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
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
  /** When the project went live (or was published); newest projects are listed first. */
  createdAt?: string;
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
    category: "software",
    video: "/images/shopify-new.mp4",
    stacks: ["Shopify", "Liquid", "Dawn theme", "Ecommerce"],
    status: "live",
    statusLabel: "New Theme launching soon",
    imageHref: "/projects/shopify-store-preview",
    link: { href: "https://brioils.store/", label: "Visit live site" },
    archiveSlug: "Project-Archive-003",
    createdAt: "2026-08-21",
  },
  {
    slug: "tracton-biodiversity-group",
    title: "Tracton Website",
    description: "A community made website for a local wildlife community",
    category: "software",
    image: "/images/tractontbg.png",
    stacks: ["Next.js", "TailwindCSS", "TypeScript", "Sanity"],
    status: "live",
    link: { href: "https://www.tractonbiodiversity.org/", label: "Visit live site" },
    createdAt: "2026-08-08",
  },
  {
    slug: "leadscout",
    title: "Leadscout App",
    description: "A freelancing program to help find clients nearby online.",
    category: "software",
    image: "/images/Leadscout-app.png",
    stacks: ["Next.js", "TailwindCSS", "TypeScript", "AI"],
    status: "live",
    imageHref: "https://www.leadscout.work/",
    link: { href: "https://www.leadscout.work/", label: "Visit live site" },
    archiveSlug: "Project-Archive-002",
    createdAt: "2026-08-18",
  },
];

/** Everything the site can render from code: live entries plus planned builds. */
const codeProjects: Project[] = [...localProjects, ...plannedProjects];

type SanityProject = Omit<Project, "category"> & { category?: string };

/** Older Sanity documents predate the category field, so default them to software. */
function normalizeCategory(value?: string): ProjectCategory {
  if (value === "hardware" || value === "iot") return value;
  return "software";
}

function byNewest(a: Project, b: Project): number {
  const aTime = a.createdAt ? Date.parse(a.createdAt) : Number.NaN;
  const bTime = b.createdAt ? Date.parse(b.createdAt) : Number.NaN;
  const aDated = !Number.isNaN(aTime);
  const bDated = !Number.isNaN(bTime);

  // Undated entries count as brand new, so a freshly added project is never
  // pushed to the right-hand end of its row.
  if (aDated !== bDated) return aDated ? 1 : -1;
  if (!aDated && !bDated) return 0;
  return bTime - aTime;
}

export async function getAllProjects(): Promise<Project[]> {
  if (!sanityClient) return [...codeProjects].sort(byNewest);

  const sanityProjects = await sanityClient.fetch<SanityProject[]>(projectsQuery);
  const projectsBySlug = new Map(
    codeProjects.map((project) => [project.slug, project]),
  );

  for (const project of sanityProjects) {
    if (project.slug === "specsage") continue;
    const normalized: Project = {
      ...project,
      category: normalizeCategory(project.category),
    };
    if (project.slug === "tracton-biodiversity-group") {
      normalized.title = "Tracton Website";
    }
    if (project.slug === "leadscout") {
      normalized.title = "Leadscout App";
    }
    projectsBySlug.set(project.slug, normalized);
  }

  return Array.from(projectsBySlug.values()).sort(byNewest);
}

export const projects = localProjects;
