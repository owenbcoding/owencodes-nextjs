import path from "node:path";
import {
  getAllContent,
  getContentBySlug,
  formatContentDate,
} from "./content-loader";

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

function mapNewsletterData(
  data: Record<string, unknown>,
  slug: string,
  content: string
): Newsletter {
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
  return getAllContent(NEWSLETTERS_DIR, mapNewsletterData);
}

export function getNewsletterBySlug(slug: string): Newsletter | null {
  return getContentBySlug(slug, NEWSLETTERS_DIR, mapNewsletterData);
}

export const formatNewsletterDate = formatContentDate;
