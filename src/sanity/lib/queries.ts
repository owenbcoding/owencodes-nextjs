import { defineQuery } from "next-sanity";


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
  *[_type == "blogPost" && defined(slug.current)]
    | order(publishedAt desc, _createdAt desc) {
      "slug": slug.current,
      title,
      emoji,
      description,
      "date": publishedAt,
      category,
      readingMinutes,
      "coverImageUrl": coverImage.asset->url,
      "coverImageAlt": coalesce(coverImage.alt, ""),
      body
    }
`);

export const blogBySlugQuery = defineQuery(/* groq */ `
  *[_type == "blogPost" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    emoji,
    description,
    "date": publishedAt,
    category,
    readingMinutes,
    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coalesce(coverImage.alt, ""),
    body
  }
`);

export const archivePostsQuery = defineQuery(/* groq */ `
  *[_type == "archivePost" && defined(slug.current)]
    | order(publishedAt desc, number desc, _createdAt desc) {
      "slug": slug.current,
      title,
      subject,
      preview,
      "date": publishedAt,
      number,
      archiveTag,
      body
    }
`);

export const archivePostBySlugQuery = defineQuery(/* groq */ `
  *[_type == "archivePost" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    subject,
    preview,
    "date": publishedAt,
    number,
    archiveTag,
    body
  }
`);
