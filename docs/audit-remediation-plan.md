# Plan for resolving the marketing and SEO audits

## Purpose

This plan governs the work arising from:

- [`audits/marketing-review-website_video.md`](audits/marketing-review-website_video.md)
- [`audits/seo-review-website_video.md`](audits/seo-review-website_video.md)
- the original HTML audit reports stored in `/Users/anatoly/Dropbox/production/reader.pub/`.

The task is not to mechanically apply every recommendation.  It is to resolve strategy, factual, legal, and product-scope questions first, then implement only approved work.

## Mandatory operating rule

**Do not make further site changes while the decision pack is open.**

The only exception is an explicit, direct user instruction to change a specific site element.  Agreement with a general audit recommendation is not itself permission to implement it immediately.  Record each answer in [`website-video-audit-decisions.md`](website-video-audit-decisions.md), then move to the next question in the prescribed order.

## Phase 0 — preserve current state

- Active branch: `website_video`.
- Active worktree: `/Users/anatoly/Dropbox/production/reader.pub/website_alt/.worktrees/website_seo`.
- Local preview: `http://127.0.0.1:4322/`.
- `artifacts/` is untracked user content and must never be staged.
- There are uncommitted trailing-slash/canonical changes from an earlier premature implementation.  They are verified but must not be extended, committed, or silently reverted during the decision phase.
- Existing homepage video-design work was made through many direct user instructions.  Preserve it while the audit strategy question is considered.

## Phase 1 — decision pack, in this exact order

### 1. Homepage video strategy — pending

**Question:** Keep the current extended, staged homepage-video experience, or replace it with the audit’s fast value-first pattern in which the explanatory message and audience CTAs are immediately visible and the video serves as evidence?

**What is already implemented:** a custom green video introduction, door opening, video replay, mobile/desktop behavior, waves, and animated copy.  This is not an audit decision by itself.

**Marketing recommendation:** reduce the pre-roll to about two seconds and show the value proposition and CTAs in the first viewport.

**SEO dependency:** poster/preload, mobile legibility, reduced motion, and video encoding cannot be scoped correctly until this decision is made.

### 2. Canonical category name — resolved

**Decision:** Public positioning uses **web-native publishing network**.  Use **platform** only when it specifically describes technical capabilities.

**Later implementation:** update live copy, titles, descriptions, and keyword targeting with care.  Reconcile the SEO audit’s desire for homepage keyword ownership with this product-positioning rule; do not blindly replace every occurrence.

### 3. Investor navigation and `/growth` positioning — pending

**Question:** Should the current navigation label `Market` become **Partners & Investors** or **Company**?

**Related factual follow-up:** Which sourced market-sizing, current-pilot, funding, and use-of-capital facts may appear on `/growth`?

### 4. WeTalk and WeBuzz product model — pending

**Question:** Should WeTalk remain a distinct product, or become an access-controlled/private WeBuzz offering (for example, “WeBuzz Private”)?

**Effect of approval:** route strategy, navigation, KB FAQ, messaging, and potentially redirects must be planned before code changes.

### 5. “Manufacturers” audience — pending

**Question:** Is “Manufacturers” a real, desired customer segment with a concrete offering, or should it be removed from the platform audience list?

### 6. Publishable proof, company, legal, and compliance facts — pending

Resolve this only from factual information the user authorizes:

- names, roles, biographies, and public profile links for the team;
- company/legal entity name, registered address, support channels, social accounts;
- pilots, customers, partners, testimonials, funding, traction, and market metrics;
- Project Gutenberg/60K+ catalogue wording and seeding strategy;
- patent-pending public reference or filing information;
- GDPR posture, accessibility facts, SOC 2 status, security testing, data residency, SLA/uptime.

**Rule:** if a fact cannot be supported, remove or soften the claim rather than inventing evidence.

## Phase 2 — create the approved implementation backlog

Only after Phase 1 is complete, translate approvals into discrete tasks.  Sort them by dependency and risk:

1. **Correctness and conversion:** WePub CTA destination, plan-level pricing CTAs, homepage author CTA, self-service publishing guidance.
2. **Information architecture:** nav label, product hierarchy, WeTalk/WeBuzz treatment, audience changes, footer/link architecture.
3. **Claims and trust:** About/team, 60K wording, growth facts, security/compliance, legal/contact/footer content.
4. **SEO crawl and metadata:** robots/sitemap strategy, Terms link, keyword ownership, schema, page-specific OG images, title trimming, 404.
5. **Performance:** video loading and encoding, background compression, WePub image conversion, font loading.
6. **Maintenance:** dead blueprints and any approved cleanup.

For each task, write exact files, copy, source-of-truth facts, acceptance criteria, and rollback considerations before editing.

## Phase 3 — implementation and verification

For each approved batch:

1. Make only scoped changes.
2. Run `npm run build`.
3. Validate affected desktop and portrait layouts locally.
4. Validate route links, canonical URLs, sitemap/robots behavior, schema JSON, and relevant CTA targets.
5. Check that no unsupported factual claim was introduced.
6. Review `git diff` to exclude `artifacts/` and unrelated changes.
7. Commit, push, and deploy only when the user explicitly asks.

## Evidence and documentation rules

- Update [`website-video-audit-decisions.md`](website-video-audit-decisions.md) after every user decision.
- Update the appropriate audit summary if a recommendation is accepted, rejected, or superseded.
- Use the original HTML reports for evidence if a recommendation is questioned.
- Keep the user’s exact approved wording where it affects positioning or claims.
