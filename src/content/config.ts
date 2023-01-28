import { z, defineCollection } from "astro:content";

import { tagName } from "@/cores/Icon/TagIcon";

const blogCollection = defineCollection({
  schema: z.object({
    layout: z.string(),
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
