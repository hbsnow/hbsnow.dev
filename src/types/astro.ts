import type { MarkdownHeading, MarkdownInstance } from "astro";

import type { TagType } from "../cores/Icon";

export type Frontmatter = {
  title: string;
  description: string;
  tags: TagType[];
  createdAt: string;
  updatedAt?: string;
};

export type AstroMdProps<T = Frontmatter> = {
  frontmatter: T;
  content: T;
  headings: MarkdownHeading[];
  rawContent: MarkdownInstance<T>["rawContent"];
  compiledContent: MarkdownInstance<T>["compiledContent"];
};
