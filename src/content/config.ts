// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
// 2. Define a schema for each collection you'd like to validate.
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string().default("kaosu"),
    tags: z.array(z.string()),
    image: z.string().optional(),
    publishDate: z.date(),
    description: z.string().default('This guy is too lazy to leave any message!'),
    draft: z.boolean().default(false)
  }),
});

const devlogConllection = defineCollection({
  schema: z.object({
    date: z.date(),
    description: z.string().optional()
  })
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'blog': blogCollection,
  'devlog': devlogConllection
};
