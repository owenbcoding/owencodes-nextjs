export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2025-02-19";

const isPlaceholderProjectId = /^your[-_]/i.test(projectId);

export const hasSanityConfig = Boolean(projectId && dataset && !isPlaceholderProjectId);
