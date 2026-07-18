# Website video — audit decisions and conflict log

### Strategy pre-launch wording

**Decision:** The `/strategy/` hero uses: “The product is ready. We are focused on launching initial pilot projects and attracting partners, and we are open to financial collaboration.”

## Purpose and sources

This is the source of truth for user decisions made while reviewing:

- `/Users/anatoly/Dropbox/production/reader.pub/marketing-review-website_video.html`
- `/Users/anatoly/Dropbox/production/reader.pub/seo-review-website_video.html`

Detailed summaries are in [`audits/`](audits/), and the working sequence is in [`audit-remediation-plan.md`](audit-remediation-plan.md).

## Governing workflow

**Status:** resolved.

1. Treat both audits as recommendations, not automatic instructions.
2. First resolve every strategy, product, factual, legal, and cross-audit conflict in the agreed decision-pack order.
3. Do not implement further audit recommendations while that decision pack is open.
4. A specific, direct instruction from the user can authorize a narrowly scoped change, but a general audit approval does not authorize implementation.
5. After the decision pack is complete, create and approve a scoped implementation backlog before editing site code.

This wording replaces the earlier, incorrect interpretation that every approved point should immediately be implemented.

## Resolved decisions

### Partner and investor inquiries

**Decision:** The dedicated partnership form remains separate from the pilot form. The green `Partner inquiry` buttons on About and Contact, and the orange `Partner inquiry` button on Strategy, open that same form.

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

**Rationale:** Manufacturers issue substantial product documentation. Their core use case is making manuals, technical specifications, engineering designs, internal technical materials, and staff manuals easily accessible to employees and customers.

**Confirmation:** This positioning was reconfirmed on 2026-07-17; it is not an open audit question.

### 6. Publishable proof and compliance facts — resolved

**Approved team wording:** On the About page, use: “ReaderPub is built by top software engineers and industry professionals with decades of experience in technology innovations.” The related solution paragraph begins: “Our team is focused on …”

**Approved team disclosure:** The About page may publish the selected team members’ names, roles, profile photographs, and LinkedIn links. The initial approved list is Anatoly Tkach, Yury Arane, Dmitry Tkach, Nataliia Kupianska, Dinora Yususpova, Mikhail Lenskikh, Alex Berezkin, and Alex Melnik.

**Approved corporate identity:** The company may be identified on the website as ReaderPub Inc.

**Approved contact approach:** Direct enquiries to the website’s Contact page.

**Approved pilots and metrics:** ReaderPub has no test projects. Its catalogue contains more than 60,000 books. About three weeks after the social network opened, it has approximately 800 users discussing classic books. The observed growth rate is approximately 1,000 additional users per month.

**Approved catalogue wording:** As of today, every book in the catalogue is in the public domain and originates from Project Gutenberg.

**Approved patent reference:** ReaderPub may refer to patent application no. 63/975,429, filed in February 2026. Do not publish a link to the application.

**Approved accessibility and compliance wording:** The web reader supports text-to-speech and may be described as aligned with WCAG in that respect. The website itself has no equivalent built-in accessibility feature; its content can be read aloud through the user’s device-level assistive technology. Other compliance information is provided on the Terms page.

**Approved compliance placement:** Statements regarding GDPR, accessibility, SOC 2, data residency, and security documentation belong on the Terms page, not the Security page, because the Security page concerns protection of books. The Security page should link to the Terms page.

**Status:** The approved factual inputs above complete this decision-pack item. No audit recommendation based on these facts may be implemented without approval of a scoped implementation backlog.

### 6a. WeBuzz activity clarification — resolved

**Replacement-audit premise:** The revised marketing audit says that ReaderPub is pre-launch, has no real authors, readers, or investors, and that WeBuzz activity consists only of synthetic seed content plus friends-and-family activity.

**Decision:** WeBuzz is currently populated with synthetic content. The previously recorded growth figure is a projection, not current observed organic growth.

**Implementation boundary:** This clarification authorizes no site changes. Do not change the existing About wording, add a preview/seed label, alter WeBuzz, or make any other audit-driven site revision because of it unless the user directly instructs that specific change.

## Current state

All decision-pack questions are resolved. Any remaining item in the implementation backlog requires explicit user approval or a direct scoped instruction before site code changes begin.

### Platform publishing actions

**Decision:** Both `/platform` actions labelled “Start publishing” open `https://reader.pub/publish/` in a new tab.

### WeBuzz community action

**Decision:** The final `/webuzz/` action labelled “Join WeBuzz community” opens `https://webuzz.org/` in a new tab.
