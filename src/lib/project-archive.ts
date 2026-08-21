import path from "node:path";
import {
  getAllContent,
  getContentBySlug,
  formatContentDate,
} from "./content-loader";

export type ArchivePostMeta = {
  slug: string;
  title: string;
  subject: string;
  preview: string;
  date: string;
  number?: number;
};

export type ArchivePost = ArchivePostMeta & {
  content: string;
};

const ARCHIVE_DIR = path.join(process.cwd(), "content", "project-archive");

function mapArchivePostData(
  data: Record<string, unknown>,
  slug: string,
  content: string
): ArchivePost {
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

export function getAllArchivePosts(): ArchivePost[] {
  return getAllContent(ARCHIVE_DIR, mapArchivePostData);
}

export function getArchivePostBySlug(slug: string): ArchivePost | null {
  return getContentBySlug(slug, ARCHIVE_DIR, mapArchivePostData);
}

export const formatArchiveDate = formatContentDate;
