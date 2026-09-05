import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		breadcrumb: z.string(),
		subtitle: z.string(),
		description: z.string(),
		excerpt: z.string().optional(),
		author: z.string(),
		authorUrl: z.string().url().optional(),
		publishedAt: z.coerce.date(),
		draft: z.boolean().default(false),
		slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
		canonical: z.string().url().optional(),
		socialImage: z.string().optional(),
	}),
});

export const collections = { blog };
