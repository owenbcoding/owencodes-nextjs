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
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-br from-black via-slate-950 to-teal-950" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-black/70 via-transparent to-teal-900/40" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-14 flex w-full max-w-3xl flex-1 flex-col px-4 py-8">
        <Link
          href="/blogs"
          className="mb-6 inline-flex items-center gap-1 self-start text-sm text-teal-300 transition-colors hover:text-teal-200"
        >
          <span aria-hidden="true">&larr;</span> Back to blogs
        </Link>

        <article className="rounded-lg border border-white/10 bg-black/30 p-8 shadow-2xl backdrop-blur-sm">
          <header className="mb-6 border-b border-white/5 pb-4">
            <h1 className="font-mono text-3xl font-bold text-teal-300">
              <span aria-hidden="true" className="mr-2">
                {blog.emoji}
              </span>
              {blog.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span>Published on {formatBlogDate(blog.date)}</span>
              <span aria-hidden="true" className="text-teal-400">
                •
              </span>
              <span className="font-medium text-teal-300">{blog.category}</span>
            </div>
          </header>

          <div className="prose prose-invert max-w-none text-slate-200 [&_a]:text-teal-300 [&_a:hover]:text-teal-200 [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-teal-200 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_li]:my-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_p]:leading-relaxed [&_strong]:text-white [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6">
            <MDXRemote source={blog.content} />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
