export const projectId =
  process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset =
  process.env.SANITY_DATASET ??
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  "production";
export const apiVersion = "2025-02-19";

const isPlaceholderProjectId = /^(your[-_]|missing-)/i.test(projectId);

export const hasSanityConfig = Boolean(projectId && dataset && !isPlaceholderProjectId);
