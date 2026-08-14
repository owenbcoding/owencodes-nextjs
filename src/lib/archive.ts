import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ArchiveItemMeta = {
  slug: string;
  title: string;
  subject: string;
  preview: string;
  date: string;
  number?: number;
};

export type ArchiveItem = ArchiveItemMeta & {
  content: string;
};

const ARCHIVE_DIR = path.join(process.cwd(), "content", "archive");

function readArchiveFile(fileName: string): ArchiveItem {
  const slug = fileName.replace(/\.mdx?$/, "");
  const filePath = path.join(ARCHIVE_DIR, fileName);
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

export function getAllArchiveItems(): ArchiveItem[] {
  if (!fs.existsSync(ARCHIVE_DIR)) return [];

  const files = fs
    .readdirSync(ARCHIVE_DIR)
    .filter((file) => /\.mdx?$/.test(file));

  return files
    .map(readArchiveFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArchiveItemBySlug(slug: string): ArchiveItem | null {
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const fileName of candidates) {
    const filePath = path.join(ARCHIVE_DIR, fileName);
    if (fs.existsSync(filePath)) {
      return readArchiveFile(fileName);
    }
  }
  return null;
}

export function formatArchiveDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
