import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    short: z.string(),
    order: z.number(),
    status: z.enum(['Completed', 'In development']).optional(),
    discipline: z.string(),
    cats: z.array(z.string()),
    summary: z.string(),
    stack: z.array(z.string()),
    model: z.string().optional(),
    figure: z.string().optional(),
    parts: z.array(z.object({
      match: z.string(),
      name: z.string(),
      desc: z.string(),
      callout: z.boolean().default(true)
    })).default([]),
    dims: z.boolean().default(false),
    cover: z.string().optional(),
    gallery: z.array(z.object({ src: z.string(), caption: z.string() })).default([]),
    showcase: z.boolean().default(false)
  })
});

export const collections = { projects };
