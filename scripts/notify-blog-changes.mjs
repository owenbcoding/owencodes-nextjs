import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { sendNewsletter } from "./lib/send-newsletter.mjs";

function parseChangedFiles(raw) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [status, ...rest] = line.split("\t");
      return { status: (status || "").trim(), filePath: rest.join("\t").trim() };
    })
    .filter((entry) => entry.status && entry.filePath);
}

function loadEntry(change, siteUrl) {
  const absPath = path.join(process.cwd(), change.filePath);
  if (!fs.existsSync(absPath)) {
    console.warn(`Skipping missing file: ${change.filePath}`);
    return null;
  }

  const raw = fs.readFileSync(absPath, "utf8");
  let data;
  try {
    ({ data } = matter(raw));
  } catch (err) {
    console.warn(`Skipping ${change.filePath}: failed to parse frontmatter (${err.message})`);
    return null;
  }

  const slug = path.basename(change.filePath).replace(/\.mdx?$/, "");
  const title = typeof data.title === "string" && data.title.trim() ? data.title.trim() : slug;
  const description = typeof data.description === "string" ? data.description.trim() : "";

  return {
    status: change.status.startsWith("A") ? "A" : "M",
    slug,
    title,
    description,
    url: `${siteUrl}/blogs/${slug}`,
  };
}

function buildSingleEntryPayload(entry) {
  const isNew = entry.status === "A";
  const verbNoun = isNew ? "New post" : "Updated";
  const verbPhrase = isNew ? "published a new post" : "updated a post";

  return {
    subject: `${verbNoun}: ${entry.title}`,
    title: `${verbNoun}: ${entry.title}`,
    preview: entry.description || `I just ${verbPhrase} on Owencodes.`,
    content: entry.description
      ? `I just ${verbPhrase}: "${entry.title}".\n\n${entry.description}`
      : `I just ${verbPhrase}: "${entry.title}".`,
    url: entry.url,
  };
}

function buildDigestPayload(entries, siteUrl) {
  const newCount = entries.filter((e) => e.status === "A").length;
  const updatedCount = entries.filter((e) => e.status === "M").length;

  const summaryParts = [];
  if (newCount) summaryParts.push(`${newCount} new post${newCount > 1 ? "s" : ""}`);
  if (updatedCount) summaryParts.push(`${updatedCount} updated post${updatedCount > 1 ? "s" : ""}`);

  const content = entries
    .map((e) => {
      const label = e.status === "A" ? "New" : "Updated";
      const desc = e.description ? `\n  ${e.description}` : "";
      return `• [${label}] ${e.title}${desc}\n  ${e.url}`;
    })
    .join("\n\n");

  return {
    subject: `Blog updates: ${summaryParts.join(" and ")}`,
    title: "Fresh blog updates from Owencodes",
    preview: `I just published or updated ${entries.length} posts on my site.`,
    content,
    url: `${siteUrl}/blogs`,
  };
}

async function main() {
  const siteUrl = (process.env.SITE_URL || "https://owencodes.dev").replace(/\/$/, "");
  const raw = process.env.CHANGED_BLOG_FILES || "";
  const changes = parseChangedFiles(raw);

  if (changes.length === 0) {
    console.log("No relevant blog changes to notify about.");
    return;
  }

  const entries = changes.map((change) => loadEntry(change, siteUrl)).filter(Boolean);

  if (entries.length === 0) {
    console.log("No blog entries could be parsed; skipping notification.");
    return;
  }

  const payload =
    entries.length === 1 ? buildSingleEntryPayload(entries[0]) : buildDigestPayload(entries, siteUrl);

  await sendNewsletter(payload);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
