const DAILY_DEV_API_URL = "https://api.daily.dev/public/v1";
const POSTS_PER_REQUEST = 50;
/**
 * daily.dev's free plan allows 200 requests a month, so cache aggressively.
 * Two requests every 12 hours is roughly 120 a month.
 */
const CACHE_SECONDS = 60 * 60 * 12;

export type DailyDevPost = {
  id: string;
  title: string;
  url: string;
  image?: string;
  summary?: string;
  sourceName?: string;
  tags: string[];
  readTime?: number;
  numUpvotes: number;
  publishedAt?: string;
  /** Most recent of when the post was saved or read. */
  activityAt: string;
  saved: boolean;
  upvoted: boolean;
};

type DailyDevApiPost = {
  id?: string;
  title?: string;
  url?: string | null;
  image?: string | null;
  summary?: string | null;
  publishedAt?: string | null;
  createdAt?: string | null;
  tags?: string[];
  readTime?: number | null;
  numUpvotes?: number;
  source?: { name?: string } | null;
  bookmarkedAt?: string;
  readAt?: string;
  upvoted?: boolean;
};

type DailyDevResponse = {
  data?: DailyDevApiPost[];
};

type PostKind = "saved" | "upvoted";

async function fetchPosts(
  path: string,
  token: string,
): Promise<DailyDevApiPost[] | null> {
  try {
    const response = await fetch(
      `${DAILY_DEV_API_URL}${path}?limit=${POSTS_PER_REQUEST}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        next: { revalidate: CACHE_SECONDS },
      },
    );

    if (!response.ok) {
      console.warn(
        `daily.dev request failed: ${path} (${response.status} ${response.statusText})`,
      );
      return null;
    }

    const body = (await response.json()) as DailyDevResponse;
    return body.data ?? [];
  } catch (error) {
    console.warn(`daily.dev request failed: ${path}`, error);
    return null;
  }
}

function mapPost(
  post: DailyDevApiPost,
  kind: PostKind,
): DailyDevPost | null {
  if (!post.id || !post.title || !post.url) return null;

  const activityAt =
    (kind === "saved" ? post.bookmarkedAt : post.readAt) ??
    post.publishedAt ??
    post.createdAt ??
    "";

  return {
    id: post.id,
    title: post.title,
    url: post.url,
    image: post.image ?? undefined,
    summary: post.summary ?? undefined,
    sourceName: post.source?.name,
    tags: post.tags ?? [],
    readTime: post.readTime ?? undefined,
    numUpvotes: post.numUpvotes ?? 0,
    publishedAt: post.publishedAt ?? undefined,
    activityAt,
    saved: kind === "saved",
    upvoted: kind === "upvoted" && post.upvoted === true,
  };
}

function mapPosts(
  posts: DailyDevApiPost[] | null,
  kind: PostKind,
): DailyDevPost[] {
  return (posts ?? []).flatMap((post) => {
    const mapped = mapPost(post, kind);
    return mapped ? [mapped] : [];
  });
}

/**
 * Posts the site owner saved as bookmarks or upvoted on daily.dev.
 *
 * The public API has no standalone upvotes endpoint, so upvoted posts come
 * from the reading history, where each read carries an `upvoted` flag.
 * Reading history is deduped to one entry per post, newest read wins.
 */
export async function getDailyDevPosts(): Promise<DailyDevPost[]> {
  const token = process.env.DAILY_DEV_API_TOKEN?.trim();
  if (!token) return [];

  const [bookmarkedPosts, readPosts] = await Promise.all([
    fetchPosts("/bookmarks/", token),
    fetchPosts("/history/reads/", token),
  ]);

  const postsById = new Map<string, DailyDevPost>();

  for (const post of mapPosts(bookmarkedPosts, "saved")) {
    postsById.set(post.id, post);
  }

  for (const post of mapPosts(readPosts, "upvoted")) {
    if (!post.upvoted) continue;

    const existing = postsById.get(post.id);
    if (!existing) {
      postsById.set(post.id, post);
      continue;
    }

    existing.upvoted = true;
    if (post.activityAt > existing.activityAt) {
      existing.activityAt = post.activityAt;
    }
  }

  return Array.from(postsById.values()).sort(byMostRecentActivity);
}

function byMostRecentActivity(a: DailyDevPost, b: DailyDevPost): number {
  const byActivity = b.activityAt.localeCompare(a.activityAt);
  if (byActivity !== 0) return byActivity;

  const byPublished = (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");
  if (byPublished !== 0) return byPublished;

  return a.title.localeCompare(b.title);
}
