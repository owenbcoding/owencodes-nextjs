export const SITE_NAME = "Owen";

export const HOME_TITLE = "Owen | Full Stack Dev";

export const HOME_DESCRIPTION =
  "I am a full-stack developer with a passion for coding and problem-solving. I build full-stack web apps for businesses and AI systems for everyday work.";

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
