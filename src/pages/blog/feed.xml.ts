import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const get: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error("context.site is not found");
  }

  const blog = await getCollection("blog");

  return rss({
    title: "hbsnow.dev blog feed",
    description: "hbsnow.dev blog feed",
    site: new URL("/blog/", site).toString(),
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.createdAt,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  });
};
