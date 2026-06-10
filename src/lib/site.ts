export const SITE_NAME = "Owencodes";

export const HOME_TITLE =
  "Owencodes | Full Stack Developer & Automation Solutions";

export const HOME_DESCRIPTION =
  "Full Stack Developer helping businesses and creators bring ideas to life with full-stack apps and Automation Solutions.";

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
