import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string(),
    permalink: z.string(),
    tags: z.array(z.string()),
    cover: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
};
