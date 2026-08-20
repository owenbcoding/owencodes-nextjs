import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ContentMeta = Record<string, unknown> & {
  slug: string;
};

export function readContentFile<T extends ContentMeta>(
  fileName: string,
  contentDir: string,
  mapData: (data: Record<string, unknown>, slug: string, content: string) => T
): T {
  const slug = fileName.replace(/\.mdx?$/, "");
  const filePath = path.join(contentDir, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return mapData(data, slug, content);
}

export function getAllContent<T extends ContentMeta>(
  contentDir: string,
  mapData: (data: Record<string, unknown>, slug: string, content: string) => T
): T[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs
    .readdirSync(contentDir)
    .filter((file) => /\.mdx?$/.test(file));

  return files
    .map((fileName) => readContentFile(fileName, contentDir, mapData))
    .sort((a, b) => {
      const dateA = (a as unknown as { date: string }).date;
      const dateB = (b as unknown as { date: string }).date;
      return dateA < dateB ? 1 : -1;
    });
}

export function getContentBySlug<T extends ContentMeta>(
  slug: string,
  contentDir: string,
  mapData: (data: Record<string, unknown>, slug: string, content: string) => T
): T | null {
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const fileName of candidates) {
    const filePath = path.join(contentDir, fileName);
    if (fs.existsSync(filePath)) {
      return readContentFile(fileName, contentDir, mapData);
    }
  }
  return null;
}

export function formatContentDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
