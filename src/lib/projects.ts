export type ProjectStatus = "live" | "coming-soon" | "in-development";

export type Project = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  stacks: string[];
  status: ProjectStatus;
  statusLabel?: string;
  link?: { href: string; label: string };
};

export const PROJECT_FILTERS = [
  "All",
  "Laravel",
  "Vue.js",
  "REST APIs",
  "Shopify",
  "Next.js",
  "Livewire",
  "AI",
] as const;

export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export const projects: Project[] = [
  {
    slug: "api-app-placeholder",
    title: "Project Title",
    description: "Project description",
    stacks: ["Laravel"],
    status: "coming-soon",
    statusLabel: "Coming Soon!",
  },
  {
    slug: "shopify-store-redesign",
    title: "Shopify Store Redesign",
    description: "A store I scaled and redesigned based in Ireland.",
    image: "/images/projects/shopify-store.png",
    stacks: ["Shopify", "Ecommerce"],
    status: "live",
    statusLabel: "New Theme launching soon",
  },
  {
    slug: "coming-soon-1",
    title: "Project Title",
    description: "Project description",
    stacks: ["Next.js"],
    status: "coming-soon",
    statusLabel: "Coming Soon!",
  },
  {
    slug: "coming-soon-2",
    title: "Project Title",
    description: "Project description",
    stacks: ["Vue.js"],
    status: "in-development",
    statusLabel: "In Development",
  },
  {
    slug: "playlisted",
    title: "Playlisted",
    description: "A playlist discovery and sharing app.",
    stacks: ["Next.js", "REST APIs"],
    status: "in-development",
  },
  {
    slug: "hackerinn",
    title: "Hackerinn",
    description: "A hacker news-inspired community platform.",
    stacks: ["Laravel", "Livewire"],
    status: "in-development",
  },
  {
    slug: "note-flow",
    title: "Note Flow",
    description: "Notes app with AI-powered summaries.",
    stacks: ["Next.js", "AI"],
    status: "in-development",
  },
  {
    slug: "task-app",
    title: "Task App",
    description: "A productive task management application.",
    stacks: ["Vue.js", "Laravel"],
    status: "in-development",
  },
];
