import Image from "next/image";
import Link from "next/link";
import { ProjectCardDescription } from "@/components/ProjectCardDescription";
import type { Project } from "@/lib/projects";

function projectPlaceholderLabel(project: Project) {
  if (project.statusLabel) return project.statusLabel;
  if (project.status === "coming-soon") return "Coming soon";
  return "In development";
}

function ProjectCardPlaceholder({ project }: { project: Project }) {
  if (project.status === "coming-soon") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-teal-950/90 via-slate-950 to-black px-4 text-center">
        <span className="theme-title-font text-sm font-medium text-teal-100/75">
          Coming soon
        </span>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-teal-950/90 via-slate-950 to-black px-4 text-center">
      <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-teal-300">
        {projectPlaceholderLabel(project)}
      </span>
    </div>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  if (project.video) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={project.video}
        muted
        playsInline
        preload="metadata"
        aria-label={project.title}
      />
    );
  }
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
    );
  }
  return (
    <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-teal-100/90">
      {projectPlaceholderLabel(project)}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const isLive = project.status === "live";
  const hasMedia = isLive && Boolean(project.image || project.video);
  const imageHref = project.imageHref ?? project.link?.href;
  const hasImageLink = Boolean(imageHref);
  const isExternalImageLink = Boolean(imageHref?.startsWith("http"));

  return (
    <article className="cursor-default flex h-full min-h-0 flex-col rounded-lg border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur-sm transition-transform duration-300 hover:scale-105">
      <h3 className="theme-title-font mb-4 shrink-0 text-center text-md font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
        {project.title}
      </h3>

      <div className="relative mt-5 aspect-video w-full shrink-0 overflow-hidden rounded-lg border border-teal-500/20 bg-teal-900/40">
        {hasMedia ? <ProjectMedia project={project} /> : <ProjectCardPlaceholder project={project} />}
        {hasMedia && hasImageLink
          ? isExternalImageLink
            ? (
                <a
                  href={imageHref!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 cursor-pointer"
                  aria-label={`Open ${project.title} preview`}
                >
                  <span className="sr-only">Open {project.title}</span>
                </a>
              )
            : (
                <Link
                  href={imageHref!}
                  className="absolute inset-0 z-10 cursor-pointer"
                  aria-label={`Open ${project.title} preview`}
                >
                  <span className="sr-only">Open {project.title}</span>
                </Link>
              )
          : null}
      </div>

      <div className="mb-5 mt-6 w-full shrink-0">
        <ul className="flex flex-wrap content-start items-start justify-start gap-x-2 gap-y-1.5">
          {project.stacks.map((stack) => (
            <li
              key={`${project.slug}-${stack}`}
              className="rounded-md bg-teal-500/15 px-2 py-0.5 text-xs font-medium text-teal-200"
            >
              {stack}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <ProjectCardDescription text={project.description} idPrefix={project.slug} />
      </div>
    </article>
  );
}
