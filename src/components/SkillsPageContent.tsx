"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Ecommerce",
  "CMS",
  "AI",
] as const;
type Category = (typeof categories)[number];
type SkillCategory = Exclude<Category, "All">;

const categoryDescriptions: Record<SkillCategory, string> = {
  Frontend: "For quick development",
  Backend: "My original stack",
  Ecommerce: "For e-commerce development",
  CMS: "For a quick CMS",
  AI: "New tech I'm learning",
};

const skills: {
  name: string;
  icon: string;
  category: SkillCategory;
  description: string;
  project: string;
}[] = [
  {
    name: "HTML",
    icon: "vscode-icons:file-type-html",
    category: "Frontend",
    description: "Creating semantic, accessible foundations for the web.",
    project: "Used across my websites and web apps",
  },
  {
    name: "CSS",
    icon: "logos:css-3",
    category: "Frontend",
    description: "Shaping responsive layouts, visual systems, and interactions.",
    project: "Used across my websites and web apps",
  },
  {
    name: "TailwindCSS",
    icon: "logos:tailwindcss-icon",
    category: "Frontend",
    description: "Building responsive interfaces with utility-first styling.",
    project: "Tracton B Group · Leadscout",
  },
  {
    name: "JavaScript",
    icon: "logos:javascript",
    category: "Frontend",
    description: "Bringing interfaces and product ideas to life with code.",
    project: "Used across my websites and web apps",
  },
  {
    name: "TypeScript",
    icon: "logos:typescript-icon",
    category: "Frontend",
    description: "Writing typed application code for dependable products.",
    project: "Tracton B Group · Leadscout",
  },
  {
    name: "Vue",
    icon: "logos:vue",
    category: "Frontend",
    description: "Creating reactive, component-based interfaces.",
    project: "Part of my frontend toolkit",
  },
  {
    name: "React",
    icon: "logos:react",
    category: "Frontend",
    description: "Building flexible, component-driven user interfaces.",
    project: "Used in my Next.js projects",
  },
  {
    name: "Laravel",
    icon: "logos:laravel",
    category: "Backend",
    description: "Developing full-stack web applications with Laravel.",
    project: "Part of my full-stack toolkit",
  },
  {
    name: "PHP",
    icon: "logos:php",
    category: "Backend",
    description: "Building and extending web applications with PHP.",
    project: "Part of my full-stack toolkit",
  },
  {
    name: "PostgreSQL",
    icon: "logos:postgresql",
    category: "Backend",
    description: "Working with structured data in a relational database.",
    project: "Part of my full-stack toolkit",
  },
  {
    name: "Shopify",
    icon: "logos:shopify",
    category: "Ecommerce",
    description: "Improving storefronts and building better shopping experiences.",
    project: "Scaled and redesigned a Shopify store",
  },
  {
    name: "Liquid",
    icon: "simple-icons:shopify",
    category: "Ecommerce",
    description: "Customising Shopify storefronts with Liquid templates.",
    project: "Shopify store redesign",
  },
  {
    name: "Sanity",
    icon: "simple-icons:sanity",
    category: "CMS",
    description: "Connecting flexible content editing to modern websites.",
    project: "Tracton B Group",
  },
  {
    name: "Custom CMS",
    icon: "carbon:edit",
    category: "CMS",
    description: "Creating content management experiences tailored to a project.",
    project: "Part of my CMS toolkit",
  },
  {
    name: "OpenAI",
    icon: "simple-icons:openai",
    category: "AI",
    description: "Building AI-powered tools that help solve real problems.",
    project: "SpecSage · Leadscout",
  },
  {
    name: "CrewAI",
    icon: "carbon:flow",
    category: "AI",
    description: "Orchestrating AI agents to power useful product features.",
    project: "SpecSage",
  },
];

export function SkillsPageContent() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const visibleSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  function selectCategory(category: Category) {
    setActiveCategory(category);
    setSelectedSkill(null);
  }

  return (
    <div className="site-shell relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="site-bg-primary pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-side pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-bottom pointer-events-none absolute inset-0 z-0" />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-18 flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6">
        <header className="skills-hero-panel page-fade-in relative overflow-hidden rounded-3xl border border-teal-300/15 px-6 py-10 shadow-[0_20px_80px_rgba(13,148,136,0.12)] sm:px-10 sm:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl"
          />
          <div className="relative max-w-3xl">
            <h1 className="theme-heading text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Skills that turn
              <span className="skills-page-accent block">
                ideas into live applications.
              </span>
            </h1>
            <p className="theme-subheading mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              A hands-on mix of full-stack development, e-commerce, and AI —
              grounded in the websites and products I build.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["FULL-STACK", "AI & AUTOMATION", "E-COMMERCE"].map((focus) => (
                <span
                  key={focus}
                  className="skills-focus-tag rounded-full border border-teal-300/20 bg-teal-300/[0.06] px-3 py-1.5 font-mono text-[0.68rem] tracking-wider"
                >
                  {focus}
                </span>
              ))}
            </div>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-7 right-9 hidden rotate-[-8deg] rounded-2xl border border-teal-300/15 bg-slate-950/50 p-4 font-mono text-xs leading-6 text-teal-100/55 shadow-xl lg:block"
          >
            <span className="text-teal-400">const</span> idea ={" "}
            <span className="text-amber-200">&quot;something useful&quot;</span>;
            <br />
            <span className="text-teal-400">build</span>(idea);
            <br />
            <span className="text-teal-400">ship</span>();
            <span className="ml-1 inline-block h-3 w-1 animate-pulse bg-teal-300 align-middle" />
          </div>
        </header>

        <section aria-labelledby="skills-heading" className="mt-12 sm:mt-16">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="theme-accent-text font-mono text-xs uppercase tracking-[0.2em]">
                01 / What I work with
              </p>
              <h2
                id="skills-heading"
                className="theme-heading mt-2 text-3xl font-bold sm:text-4xl"
              >
                Pick a lane. Explore.
              </h2>
            </div>
            <p className="theme-muted max-w-sm text-sm leading-relaxed">
              Choose an area, then open a card to see where I put that skill to
              work.
            </p>
          </div>

          <div
            className="mt-7 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter skills by area"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => selectCategory(category)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 ${
                    isActive
                      ? "skills-filter-active border-teal-300/60 bg-teal-300/15 shadow-[0_0_22px_rgba(45,212,191,0.12)]"
                      : "theme-pill hover:-translate-y-0.5"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <p className="theme-muted mt-4 text-sm" aria-live="polite">
            {String(visibleSkills.length).padStart(2, "0")} skills{" "}
            <span className="mx-1 text-teal-400/50">/</span>{" "}
            {activeCategory === "All"
              ? "Explore the tools I use to build and ship."
              : categoryDescriptions[activeCategory]}
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleSkills.map((skill, index) => {
              const isSelected = selectedSkill === skill.name;
              const detailId = `skill-detail-${skill.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")}`;

              return (
                <article
                  key={skill.name}
                  className={`blog-card group relative min-w-0 rounded-2xl p-[1.5px] page-fade-in page-fade-in-delay-${Math.min(
                    (index % 4) + 1,
                    3,
                  )}`}
                >
                  <span aria-hidden="true" className="blog-card-rgb-border" />
                  <div className="blog-card-content relative flex h-full min-h-44 flex-col rounded-[calc(1rem-1.5px)] p-5 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <button
                      type="button"
                      aria-expanded={isSelected}
                      aria-controls={detailId}
                      onClick={() =>
                        setSelectedSkill(isSelected ? null : skill.name)
                      }
                      className="flex w-full items-center gap-4 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-400"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-teal-300/15 bg-teal-300/[0.06] transition duration-300 group-hover:border-teal-300/35 group-hover:bg-teal-300/10">
                        <Icon icon={skill.icon} width="28" height="28" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="theme-card-title block truncate text-lg font-semibold">
                          {skill.name}
                        </span>
                        <span className="theme-muted mt-1 block text-xs">
                          {skill.category}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-lg text-teal-300 transition duration-200 ${
                          isSelected ? "rotate-45 border-teal-300/40" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>

                    <p className="theme-muted-soft mt-5 text-sm leading-relaxed">
                      {skill.description}
                    </p>

                    <div
                      id={detailId}
                      hidden={!isSelected}
                      className="mt-4 border-t border-teal-300/15 pt-4"
                    >
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-teal-300/75">
                        In practice
                      </p>
                      <p className="theme-muted-soft mt-2 text-sm leading-relaxed">
                        {skill.project}
                      </p>
                      <Link
                        href="/projects"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-300 transition hover:gap-3 hover:text-teal-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-400"
                      >
                        Explore projects <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-teal-300/15 bg-teal-300/[0.04] px-6 py-8 text-center sm:mt-20 sm:px-10">
          <p className="theme-accent-text font-mono text-xs uppercase tracking-[0.2em]">
            Have an idea?
          </p>
          <h2 className="theme-heading mt-3 text-2xl font-bold sm:text-3xl">
            Let&apos;s make something useful.
          </h2>
          <p className="theme-muted-soft mx-auto mt-3 max-w-xl text-sm leading-relaxed">
            From a first sketch to a polished product, I enjoy figuring out the
            right way to bring an idea to life.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-teal-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-teal-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
            >
              Get in touch
            </Link>
            <Link
              href="/projects"
              className="theme-pill rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
            >
              Browse projects
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
