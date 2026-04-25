"use client";

import { PROJECT_FILTERS, type ProjectFilter } from "@/lib/projects";

type Props = {
  active: ProjectFilter;
  onChange: (filter: ProjectFilter) => void;
};

export function ProjectsFilterNav({ active, onChange }: Props) {
  return (
    <nav
      aria-label="Filter projects by technology"
      className="mx-auto mt-4 flex w-full max-w-5xl flex-wrap items-center justify-center gap-1.5"
    >
      {PROJECT_FILTERS.map((filter) => {
        const isActive = filter === active;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            aria-pressed={isActive}
            className={`theme-body cursor-pointer rounded-full px-2 py-0.5 text-xs font-medium leading-tight transition-colors duration-200 sm:text-sm ${
              isActive
                ? "bg-white text-slate-900! shadow-[0_0_6px_rgba(45,212,191,0.45)]"
                : "text-slate-200! hover:bg-white/10 hover:text-teal-300!"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </nav>
  );
}
