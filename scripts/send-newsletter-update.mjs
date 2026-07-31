import { sendNewsletter } from "./lib/send-newsletter.mjs";

async function main() {
  const manualContent = (process.env.MANUAL_NEWSLETTER_CONTENT || "").trim();
  const siteUrl = (process.env.SITE_URL || "https://owencodes.dev").replace(/\/$/, "");

  if (!manualContent) {
    throw new Error("Manual newsletter content is required.");
  }

  const manualSubject =
    (process.env.MANUAL_NEWSLETTER_SUBJECT || "").trim() ||
    "New update from Owencodes";
  const manualTitle =
    (process.env.MANUAL_NEWSLETTER_TITLE || "").trim() ||
    "Fresh updates from Owencodes";
  const manualPreview =
    (process.env.MANUAL_NEWSLETTER_PREVIEW || "").trim() ||
    "I published a new update on my portfolio.";
  const manualUrl =
    (process.env.MANUAL_NEWSLETTER_URL || "").trim() || siteUrl;

  await sendNewsletter({
    subject: manualSubject,
    title: manualTitle,
    preview: manualPreview,
    content: manualContent,
    url: manualUrl,
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
