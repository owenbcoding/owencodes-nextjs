import path from "node:path";
import type { PortableTextBlock } from "@portabletext/types";
import {
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

type SanityBlog = Omit<Blog, "content"> & {
  sanityCreatedAt: string;
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
const FEATURED_BLOGS_COUNT = 3;

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

function mapSanityBlog(blog: SanityBlog): Blog {
  return {
    slug: blog.slug,
    title: blog.title,
    emoji: blog.emoji,
    description: blog.description,
    date: blog.date,
    category: blog.category,
    coverImageUrl: blog.coverImageUrl,
    coverImageAlt: blog.coverImageAlt,
    content: "",
    body: blog.body,
    readingMinutes: blog.readingMinutes || 1,
  };
}

export async function getAllBlogs(): Promise<Blog[]> {
  if (!sanityClient) return [];

  const sanityBlogs = await sanityClient.fetch<SanityBlog[]>(blogsQuery);
  const featuredBlogs = [...sanityBlogs]
    .sort(
      (a, b) =>
        a.sanityCreatedAt.localeCompare(b.sanityCreatedAt) ||
        a.slug.localeCompare(b.slug),
    )
    .slice(0, FEATURED_BLOGS_COUNT);
  const featuredSlugs = new Set(featuredBlogs.map((blog) => blog.slug));
  const articles = sanityBlogs
    .filter((blog) => !featuredSlugs.has(blog.slug))
    .sort(
      (a, b) =>
        b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    );

  return [...featuredBlogs, ...articles].map(mapSanityBlog);
}

export async function getSanityBlogs(): Promise<Blog[]> {
  return getAllBlogs();
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  if (sanityClient) {
    const blog = await sanityClient.fetch<SanityBlog | null>(blogBySlugQuery, { slug });
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
