import type { TagType } from "../../cores/Icon";

export type BlogFrontmatter = {
  title: string;
  description: string;
  tags: TagType[];
  createdAt: string;
  updatedAt?: string;
};
