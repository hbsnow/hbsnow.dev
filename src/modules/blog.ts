import fs from "fs";
import path from "path";

import matter from "gray-matter";

export type BlogType = {
  slug: string;
} & matter.GrayMatterFile<string>["data"];

export const loadBlogList = async (): Promise<BlogType[]> => {
  const dirents = await fs.promises.readdir(path.resolve("src", "posts"), {
    withFileTypes: true,
  });

  const promises = dirents.map((dirent) => {
    const filePath = path.resolve("src", "posts", dirent.name);

    return fs.promises.readFile(filePath, "utf-8");
  });

  const mdFiles = await Promise.all(promises);

  const blogList: BlogType[] = mdFiles.map((mdFile, i) => {
    return {
      ...matter(mdFile).data,
      slug: path.basename(dirents[i].name, ".md"),
    };
  });

  return JSON.parse(JSON.stringify(blogList));
};

export const loadBlog = async (slug: string): Promise<BlogType> => {
  const filePath = path.resolve("src", "posts", `${slug}.md`);

  const mdFile = await fs.promises.readFile(filePath, "utf-8");

  return JSON.parse(JSON.stringify(matter(mdFile)));
};
