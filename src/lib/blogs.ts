import path from "node:path";
import {
  getAllContent,
  getContentBySlug,
  formatContentDate,
} from "./content-loader";

export type BlogMeta = {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  date: string;
  category: string;
  readingMinutes: number;
};

export type Blog = BlogMeta & {
  content: string;
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

export const BLOGS_PER_PAGE = 3;

const BLOGS_DIR = path.join(process.cwd(), "content", "blogs");

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

export function getAllBlogs(): Blog[] {
  return getAllContent(BLOGS_DIR, mapBlogData);
}

export function getBlogBySlug(slug: string): Blog | null {
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
