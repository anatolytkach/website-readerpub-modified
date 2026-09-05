import type { APIRoute } from "astro";
import { blogArticleUrl, getPublishedBlogEntries } from "../../data/blog";

const escapeXml = (value: string) =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");

export const GET: APIRoute = async () => {
	const posts = await getPublishedBlogEntries();
	const items = posts
		.map((post) => {
			const url = post.data.canonical ?? blogArticleUrl(post.data.slug);
			const publishedAt = post.data.publishedAt.toUTCString();

			return `
    <item>
      <title>${escapeXml(post.data.title)}</title>
      <description>${escapeXml(post.data.description)}</description>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${publishedAt}</pubDate>
      <dc:creator>${escapeXml(post.data.author)}</dc:creator>
    </item>`;
		})
		.join("");

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>ReaderPub Blog</title>
    <description>${escapeXml("Notes and essays about building ReaderPub, web-native books, reading, and publishing.")}</description>
    <link>https://reader.pub/blog/</link>
    <language>en</language>
    <atom:link href="https://reader.pub/blog/rss.xml" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />${items}
  </channel>
</rss>`;

	return new Response(body, {
		headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
	});
};
