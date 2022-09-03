import image from "@astrojs/image";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeWrapAll from "rehype-wrap-all";
import remarkLinkCard from "remark-link-card";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), image(), sitemap()],
  markdown: {
    remarkPlugins: [remarkLinkCard],
    rehypePlugins: [
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
