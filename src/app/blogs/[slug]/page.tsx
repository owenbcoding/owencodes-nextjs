import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import {
  formatBlogDate,
  getAllBlogs,
  getBlogBySlug,
} from "@/lib/blogs";

export function generateStaticParams() {
  return getAllBlogs().map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return { title: "Blog not found | Owencodes" };
  return {
    title: `${blog.title} | Owencodes`,
    description: blog.description,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) notFound();

  return (
    <div className="site-shell relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="site-bg-primary pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-side pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-bottom pointer-events-none absolute inset-0 z-0" />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-18 flex w-full max-w-3xl flex-1 flex-col px-4 py-8">
        <Link
          href="/blogs"
          className="theme-accent-text mb-6 inline-flex items-center gap-1 self-start text-sm transition-opacity hover:opacity-80"
        >
          <span aria-hidden="true">&larr;</span> Back to blogs
        </Link>

        <article className="theme-card rounded-lg border p-8 shadow-2xl backdrop-blur-sm">
          <header className="mb-6 border-b border-white/5 pb-4">
            <h1 className="theme-title-font theme-accent-text text-3xl font-bold">
              <span aria-hidden="true" className="mr-2">
                {blog.emoji}
              </span>
              {blog.title}
            </h1>
            <div className="theme-muted mt-3 flex flex-wrap items-center gap-3 text-xs">
              <span>Published on {formatBlogDate(blog.date)}</span>
              <span aria-hidden="true" className="theme-accent-text">
                •
              </span>
              <span className="theme-accent-text font-medium">{blog.category}</span>
            </div>
          </header>

          <div className="blog-prose prose prose-invert max-w-none [&_code]:rounded [&_code]:px-1 [&_code]:py-0.5 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:my-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_p]:leading-relaxed [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6">
            <MDXRemote source={blog.content} />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
