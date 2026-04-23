import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const hasImage = Boolean(project.image);

  return (
    <article className="flex h-full flex-col rounded-lg border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:transform hover:border-teal-400/50 hover:ring-2 hover:ring-teal-400/50 hover:ring-offset-2 hover:ring-offset-gray-900">
      <h3 className="mb-4 text-center text-lg font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
        {project.title}
      </h3>

      <div className="relative mb-4 flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-teal-500/20 bg-teal-900/40">
        {hasImage ? (
          <Image
            src={project.image as string}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="text-sm font-medium text-teal-100/90">
            {project.statusLabel ?? "Coming soon"}
          </span>
        )}
      </div>

      <ul className="mb-4 flex min-h-[28px] flex-wrap gap-2">
        {project.stacks.map((stack) => (
          <li
            key={`${project.slug}-${stack}`}
            className="rounded-md bg-teal-500/15 px-2 py-0.5 text-xs font-medium text-teal-200"
          >
            {stack}
          </li>
        ))}
      </ul>

      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-200">
        {project.description}
      </p>

      <div className="mt-auto flex items-center justify-center pt-2">
        {project.link ? (
          <Link
            href={project.link.href}
            className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 px-3 py-1 text-xs font-medium text-teal-200 transition-colors hover:border-teal-400 hover:text-white"
          >
            {project.link.label}
          </Link>
        ) : (
          <span aria-hidden="true" className="text-teal-500/60">
            &mdash;
          </span>
        )}
      </div>
    </article>
  );
}
