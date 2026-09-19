import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="theme-heading mt-8 mb-4 text-2xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="theme-heading mt-6 mb-3 text-xl font-bold">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-teal-400 pl-4 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="theme-accent-text underline underline-offset-2"
        rel={value?.href?.startsWith("/") ? undefined : "noreferrer noopener"}
      >
        {children}
      </a>
    ),
  },
};

export function RichTextContent({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
