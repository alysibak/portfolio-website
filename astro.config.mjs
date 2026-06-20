import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/static";

export default defineConfig({
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  output: "static",
  adapter: vercel(),
  site: "https://alysibak.vercel.app",
});
