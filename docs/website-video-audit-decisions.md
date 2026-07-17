# Website video — audit decisions and conflict log

## Purpose and sources

This is the source of truth for user decisions made while reviewing:

- `/Users/anatoly/Dropbox/production/reader.pub/marketing-review-website_video.html`
- `/Users/anatoly/Dropbox/production/reader.pub/seo-review-website_video.html`

Detailed summaries are in [`audits/`](audits/), and the working sequence is in [`audit-remediation-plan.md`](audit-remediation-plan.md).

## Governing workflow

**Status:** resolved

1. Treat both audits as recommendations, not automatic instructions.
2. First resolve every strategy, product, factual, legal, and cross-audit conflict in the agreed decision-pack order.
3. Do not implement further audit recommendations while that decision pack is open.
4. A specific, direct instruction from the user can authorize a narrowly scoped change, but a general audit approval does not authorize implementation.
5. After the decision pack is complete, create and approve a scoped implementation backlog before editing site code.

This wording replaces the earlier, incorrect interpretation that every approved point should immediately be implemented.

## Resolved decisions

### A. “Who benefits from” card icons

**Decision:** no change.

**Reason:** The four icons in this block already belong to the site’s standard two-colour card-icon set.  The marketing audit’s premise that they were a separate multi-colour icon system was incorrect.

### B. Canonical public category name

**Decision:** ReaderPub’s public category is **web-native publishing network**.  Use **platform** only where it specifically describes technical platform capabilities.

**Audit interaction:** The SEO audit recommends the homepage own a platform-oriented query while `/platform` owns ecosystem intent.  This implementation detail remains for the later SEO/copy backlog; it must not override the approved public-positioning rule.

### C. Canonical URL format

**Decision:** Use a trailing slash for every canonical URL, sitemap entry, internal route link, and redirect target, except the root URL `/`.

**Current implementation state:** A trailing-slash implementation exists in the worktree and has passed `npm run build` plus sitemap-to-canonical verification.  It is intentionally **uncommitted** because it was started before the decision pack was complete.  Do not extend, commit, or silently revert it during the decision phase.

## Existing homepage-video implementation context

The following was directly designed through user instructions before the audit decision process.  It is implementation context, not a decision that settles the audit’s strategic video question:

- The green video container uses the site’s circular green background and waves.
- It includes `The solution:`, the ReaderPub mark and wordmark, `Web-native Publishing Network`, and `Read instantly. Publish securely. Distribute strategically.`
- It uses a green-door transition to reveal the video, video playback, darkening, the “Guess what?” end state, and replay behaviour.
- Desktop and portrait layouts were iteratively adjusted for waves, centering, mobile size, and transitions.

## Decision pack — fixed order

### 1. Homepage video strategy — resolved

**Decision:** Keep the current extended staged video experience. Do not move to the audit’s fast value-first format.

**Clarification:** The video has already moved away from the very top of the homepage, so the relevant CTAs are already immediately visible. The decision therefore rejects only the audit’s proposed replacement of the video experience; it does not call for hiding or delaying the existing CTAs.

**Implementation status:** No audit-driven video change is authorized by this decision. Any later video performance work must preserve the existing staged experience and the immediately visible CTA placement.

### 2. Canonical category name — resolved

**Answer:** web-native publishing network; see decision B.

### 3. Investor navigation — resolved; Strategy positioning and facts — unresolved

**Decision:** Rename the navigation item `Market` to `Strategy`, and rename the page route from `/growth/` to `/strategy/`. Its document metadata uses `Strategy`; preserve the existing Hero heading, `Building the infrastructure behind the future of publishing`.

**Scope:** This direct instruction authorizes the navigation and page-name change only. It does not approve changes to factual market, pilot, investment, funding, or use-of-capital claims.

**Unresolved audit premise:** The audited page was assessed as though ReaderPub were already market-ready. The user states that the product is not yet on the market and that ReaderPub is approaching investors for its first investment. This changes the factual and strategic basis for the audit’s recommendations about market readiness, pilots, growth, funding, and use of capital.

**Next action:** Ask the auditor to revise the audit with this pre-market, first-investment context and provide updated recommendations. Do not implement or alter Strategy-page claims until that revised audit and the resulting factual decisions are reviewed.

### 4. WeTalk and WeBuzz — resolved

**Decision:** WeTalk remains a distinct product. Do not merge it into WeBuzz or present it as a private/access-controlled WeBuzz offering.

### 5. Manufacturers audience — resolved

**Decision:** Manufacturers are a real target segment and remain in the platform audience list.

**Rationale:** Manufacturers produce substantial documentation for their products, making ReaderPub’s publishing, access-control, and knowledge capabilities relevant to this segment.

### 6. Publishable proof and compliance facts — pending

**Question:** Which real names, roles, profiles, corporate information, support details, pilots, metrics, partners, patent references, catalog facts, and compliance/accessibility statements may be published?

## Next question for the new session

Start with decision-pack item **1: homepage video strategy**.  Do not begin implementation and do not ask about canonical URLs again.
