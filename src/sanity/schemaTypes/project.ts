import { DocumentIcon } from "@sanity/icons/Document";
import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Card description", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Live", value: "live" },
          { title: "Coming soon", value: "coming-soon" },
          { title: "In development", value: "in-development" },
        ],
        layout: "radio",
      },
      initialValue: "live",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "statusLabel", title: "Status label", type: "string" }),
    defineField({
      name: "stacks",
      title: "Technology tags",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "image",
      title: "Project image",
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
    defineField({
      name: "video",
      title: "Project video preview",
      type: "file",
      options: { accept: "video/*" },
    }),
    defineField({ name: "imageHref", title: "Preview link", type: "url" }),
    defineField({
      name: "link",
      title: "Project link",
      type: "object",
      fields: [
        defineField({ name: "href", title: "URL", type: "url" }),
        defineField({ name: "label", title: "Label", type: "string", initialValue: "Visit live site" }),
      ],
    }),
    defineField({
      name: "archivePost",
      title: "Archive post",
      type: "reference",
      to: [{ type: "archivePost" }],
    }),
    defineField({ name: "orderRank", title: "Display order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "title", subtitle: "status", media: "image" },
  },
});
