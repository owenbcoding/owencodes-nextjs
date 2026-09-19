import { defineArrayMember, defineField } from "sanity";

export const portableTextFields = [
  defineField({
    name: "body",
    title: "Body",
    type: "array",
    of: [
      defineArrayMember({
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          { title: "Heading 2", value: "h2" },
          { title: "Heading 3", value: "h3" },
          { title: "Quote", value: "blockquote" },
        ],
        marks: {
          annotations: [
            defineArrayMember({
              name: "link",
              title: "Link",
              type: "object",
              fields: [
                defineField({
                  name: "href",
                  title: "URL",
                  type: "url",
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
          ],
        },
      }),
      defineArrayMember({
        name: "inlineImage",
        title: "Image",
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
    ],
    validation: (rule) => rule.required().min(1),
  }),
];

export const archivePortableTextFields = [
  defineField({
    ...portableTextFields[0],
    of: [
      defineArrayMember({ type: "block" }),
    ],
  }),
];
