import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
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
