import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeWrapAll from "rehype-wrap-all";
import remarkLinkCard from "remark-link-card";
import remarkSectionize from "remark-sectionize";

// https://astro.build/config
export default defineConfig({
  site: "https://hbsnow.dev",
  integrations: [react(), sitemap()],
  markdown: {
    remarkPlugins: [remarkLinkCard, remarkSectionize],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [
        rehypeWrapAll,
        {
          selector: "table",
          wrapper: "div.responsiveTable",
        },
      ],
    ],
    extendDefaultPlugins: true,
    shikiConfig: {
      theme: "dark-plus",
      wrap: true,
    },
  },
});
