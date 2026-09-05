import { getCollection, type CollectionEntry } from "astro:content";

export type BlogEntry = CollectionEntry<"blog">;

export const BLOG_INDEX_PATH = "/blog/";

export const blogArticlePath = (slug: string) => `/blog/${slug}/`;

export const blogArticleUrl = (slug: string) => `https://reader.pub${blogArticlePath(slug)}`;

export const isPublishedBlogEntry = (entry: BlogEntry, now = new Date()) =>
	!entry.data.draft && entry.data.publishedAt.getTime() <= now.getTime();

export const getPublishedBlogEntries = async () => {
	const now = new Date();
	const entries = await getCollection("blog");

	return entries
		.filter((entry) => isPublishedBlogEntry(entry, now))
		.sort((left, right) => right.data.publishedAt.getTime() - left.data.publishedAt.getTime());
};

export const formatBlogDate = (date: Date) =>
	new Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC",
	}).format(date);
