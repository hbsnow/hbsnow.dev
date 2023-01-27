import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import rehypeSectionize from "@hbsnow/rehype-sectionize";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeWrapAll from "rehype-wrap-all";
import remarkLinkCard from "remark-link-card";

// https://astro.build/config
export default defineConfig({
  site: "https://hbsnow.dev/",
  integrations: [react(), sitemap()],
  markdown: {
    remarkPlugins: [remarkLinkCard],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeSectionize,
      [
        rehypeWrapAll,
        {
          selector: "table",
          wrapper: "div.responsiveTable",
        },
      ],
    ],
    shikiConfig: {
      theme: "dark-plus",
      wrap: true,
    },
  },
});
