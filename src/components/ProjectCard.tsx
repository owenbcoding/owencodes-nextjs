import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const hasImage = Boolean(project.image);
  const hasLink = Boolean(project.link);
  const imageHref = project.imageHref ?? project.link?.href;
  const hasImageLink = Boolean(imageHref);
  const isExternalImageLink = Boolean(imageHref?.startsWith("http"));

  return (
    <article className="cursor-default flex h-full flex-col rounded-lg border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur-sm transition-transform duration-300 hover:scale-105">
      <h3 className="mb-4 text-lg font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
        {project.title}
      </h3>

      <div
        className={`relative mb-4 flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-teal-500/20 bg-teal-900/40 ${
          hasLink ? "" : "cursor-pointer"
        }`}
      >
        {hasImageLink ? (
          isExternalImageLink ? (
            <a
              href={imageHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="block h-full w-full cursor-pointer"
            >
              {hasImage ? (
                <Image
                  src={project.image as string}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-sm font-medium text-teal-100/90">
                  {project.statusLabel ?? "Coming soon"}
                </span>
              )}
            </a>
          ) : (
            <Link href={imageHref!} aria-label={`Open ${project.title}`} className="block h-full w-full cursor-pointer">
              {hasImage ? (
                <Image
                  src={project.image as string}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-sm font-medium text-teal-100/90">
                  {project.statusLabel ?? "Coming soon"}
                </span>
              )}
            </Link>
          )
        ) : hasImage ? (
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

      <ul className="mb-4 flex flex-wrap gap-2">
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
        {hasLink ? (
          <a
            href={project.link!.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={project.link!.label}
            className="inline-flex cursor-pointer items-center justify-center text-teal-300/80 transition-colors hover:text-teal-200"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3c2.5 2.7 4 5.9 4 9s-1.5 6.3-4 9c-2.5-2.7-4-5.9-4-9s1.5-6.3 4-9Z" />
            </svg>
          </a>
        ) : (
          <span aria-hidden="true" className="text-teal-500/60">
            &mdash;
          </span>
        )}
      </div>
    </article>
  );
}
