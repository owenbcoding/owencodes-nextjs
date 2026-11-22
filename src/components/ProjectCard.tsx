import Image from "next/image";
import Link from "next/link";
import { ProjectCardDescription } from "@/components/ProjectCardDescription";
import { PROJECT_CATEGORY_LABELS, type Project } from "@/lib/projects";

function projectPlaceholderLabel(project: Project) {
  if (project.statusLabel) return project.statusLabel;
  if (project.status === "coming-soon") return "Planned";
  return "In development";
}

function ProjectCardPlaceholder({ project }: { project: Project }) {
  if (project.status === "coming-soon") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-teal-950/90 via-slate-950 to-black px-4 text-center">
        <span className="theme-title-font text-sm font-medium text-teal-100/75">
          {projectPlaceholderLabel(project)}
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
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
    <article className="blog-card group relative h-full rounded-xl p-[1.5px]">
      <span aria-hidden="true" className="blog-card-rgb-border" />
      <div className="blog-card-content relative flex h-full flex-col rounded-[calc(0.75rem-1.5px)] p-3 sm:p-4">
        <h3 className="theme-heading mb-2 line-clamp-2 text-base leading-snug font-semibold sm:text-lg">
          {project.title}
        </h3>

        <div className="blog-card-artwork relative mb-3 aspect-[1.65] shrink-0 overflow-hidden rounded-lg">
          {hasMedia ? (
            <ProjectMedia project={project} />
          ) : (
            <ProjectCardPlaceholder project={project} />
          )}

          {project.status !== "live" ? (
            <span className="pointer-events-none absolute right-2.5 bottom-2.5 z-30 rounded-full border border-teal-400/30 bg-teal-500/20 px-2 py-0.5 text-[0.6rem] font-semibold text-teal-100 backdrop-blur-sm">
              {projectPlaceholderLabel(project)}
            </span>
          ) : null}

          {hasMedia && hasImageLink
            ? isExternalImageLink
              ? (
                  <a
                    href={imageHref!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-20 cursor-pointer"
                    aria-label={`Open ${project.title} preview`}
                  >
                    <span className="sr-only">Open {project.title}</span>
                  </a>
                )
              : (
                  <Link
                    href={imageHref!}
                    className="absolute inset-0 z-20 cursor-pointer"
                    aria-label={`Open ${project.title} preview`}
                  >
                    <span className="sr-only">Open {project.title}</span>
                  </Link>
                )
            : null}
        </div>

        <ProjectCardDescription
          text={project.description}
          idPrefix={project.slug}
        />

        <div className="mt-auto flex flex-col items-start pt-2">
          <span className="theme-accent-text rounded-full border border-teal-400/30 bg-teal-500/15 px-2 py-0.5 text-[0.6rem] font-semibold tracking-[0.14em] uppercase">
            {project.categoryLabel ?? PROJECT_CATEGORY_LABELS[project.category]}
          </span>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {project.stacks.map((stack) => (
              <li
                key={`${project.slug}-${stack}`}
                className="theme-accent-text rounded-md bg-teal-500/15 px-1.5 py-0.5 text-[0.65rem] font-medium"
              >
                {stack}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
