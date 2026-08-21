import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ProjectArchiveCard } from "@/components/ProjectArchiveCard";
import { getAllArchivePosts } from "@/lib/project-archive";

export const metadata = {
  title: "Project Archive | Owencodes",
  description:
    "Read past project archive posts about full-stack development, AI, and building projects.",
  alternates: {
    canonical: "/project-archive",
  },
};

export default function ProjectArchivePage() {
  const posts = getAllArchivePosts();

  return (
    <div className="site-shell relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="site-bg-primary pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-side pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-bottom pointer-events-none absolute inset-0 z-0" />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-18 flex w-full max-w-4xl flex-1 flex-col px-4 py-8">
        <section aria-labelledby="archive-heading" className="mb-12">
          <h1
            id="archive-heading"
            className="theme-heading mb-3 mt-5 text-4xl font-bold"
          >
            Project Archive
          </h1>
          <p className="theme-body max-w-prose text-lg leading-relaxed md:text-xl">
            Explore past archive posts about full-stack development, AI, and the
            projects I&apos;m building. Subscribe below to get new posts in
            your inbox.
          </p>
        </section>

        {posts.length > 0 ? (
          <>
            <section aria-label="Project archive list" className="mb-16">
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <ProjectArchiveCard post={post} />
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="subscribe-heading"
              className="rounded-lg border border-teal-500/20 bg-teal-500/5 px-6 py-8"
            >
              <h2 id="subscribe-heading" className="theme-heading mb-3 text-2xl font-bold">
                Stay Updated
              </h2>
              <p className="theme-body mb-6 max-w-prose">
                Get notified when I publish a new archive post. No spam, just
                occasional updates about projects and insights.
              </p>
              <NewsletterSignup />
            </section>
          </>
        ) : (
          <section className="py-16 text-center">
            <p className="theme-muted-soft mb-6">
              No archive posts published yet. Check back soon!
            </p>
            <div className="rounded-lg border border-teal-500/20 bg-teal-500/5 px-6 py-8">
              <h2 className="theme-heading mb-3 text-2xl font-bold">
                Want to stay in the loop?
              </h2>
              <p className="theme-body mb-6 max-w-prose">
                Subscribe to get notified when I publish my first archive post.
              </p>
              <NewsletterSignup />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
