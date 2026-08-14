import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type NewsletterMeta = {
  slug: string;
  title: string;
  subject: string;
  preview: string;
  date: string;
  number?: number;
};

export type Newsletter = NewsletterMeta & {
  content: string;
};

const NEWSLETTERS_DIR = path.join(process.cwd(), "content", "newsletters");

function readNewsletterFile(fileName: string): Newsletter {
  const slug = fileName.replace(/\.mdx?$/, "");
  const filePath = path.join(NEWSLETTERS_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    subject: String(data.subject ?? data.title ?? ""),
    preview: String(data.preview ?? ""),
    date: String(data.date ?? ""),
    number: typeof data.number === "number" ? data.number : undefined,
    content,
  };
}

export function getAllNewsletters(): Newsletter[] {
  if (!fs.existsSync(NEWSLETTERS_DIR)) return [];

  const files = fs
    .readdirSync(NEWSLETTERS_DIR)
    .filter((file) => /\.mdx?$/.test(file));

  return files
    .map(readNewsletterFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNewsletterBySlug(slug: string): Newsletter | null {
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const fileName of candidates) {
    const filePath = path.join(NEWSLETTERS_DIR, fileName);
    if (fs.existsSync(filePath)) {
      return readNewsletterFile(fileName);
    }
  }
  return null;
}

export function formatNewsletterDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
