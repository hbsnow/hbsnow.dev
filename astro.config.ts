import image from "@astrojs/image";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import rehypeWrapAll from "rehype-wrap-all";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), image()],
  markdown: {
    rehypePlugins: [
      [rehypeWrapAll, { selector: "table", wrapper: "div.responsiveTable" }],
    ],
    extendDefaultPlugins: true,
    shikiConfig: {
      theme: "dark-plus",
      wrap: true,
    },
  },
});
