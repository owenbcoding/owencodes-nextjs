import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { ProjectArchivePagination } from "@/components/ProjectArchivePagination";
import { ProjectArchiveCard } from "@/components/ProjectArchiveCard";
import {
  getAllArchivePosts,
  getArchiveTotalPages,
  groupArchivePosts,
  paginateArchivePosts,
} from "@/lib/project-archive";

export const revalidate = 60;

export const metadata = {
  title: "Owen | Archive",
  description:
    "Read past project archive posts about full-stack development, AI, and building projects.",
  alternates: {
    canonical: "/project-archive",
  },
};

type ProjectArchivePageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function ProjectArchivePage({
  searchParams,
}: ProjectArchivePageProps) {
  const { page: pageParam } = await searchParams;
  const posts = await getAllArchivePosts();
  const totalPages = getArchiveTotalPages(posts.length);
  const requestedPage = Number(pageParam);
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, totalPages)
      : 1;
  const pagePosts = paginateArchivePosts(posts, currentPage);
  const sections = groupArchivePosts(pagePosts);

  return (
    <div className="site-shell relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="site-bg-primary pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-side pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-bottom pointer-events-none absolute inset-0 z-0" />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-18 flex w-full max-w-4xl flex-1 flex-col px-4 py-8">
        <section
          aria-labelledby="archive-heading"
          className="mb-6 flex flex-col items-center gap-6 text-center"
        >
          <h1
            id="archive-heading"
            className="theme-heading mt-5 text-4xl font-bold"
          >
            Project Archive
          </h1>
          <p className="theme-body mx-auto max-w-prose text-lg leading-relaxed md:text-xl">
            Explore past archive posts about full-stack development, AI, and the
            projects I&apos;m building.
          </p>
        </section>

        {posts.length > 0 ? (
          <section aria-label="Project archive list">
            <div className="space-y-10">
              {sections.map((section) => (
                <section
                  key={section.title}
                  aria-labelledby={`archive-section-${section.title
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  <h2
                    id={`archive-section-${section.title
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                    className="theme-heading mb-4 text-center text-2xl font-bold"
                  >
                    {section.title}
                  </h2>
                  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {section.posts.map((post) => (
                      <li key={post.slug}>
                        <ProjectArchiveCard post={post} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <ProjectArchivePagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </section>
        ) : (
          <section className="py-16 text-center">
            <p className="theme-muted-soft mb-6">
              No archive posts published yet. Check back soon!
            </p>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
