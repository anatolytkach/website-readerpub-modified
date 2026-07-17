# Technical and content SEO audit — working record

## Source and scope

- Source report: `/Users/anatoly/Dropbox/production/reader.pub/seo-review-website_video.html`
- Branch reviewed by the report: `website_video`
- Audit method: rendered DOM and committed production `dist/` build for 16 Astro static routes, dated 2026-07-16.
- This is a structured summary for implementation planning.  Preserve the original HTML report as the detailed evidence source.

## Executive summary

The report’s five headline points are:

1. `robots.txt` and a conventional/discoverable sitemap are missing.
2. Sitemap URLs and canonical URLs disagreed on trailing slashes.
3. The homepage video is a 6.5 MB, `preload="auto"` LCP asset without a poster.
4. The KB has 35 genuine questions and answers but no FAQPage structured data.
5. Placeholder copy in `src/data/pages.ts` is not rendered; the live issue is only dead-code risk.

## Findings and implementation notes

### 1. Crawl discovery — robots and sitemap

The audit found `/robots.txt` and `/sitemap.xml` returning 404 while a valid hand-maintained sitemap exists at `/sitemap-website.xml`.  It recommends `public/robots.txt` with a `Sitemap:` directive and preferably `site: "https://reader.pub"` plus `@astrojs/sitemap`.

**Status:** pending later implementation.  The user has not yet chosen whether to retain the hand-maintained sitemap or adopt generated sitemap tooling.

### 2. Canonical URL format

The audit found conflicting slash formats between sitemap entries and page canonical tags.

**Decision:** resolved by the user: use trailing slashes for all canonical URLs, sitemap entries, internal route links, and redirect targets, except `/`.

**Current worktree state:** an uncommitted implementation has already been made: `trailingSlash: "always"` in Astro, normalized canonical/Open Graph URLs in `Base.astro`, and trailing-slash internal links.  Production build verification confirmed every current sitemap route matches its canonical.  This implementation was made prematurely during the decision phase; do not extend or commit it until the user says to begin the implementation phase.

### 3. `/terms` is orphaned

The report found no inbound internal links to `/terms`.  It recommends a sitewide footer Terms link.

**Status:** implementation backlog.  Footer expansion also depends on factual/legal decisions about contact details and company information.

### 4. Metadata

Strengths: all 16 routes have unique titles and meta descriptions with sound lengths, correct Open Graph/Twitter metadata, and matching `og:url`/canonical output.

Low-priority improvements:

- shorten the titles for `/wepub`, `/platform`, and `/webuzz` by a few characters;
- provide page-specific Open Graph images for the 15 pages that currently inherit `tech.webp`.

### 5. Structured data

High-value recommendation: emit `FAQPage` JSON-LD from the existing 35-question `faqCategories` source in `/kb`.

Further recommendations requiring factual data:

- enrich the Organization node with truthful description, social profiles, and contact point;
- add SoftwareApplication schema to six product pages;
- add Offer/PriceSpecification data to pricing tiers.

Breadcrumb markup is optional and not recommended for this flat URL hierarchy.

### 6. Keyword ownership and cannibalization

The report says `/`, `/platform`, and `/about` compete for overlapping “web-native publishing platform” terms.  It recommends one owner per query: homepage for the category term, `/platform` for product ecosystem/integration, and `/about` for company/entity intent.

**Interaction with marketing decision:** the user has approved “web-native publishing network” as the public category name.  Before SEO copy is changed, reconcile that product-positioning rule with the report’s search-intent proposal; this belongs after the user’s agreed decision pack, not before it.

### 7. Content and heading quality

Verified strengths: every route has exactly one H1, no heading-level skips, clear anchor text, and `lang="en"`.

`/contact` is short but appropriately short for its purpose.  `/scribe` is comparatively thin for its high-intent subject but is not an emergency.

### 8. Placeholder copy and dead blueprints

The report independently verified that no scaffolding phrase is rendered on any of the 16 routes or in the production build.  It recommends removing eight unused page blueprints from `src/data/pages.ts` to eliminate future accidental publication risk.

**Status:** later maintenance task; no visible emergency.

### 9. Performance and Core Web Vitals

#### Homepage video — high priority

The audit measured the homepage at 7.8 MB, including a 6.5 MB MP4 loaded with `preload="auto"` and no `poster`.  It identifies the video as LCP on the audited build.

Recommended sequence:

1. add a compact poster;
2. switch to `preload="none"` or `metadata`;
3. re-encode and offer a modern video source;
4. respect `prefers-reduced-motion` and viewport intersection.

**Status:** do not alter until the video-strategy decision is resolved; the video’s loading model must support the chosen experience.

#### Shared background — medium priority

`public/images/background.webp` was measured at 506 KB and loaded on all routes.  Re-encoding/downscaling is expected to save roughly 450 KB per page.

#### WePub PNGs — medium priority

Three WePub publishing-flow PNG assets total about 1 MB.  Converting them to WebP should reduce the conversion page weight substantially.

#### Fonts — medium priority

The Google Fonts stylesheet is render blocking without preconnect hints.  The report recommends self-hosting Manrope and Poppins or, if deferred, adding preconnect hints.

#### Measured positives

CLS is good, meaningful images already use reasonable eager/lazy loading, and adding dimensions to decorative icons is only hygiene.

### 10. Accessibility signals affecting SEO

Verified positives: all 182 images have `alt` attributes, decorative icons use empty `alt` appropriately, meaningful images have descriptions, and the image-only homepage link has an aria label.

### 11. Internationalization, 404, and headers

- No `hreflang` is needed while the site is English-only.
- A branded `404.astro` would improve recovery UX but is low priority; current unknown routes correctly return 404.
- Staging `noindex` headers are correctly scoped, production has no unwanted noindex, and current static caching is not a concern.

## SEO audit priority list

1. Poster and safer preload for homepage video.
2. `robots.txt` and sitemap discovery.
3. Canonical slash consistency.
4. Compress shared background.
5. KB FAQPage JSON-LD.
6. Convert WePub flow images to WebP.
7. Self-host fonts or add preconnect.
8. Resolve homepage/platform/about keyword ownership.
9. Enrich Organization and product structured data.
10. Link Terms in footer.
11. Use per-page OG images.
12. Delete dead page blueprints.
13. Add branded 404 and trim overlong titles.

Do not execute this priority list until the decision process in [`../audit-remediation-plan.md`](../audit-remediation-plan.md) is complete and the user authorizes implementation.
