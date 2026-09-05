# ReaderPub Blog

Blog content lives in `src/content/blog/` as Markdown entries loaded by the Astro Content Collection in `src/content.config.ts`.

Each entry requires:

- `title`
- `breadcrumb` for a shortened article label in breadcrumbs
- `subtitle`
- `description`
- `author`
- optional `authorUrl` for the author profile link
- `publishedAt` in `YYYY-MM-DD` form
- `draft: true` or `draft: false`
- a lowercase hyphenated `slug`

`excerpt`, `canonical`, and `socialImage` are optional. The article route is generated from the metadata slug at `/blog/<slug>/`; no new Astro page is needed for a new article. Published entries are filtered by both `draft: false` and `publishedAt <= build time`, then appear automatically in the index, dynamic route, sitemap, and RSS feed at `/blog/rss.xml`.

Canonical URLs are derived from `https://reader.pub/blog/<slug>/` unless an explicit absolute `canonical` value is supplied. ReaderPub is the canonical publication source. If an article is later syndicated elsewhere, the external copy should point its canonical URL back to the ReaderPub article.

To publish the next approved article, copy the approved Markdown body into a new file under `src/content/blog/`, add the required frontmatter, and run the normal production build. Keep editorial source files outside this repository unchanged.
