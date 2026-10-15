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
  archiveTag?: ArchiveTag;
};

export type ArchiveTag = "planned-projects" | "old-projects";

export type ArchivePost = ArchivePostMeta & {
  content: string;
  body?: PortableTextBlock[];
};

export type ArchivePostSection = {
  title: string;
  posts: ArchivePost[];
};

const ARCHIVE_DIR = path.join(process.cwd(), "content", "project-archive");
export const ARCHIVE_POSTS_PER_PAGE = 6;

const ARCHIVE_SECTION_ORDER: {
  tag: ArchiveTag | undefined;
  title: string;
}[] = [
  { tag: "planned-projects", title: "Planned Projects" },
  { tag: "old-projects", title: "Old Projects" },
  { tag: undefined, title: "Archives" },
];

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
    archiveTag:
      data.archiveTag === "planned-projects" ||
      data.archiveTag === "old-projects"
        ? data.archiveTag
        : undefined,
    content,
  };
}

function mapSanityArchivePost(post: ArchivePost): ArchivePost {
  return { ...post, content: "" };
}

function sortArchivePosts(posts: ArchivePost[]): ArchivePost[] {
  const tagOrder = new Map(
    ARCHIVE_SECTION_ORDER.map(({ tag }, index) => [tag, index]),
  );
  return posts.sort(
    (a, b) =>
      (tagOrder.get(a.archiveTag) ?? ARCHIVE_SECTION_ORDER.length) -
        (tagOrder.get(b.archiveTag) ?? ARCHIVE_SECTION_ORDER.length) ||
      b.date.localeCompare(a.date),
  );
}

export async function getAllArchivePosts(): Promise<ArchivePost[]> {
  const localPosts = getAllContent(ARCHIVE_DIR, mapArchivePostData);
  if (!sanityClient) return sortArchivePosts(localPosts);

  const sanityPosts = await sanityClient.fetch<ArchivePost[]>(archivePostsQuery);
  const postsBySlug = new Map(localPosts.map((post) => [post.slug, post]));

  for (const post of sanityPosts) {
    postsBySlug.set(post.slug, mapSanityArchivePost(post));
  }

  return sortArchivePosts(Array.from(postsBySlug.values()));
}

export function groupArchivePosts(posts: ArchivePost[]): ArchivePostSection[] {
  return ARCHIVE_SECTION_ORDER.flatMap(({ tag, title }) => {
    const sectionPosts = posts.filter((post) => post.archiveTag === tag);
    return sectionPosts.length > 0 ? [{ title, posts: sectionPosts }] : [];
  });
}

export function getArchiveTotalPages(totalPosts: number): number {
  return Math.max(1, Math.ceil(totalPosts / ARCHIVE_POSTS_PER_PAGE));
}

export function paginateArchivePosts(
  posts: ArchivePost[],
  page: number,
): ArchivePost[] {
  const start = (page - 1) * ARCHIVE_POSTS_PER_PAGE;
  return posts.slice(start, start + ARCHIVE_POSTS_PER_PAGE);
}

export async function getArchivePostBySlug(slug: string): Promise<ArchivePost | null> {
  if (sanityClient) {
    const post = await sanityClient.fetch<ArchivePost | null>(
      archivePostBySlugQuery,
      { slug },
    );
    if (post) return mapSanityArchivePost(post);
  }

  return getContentBySlug(slug, ARCHIVE_DIR, mapArchivePostData);
}

export const formatArchiveDate = formatContentDate;
