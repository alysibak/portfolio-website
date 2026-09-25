import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Debugging write-ups. A post stays out of the build until `draft` is false,
 * so a half-finished story never ships.
 */
const bugLog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/bug-log" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    /** Must be a personal project id: employer work stays vague. */
    project: z.enum(["carinfo", "bystander", "timevault", "mizan"]),
    draft: z.boolean().default(true),
  }),
});

export const collections = { "bug-log": bugLog };
