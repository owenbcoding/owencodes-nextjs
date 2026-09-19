import { defineQuery } from "next-sanity";

const imageProjection = /* groq */ `{
  "imageUrl": asset->url,
  "alt": coalesce(alt, "")
}`;

export const projectsQuery = defineQuery(/* groq */ `
  *[_type == "project" && defined(slug.current)] | order(orderRank asc, _createdAt desc) {
    "slug": slug.current,
    title,
    description,
    status,
    statusLabel,
    stacks,
    link,
    imageHref,
    "image": image.asset->url,
    "video": video.asset->url,
    "archiveSlug": archivePost->slug.current
  }
`);

export const blogsQuery = defineQuery(/* groq */ `
  *[_type == "blogPost" && defined(slug.current) && published == true]
    | order(publishedAt desc, _createdAt desc) {
      "slug": slug.current,
      title,
      emoji,
      description,
      "date": publishedAt,
      category,
      readingMinutes,
      coverImage ${imageProjection},
      body
    }
`);

export const blogBySlugQuery = defineQuery(/* groq */ `
  *[_type == "blogPost" && slug.current == $slug && published == true][0] {
    "slug": slug.current,
    title,
    emoji,
    description,
    "date": publishedAt,
    category,
    readingMinutes,
    coverImage ${imageProjection},
    body
  }
`);

export const archivePostsQuery = defineQuery(/* groq */ `
  *[_type == "archivePost" && defined(slug.current) && published == true]
    | order(publishedAt desc, number desc, _createdAt desc) {
      "slug": slug.current,
      title,
      subject,
      preview,
      "date": publishedAt,
      number,
      body
    }
`);

export const archivePostBySlugQuery = defineQuery(/* groq */ `
  *[_type == "archivePost" && slug.current == $slug && published == true][0] {
    "slug": slug.current,
    title,
    subject,
    preview,
    "date": publishedAt,
    number,
    body
  }
`);
