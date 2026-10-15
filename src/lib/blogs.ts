import path from "node:path";
import type { PortableTextBlock } from "@portabletext/types";
import {
  getAllContent,
  getContentBySlug,
  formatContentDate,
} from "./content-loader";
import { sanityClient } from "@/sanity/lib/client";
import { blogBySlugQuery, blogsQuery } from "@/sanity/lib/queries";

export type BlogMeta = {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  date: string;
  category: string;
  readingMinutes: number;
  coverImageUrl?: string;
  coverImageAlt?: string;
};

export type Blog = BlogMeta & {
  content: string;
  body?: PortableTextBlock[];
};

const WORDS_PER_MINUTE = 200;

function calculateReadingMinutes(content: string): number {
  const stripped = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/[#>*_~`>\-]/g, " ");
  const words = stripped.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export const BLOGS_PER_PAGE = 4;

const BLOGS_DIR = path.join(process.cwd(), "content", "blogs");
const FEATURED_BLOG_ORDER = new Map(
  ["my-journey", "dev-logs", "tooling"].map((slug, index) => [slug, index])
);

function sortBlogsForDisplay(blogs: Blog[]): Blog[] {
  return blogs.sort((a, b) => {
    const aOrder = FEATURED_BLOG_ORDER.get(a.slug);
    const bOrder = FEATURED_BLOG_ORDER.get(b.slug);

    if (aOrder !== undefined || bOrder !== undefined) {
      if (aOrder === undefined) return 1;
      if (bOrder === undefined) return -1;
      return aOrder - bOrder;
    }

    return b.date.localeCompare(a.date);
  });
}

function mapBlogData(
  data: Record<string, unknown>,
  slug: string,
  content: string
): Blog {
  return {
    slug,
    title: String(data.title ?? slug),
    emoji: String(data.emoji ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    category: String(data.category ?? "General"),
    readingMinutes:
      typeof data.readingMinutes === "number" && data.readingMinutes > 0
        ? data.readingMinutes
        : calculateReadingMinutes(content),
    content,
  };
}

function mapSanityBlog(blog: Blog): Blog {
  return {
    ...blog,
    content: "",
    readingMinutes: blog.readingMinutes || 1,
  };
}

export async function getAllBlogs(): Promise<Blog[]> {
  const localBlogs = sortBlogsForDisplay(
    getAllContent(BLOGS_DIR, mapBlogData),
  );
  if (!sanityClient) return localBlogs;

  const sanityBlogs = await sanityClient.fetch<Blog[]>(blogsQuery);
  const blogsBySlug = new Map(localBlogs.map((blog) => [blog.slug, blog]));
  const newSanityBlogs = sanityBlogs
    .filter((blog) => !blogsBySlug.has(blog.slug))
    .map(mapSanityBlog)
    .sort((a, b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug));

  for (const blog of sanityBlogs) {
    if (blogsBySlug.has(blog.slug)) {
      blogsBySlug.set(blog.slug, mapSanityBlog(blog));
    }
  }

  for (const blog of newSanityBlogs) {
    blogsBySlug.set(blog.slug, blog);
  }

  return Array.from(blogsBySlug.values());
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  if (sanityClient) {
    const blog = await sanityClient.fetch<Blog | null>(blogBySlugQuery, { slug });
    if (blog) return mapSanityBlog(blog);
  }

  return getContentBySlug(slug, BLOGS_DIR, mapBlogData);
}

export function getTotalPages(totalBlogs: number): number {
  return Math.max(1, Math.ceil(totalBlogs / BLOGS_PER_PAGE));
}

export function paginateBlogs(blogs: Blog[], page: number): Blog[] {
  const start = (page - 1) * BLOGS_PER_PAGE;
  return blogs.slice(start, start + BLOGS_PER_PAGE);
}

export const formatBlogDate = formatContentDate;
