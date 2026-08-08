import fs from "node:fs";
import { sendNewsletter } from "./lib/send-newsletter.mjs";

function stripComments(text) {
  return text
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");
}

function extractEntries(text) {
  const marker = "projects: Project[] = [";
  const startIdx = text.indexOf(marker);
  if (startIdx === -1) return [];

  const entries = [];
  let depth = 0;
  let entryStart = -1;
  let inString = null;
  let escaped = false;

  for (let i = startIdx + marker.length; i < text.length; i++) {
    const ch = text[i];

    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === inString) inString = null;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      inString = ch;
      continue;
    }

    if (depth === 0 && ch === "]") break;

    if (ch === "{" || ch === "[") {
      if (depth === 0 && ch === "{") entryStart = i;
      depth++;
    } else if (ch === "}" || ch === "]") {
      depth--;
      if (depth === 0 && entryStart !== -1) {
        entries.push(text.slice(entryStart, i + 1));
        entryStart = -1;
      }
    }
  }

  return entries;
}

function parseEntry(entryText) {
  const slugMatch = entryText.match(/slug:\s*"([^"]*)"/);
  if (!slugMatch) return null;

  const titleMatch = entryText.match(/title:\s*"([^"]*)"/);
  const descriptionMatch = entryText.match(/description:\s*"([^"]*)"/);
  const blankMatch = entryText.match(/blank:\s*true/);

  return {
    slug: slugMatch[1],
    title: titleMatch ? titleMatch[1] : slugMatch[1],
    description: descriptionMatch ? descriptionMatch[1] : "",
    blank: Boolean(blankMatch),
    raw: entryText.replace(/\s+/g, " ").trim(),
  };
}

function loadProjectsMap(filePath) {
  const text = filePath && fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
  const entries = extractEntries(stripComments(text));

  const map = new Map();
  for (const entryText of entries) {
    const parsed = parseEntry(entryText);
    if (!parsed || parsed.blank) continue;
    map.set(parsed.slug, parsed);
  }
  return map;
}

function diffProjects(beforeMap, afterMap) {
  const changes = [];
  for (const [slug, after] of afterMap) {
    const before = beforeMap.get(slug);
    if (!before) {
      changes.push({ status: "A", ...after });
    } else if (before.raw !== after.raw) {
      changes.push({ status: "M", ...after });
    }
  }
  return changes;
}

function buildSingleEntryPayload(entry, siteUrl) {
  const isNew = entry.status === "A";
  const verbNoun = isNew ? "New project" : "Updated project";
  const verbPhrase = isNew ? "added a new project" : "updated a project";

  return {
    subject: `${verbNoun}: ${entry.title}`,
    title: `${verbNoun}: ${entry.title}`,
    preview: entry.description || `I just ${verbPhrase} on Owencodes.`,
    content: entry.description
      ? `I just ${verbPhrase}: "${entry.title}".\n\n${entry.description}`
      : `I just ${verbPhrase}: "${entry.title}".`,
    url: `${siteUrl}/projects`,
  };
}

function buildDigestPayload(entries, siteUrl) {
  const newCount = entries.filter((e) => e.status === "A").length;
  const updatedCount = entries.filter((e) => e.status === "M").length;

  const summaryParts = [];
  if (newCount) summaryParts.push(`${newCount} new project${newCount > 1 ? "s" : ""}`);
  if (updatedCount) summaryParts.push(`${updatedCount} updated project${updatedCount > 1 ? "s" : ""}`);

  const content = entries
    .map((e) => {
      const label = e.status === "A" ? "New" : "Updated";
      const desc = e.description ? `\n  ${e.description}` : "";
      return `• [${label}] ${e.title}${desc}`;
    })
    .join("\n\n");

  return {
    subject: `Project updates: ${summaryParts.join(" and ")}`,
    title: "Fresh project updates from Owencodes",
    preview: `I just added or updated ${entries.length} projects on my site.`,
    content,
    url: `${siteUrl}/projects`,
  };
}

async function main() {
  const siteUrl = (process.env.SITE_URL || "https://owencodes.dev").replace(/\/$/, "");
  const beforeMap = loadProjectsMap(process.env.BEFORE_PROJECTS_FILE);
  const afterMap = loadProjectsMap(process.env.AFTER_PROJECTS_FILE);

  const changes = diffProjects(beforeMap, afterMap);

  if (changes.length === 0) {
    console.log("No added/modified projects detected.");
    return;
  }

  const payload =
    changes.length === 1 ? buildSingleEntryPayload(changes[0], siteUrl) : buildDigestPayload(changes, siteUrl);

  await sendNewsletter(payload);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
