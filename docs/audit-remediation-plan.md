# Plan for resolving the marketing and SEO audits

## Purpose

This plan governs the work arising from:

- [`audits/marketing-review-website_video.md`](audits/marketing-review-website_video.md)
- [`audits/seo-review-website_video.md`](audits/seo-review-website_video.md)
- the original HTML audit reports stored in `/Users/anatoly/Dropbox/production/reader.pub/`.

The task is not to mechanically apply every recommendation.  It is to resolve strategy, factual, legal, and product-scope questions first, then implement only approved work.

**Marketing-audit update, 17 July 2026:** The marketing source has been replaced by a pre-launch revision. It treats missing customers and traction as normal, but requires strict honesty about WeBuzz seed content. Its reported review state (`localhost:4325`, `/growth`, pre-fix CTA source lines) differs in places from the active worktree (`http://127.0.0.1:4322/`, `/strategy/`, corrected WePub CTA). Treat its pre-launch framing and recommendations as current, but verify every implementation claim against the active worktree before editing.

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

## Phase 1 — decision pack

The original six decisions are resolved and remain binding. The updated marketing audit introduced one factual clarification, now resolved.

### 0. WeBuzz activity source of truth — resolved

**Decision:** WeBuzz currently uses synthetic content. The previously recorded growth rate is a projection, not observed organic growth.

**Implementation boundary:** The user explicitly declined any site changes as a consequence. Do not alter the existing About wording, add a WeBuzz preview/seed label, or otherwise change the site because of this clarification unless directly instructed.

## Resolved original decisions

### 1. Homepage video strategy — resolved

**Decision:** Keep the current extended staged video experience. The video is no longer at the very top of the homepage, so the relevant CTAs are immediately visible. Do not adopt the audit’s fast value-first replacement.

**Implemented boundary:** video poster and `preload="metadata"` preserve the experience while reducing eager loading. Any further work must not alter the staged sequence, copy, or CTA placement without a direct instruction.

### 2. Canonical category name — resolved

**Decision:** Public positioning uses **web-native publishing network**.  Use **platform** only when it specifically describes technical capabilities.

**Later implementation:** update live copy, titles, descriptions, and keyword targeting with care.  Reconcile the SEO audit’s desire for homepage keyword ownership with this product-positioning rule; do not blindly replace every occurrence.

### 3. Investor navigation and `/strategy` positioning — resolved

**Decision:** The public navigation label and page name are both `Strategy`. The replacement audit’s proposed `Investors & Partners` label is therefore not a pending implementation item. Future investor-reachability work may consider an Investor Contact role and an `/about` link only with separate approval.

### 4. WeTalk and WeBuzz product model — resolved

**Decision:** WeTalk remains a distinct product. The replacement audit’s recommendation to fold it into WeBuzz is not authorized.

### 5. “Manufacturers” audience — resolved

**Decision:** Manufacturers remain a real target audience because their product documentation is a concrete ReaderPub use case.

### 6. Publishable proof, company, legal, and compliance facts — resolved except for item 0 above

**Decision:** The approved team, corporate identity, contact approach, Gutenberg corpus, patent reference, and compliance placement are recorded in [`website-video-audit-decisions.md`](website-video-audit-decisions.md). The only reopened factual item is the WeBuzz activity conflict in item 0.

**Rule:** If a fact cannot be supported, remove or soften the claim rather than inventing evidence.

## Phase 2 — implementation backlog, updated for the replacement marketing audit

1. **No WeBuzz audit rewrite:** Do not alter the existing About wording or add preview/seed labelling; the user explicitly declined this work.
2. **Credibility asset:** completed — `/wepub` now uses the approved `author.webp` hero image without identifiable third-party publisher marks.
3. **Low-risk route correctness:** completed — both `/platform` “Start publishing” actions open `https://reader.pub/publish/` in a new tab, and the final `/webuzz/` action opens `https://webuzz.org/` in a new tab.
4. **Pre-launch investor language — complete:** `/strategy` now uses the approved wording for initial pilots, partners, and financial collaboration; the user-approved `Strategy` name and market-ready product claim remain unchanged.
5. **Investor discoverability — complete:** the `Partner inquiry` button in the Strategy, About, and Contact heroes opens the dedicated partnership form, which lets the visitor choose Strategic partnership or Investment opportunity.
6. **New messaging, if approved:** competitive-comparison copy on `/` and `/platform`, and a public product-hierarchy story that preserves WeTalk as a distinct product.
7. **SEO items already authorized separately:** completed — robots/sitemap, Terms footer link, canonical work, video preload/poster, dead-blueprint cleanup, and the approved ReaderPub Inc. Organization description in structured data. Official corporate social-profile links (`sameAs`) are deferred until ReaderPub creates public company profiles.

Do not add pricing-tier CTAs, rename `Strategy`, merge WeTalk into WeBuzz, add a public email address, or replace the staged homepage video without a new direct user decision; each conflicts with an existing decision.

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
