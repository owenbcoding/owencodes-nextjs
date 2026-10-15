import { ArchiveIcon } from "@sanity/icons/Archive";
import { defineField, defineType } from "sanity";
import { archivePortableTextFields } from "./shared/portableText";

export const archivePost = defineType({
  name: "archivePost",
  title: "Project archive posts",
  type: "document",
  icon: ArchiveIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "subject", title: "Subject", type: "string" }),
    defineField({ name: "preview", title: "Preview", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "number", title: "Archive number", type: "number", validation: (rule) => rule.integer().positive() }),
    defineField({
      name: "archiveTag",
      title: "Archive tag",
      type: "string",
      options: {
        list: [
          { title: "Planned Projects", value: "planned-projects" },
          { title: "Old Projects", value: "old-projects" },
        ],
      },
    }),
    ...archivePortableTextFields,
  ],
  preview: { select: { title: "title", subtitle: "subject" } },
});
