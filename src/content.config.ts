import { z, defineCollection } from "astro:content";
import { glob } from 'astro/loaders';

import { tagName } from "@/cores/Icon/TagIcon";

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.enum(tagName)),
    description: z.string(),
    createdAt: z.date(),
    updatedAt: z.date().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
} as const;
