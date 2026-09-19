import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineField, defineType } from "sanity";
import { portableTextFields } from "./shared/portableText";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog posts",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "emoji", title: "Emoji", type: "string" }),
    defineField({ name: "description", title: "Excerpt", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Category", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: false }),
    defineField({ name: "readingMinutes", title: "Reading time (minutes)", type: "number", validation: (rule) => rule.integer().positive() }),
    defineField({
      name: "coverImage",
      title: "Blog cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    ...portableTextFields,
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
