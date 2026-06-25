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

export const projects: Project[] = [
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
  },
  {
    slug: "note-flow",
    title: "Note Flow",
    description:
      "A free multi-user app. Import your NOTES directory or GitHub repository into your profile, or write directly in the app. AI-powered note generation with no paid tier.",
    image: "/images/note-flow.png",
    stacks: ["Next.js", "OpenAI", "AI"],
    status: "in-development",
    link: { href: "https://note-flow-livid.vercel.app/", label: "Visit live site" },
  },
  {
    slug: "specsage",
    title: "Specsage",
    description: "Specsage is a AI-powered PC builder assistant.",
    image: "/images/Specsage.png",
    stacks: ["Next.js", "CrewAI", "OpenAI", "Firecrawl", "AI"],
    status: "in-development",
    statusLabel: "In Development",
    link: { href: "https://www.specsage.tech/", label: "Visit live site" },
  },
  {
    slug: "hackerinn",
    title: "Hackerinn",
    description: "A online community platform for accountability and growth.",
    image: "/images/hackerinn.png",
    stacks: ["Laravel", "TailwindCSS", "Vue.js", "PostgreSQL"],
    status: "in-development",
  },
  {
    slug: "playlisted",
    title: "Playlisted",
    description: "A social music app to chat about songs and artists.",
    image: "/images/playlisted-live.png",
    stacks: ["Laravel", "TailwindCSS", "Vue.js", "PostgreSQL"],
    status: "in-development",
  },
  {
    slug: "leadscout",
    title: "Leadscout",
    description: "A freelancing program to help find clients nearby online.",
    image: "/images/Leadscout-app.png",
    stacks: ["Next.js", "TailwindCSS", "TypeScript"],
    status: "in-development",
    statusLabel: "In Development",
    imageHref: "https://www.leadscout.work/",
    link: { href: "https://www.leadscout.work/", label: "Visit live site" },
  },
  {
    slug: "devstories",
    title: "DevStories",
    description: "A platform for sharing developer stories.",
    image: "/images/devstories.png",
    stacks: ["Laravel", "TailwindCSS", "Vue.js", "PostgreSQL"],
    status: "in-development",
  },
  {
    slug: "task-app",
    title: "Task App",
    description: "A smart, AI-powered to-do app.",
    stacks: ["Laravel", "TailwindCSS", "Blade", "PrismPHP", "Livewire", "AI"],
    status: "in-development",
  },
];
