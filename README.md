This is a [Next.js](https://nextjs.org) portfolio backed by [Sanity](https://www.sanity.io/).

## Sanity CMS

Set `SANITY_PROJECT_ID` and `SANITY_DATASET` in `.env.local` (and in your hosting provider for production), then run:

```bash
pnpm dev
```

The Studio is available at `/studio`. Create and publish `Projects`, `Blog posts`, and
`Project archive posts` there. Projects can reference their matching archive post.

The site combines Sanity documents with the existing local content by slug: a Sanity document
with the same slug updates the local item, while new Sanity documents are added alongside it.
Publish blog and archive documents in Studio to make them public; drafts stay hidden. Content
pages refresh at least once per minute so new published content appears without a code deployment.
Contact form messages continue to go directly to `CONTACT_MAIL_TO` through Resend; contact
submissions are not stored in Sanity.

Newsletter unsubscribe links use `NEWSLETTER_UNSUBSCRIBE_SECRET` to sign confirmation tokens.
If it is not set, `NEWSLETTER_SEND_TOKEN` is used as the signing secret.

## CV Download

Upload your CV PDF to Google Drive and set its general access to **Anyone with the link**
(Viewer). Copy the file ID from its share URL (the text between `/d/` and `/view`), then set
`NEXT_PUBLIC_CV_DOWNLOAD_URL` in `.env.local` and your deployment environment to:

```text
https://drive.google.com/uc?export=download&id=FILE_ID
```

Replace `FILE_ID` with the ID from your file's share URL. The **CV** download link appears in
the top navigation once this variable is set. Restart the local server or redeploy after
changing the variable.

## Getting Started

Use Node.js 20, matching the version used in CI. With `nvm`, select it from the
project root with `nvm use`.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
