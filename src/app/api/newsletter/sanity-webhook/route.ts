import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { NextResponse } from "next/server";
import { sendNewsletter } from "@/lib/newsletter";
import { getSiteUrl } from "@/lib/site";

type SanityPublishDocument = {
  _id?: unknown;
  _type?: unknown;
  title?: unknown;
  slug?: unknown;
  description?: unknown;
  subject?: unknown;
  preview?: unknown;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isSanityPublishDocument(
  value: unknown,
): value is SanityPublishDocument {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function createNewsletterPayload(document: SanityPublishDocument) {
  if (
    !isNonEmptyString(document._id) ||
    document._id.startsWith("drafts.") ||
    !isNonEmptyString(document.slug) ||
    !isNonEmptyString(document.title)
  ) {
    return null;
  }

  const siteUrl = getSiteUrl();
  const description = isNonEmptyString(document.description)
    ? document.description.trim()
    : isNonEmptyString(document.preview)
      ? document.preview.trim()
      : "";

  switch (document._type) {
    case "blogPost":
      return {
        subject: `Blog update: ${document.title.trim()}`,
        title: `Blog update: ${document.title.trim()}`,
        preview: description || "A blog post has been published or updated.",
        content: description || `Read the latest blog update: ${document.title.trim()}.`,
        url: `${siteUrl}/blogs/${encodeURIComponent(document.slug.trim())}`,
      };
    case "project":
      return {
        subject: `Project update: ${document.title.trim()}`,
        title: `Project update: ${document.title.trim()}`,
        preview: description || "A project has been published or updated.",
        content: description || `See the latest project update: ${document.title.trim()}.`,
        url: `${siteUrl}/projects`,
      };
    case "archivePost": {
      const archiveDescription = isNonEmptyString(document.preview)
        ? document.preview.trim()
        : description;
      return {
        subject: isNonEmptyString(document.subject)
          ? document.subject.trim()
          : `Project archive update: ${document.title.trim()}`,
        title: `Project archive update: ${document.title.trim()}`,
        preview: archiveDescription || "A project archive has been published or updated.",
        content:
          archiveDescription ||
          `Read the latest project archive update: ${document.title.trim()}.`,
        url: `${siteUrl}/projects`,
      };
    }
    default:
      return null;
  }
}

export async function POST(request: Request) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Sanity webhook secret is not configured." },
      { status: 500 },
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? "";
  if (!(await isValidSignature(rawBody, signature, secret))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let parsedPayload: unknown;
  try {
    parsedPayload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!isSanityPublishDocument(parsedPayload)) {
    return NextResponse.json({ ok: false, error: "Invalid document payload." }, { status: 400 });
  }

  const document = parsedPayload;
  const payload = createNewsletterPayload(document);
  if (!payload) {
    return NextResponse.json(
      { ok: false, error: "Unsupported or incomplete published document." },
      { status: 400 },
    );
  }

  const result = await sendNewsletter(payload);
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
