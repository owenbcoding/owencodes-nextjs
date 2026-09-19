import path from "node:path";
import type { PortableTextBlock } from "@portabletext/types";
import {
  getAllContent,
  getContentBySlug,
  formatContentDate,
} from "./content-loader";
import { sanityClient } from "@/sanity/lib/client";
import {
  archivePostBySlugQuery,
  archivePostsQuery,
} from "@/sanity/lib/queries";

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
  body?: PortableTextBlock[];
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

function mapSanityArchivePost(post: ArchivePost): ArchivePost {
  return { ...post, content: "" };
}

export async function getAllArchivePosts(): Promise<ArchivePost[]> {
  if (sanityClient) {
    const posts = await sanityClient.fetch<ArchivePost[]>(archivePostsQuery);
    return posts.map(mapSanityArchivePost);
  }

  return getAllContent(ARCHIVE_DIR, mapArchivePostData);
}

export async function getArchivePostBySlug(slug: string): Promise<ArchivePost | null> {
  if (sanityClient) {
    const post = await sanityClient.fetch<ArchivePost | null>(
      archivePostBySlugQuery,
      { slug },
    );
    return post ? mapSanityArchivePost(post) : null;
  }

  return getContentBySlug(slug, ARCHIVE_DIR, mapArchivePostData);
}

export const formatArchiveDate = formatContentDate;
