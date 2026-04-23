import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogMeta = {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  date: string;
  category: string;
};

export type Blog = BlogMeta & {
  content: string;
};

export const BLOGS_PER_PAGE = 3;

const BLOGS_DIR = path.join(process.cwd(), "content", "blogs");

function readBlogFile(fileName: string): Blog {
  const slug = fileName.replace(/\.mdx?$/, "");
  const filePath = path.join(BLOGS_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    emoji: String(data.emoji ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    category: String(data.category ?? "General"),
    content,
  };
}

export function getAllBlogs(): Blog[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];

  const files = fs
    .readdirSync(BLOGS_DIR)
    .filter((file) => /\.mdx?$/.test(file));

  return files
    .map(readBlogFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogBySlug(slug: string): Blog | null {
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const fileName of candidates) {
    const filePath = path.join(BLOGS_DIR, fileName);
    if (fs.existsSync(filePath)) {
      return readBlogFile(fileName);
    }
  }
  return null;
}

export function getTotalPages(totalBlogs: number): number {
  return Math.max(1, Math.ceil(totalBlogs / BLOGS_PER_PAGE));
}

export function paginateBlogs(blogs: Blog[], page: number): Blog[] {
  const start = (page - 1) * BLOGS_PER_PAGE;
  return blogs.slice(start, start + BLOGS_PER_PAGE);
}

export function formatBlogDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
