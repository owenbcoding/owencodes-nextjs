export const SITE_NAME = "Owen";

export const HOME_TITLE = "Owen | Full Stack Dev";

export const HOME_DESCRIPTION =
  "Full Stack Developer building practical products, automations, and experiences for people and businesses.";

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
