import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/static";

export default defineConfig({
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({ filter: (page) => !page.includes("/og/") }),
  ],
  output: "static",
  markdown: {
    shikiConfig: { themes: { light: "github-light-high-contrast", dark: "github-dark-high-contrast" } },
  },
  adapter: vercel(),
  site: "https://alysibak.vercel.app",
});
