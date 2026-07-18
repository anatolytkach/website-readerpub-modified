# Marketing and positioning audit — pre-launch working record

## Source and scope

- Source report: `/Users/anatoly/Dropbox/production/reader.pub/marketing-review-website_video.html`
- This pre-launch revision replaces the earlier marketing audit as the source of truth for marketing findings.
- Audit method stated by the report: rendered review at `localhost:4325`, desktop 1440px and mobile 390px, cross-checked against source.
- Active implementation worktree is served at `http://127.0.0.1:4322/`. Where the report cites an old route or source line that differs from this worktree, verify the live implementation before acting.

## Pre-launch framing

The report assumes that ReaderPub has not launched; it treats the absence of customers, testimonials, logos, funding badges, metrics, and case studies as normal at this stage. It evaluates whether the site can win the first investor conversation, first author, and first reader. It treats any implication that synthetic seed content is organic traction as a critical credibility problem.

## Findings and current plan status

### F1 — Homepage thesis and demo sequencing

The audit reports that, on its desktop review, the value proposition, H1, and CTAs appeared only after the 27-second staged video sequence. It recommends showing the thesis and CTAs from the first viewport, retaining the product video as proof, and adding a visible Skip control.

**Existing decision:** retain the extended staged video experience; the user has already moved the video away from the top of the homepage so relevant CTAs are visible immediately. The report’s geometry was measured on `localhost:4325`, not the active preview.

**Plan:** do not replace or shorten the staged experience. A Skip control is a separate, optional accessibility/UX task and needs explicit approval. Revalidate the desktop layout on the active preview before considering any further change.

### F2 — Pre-launch truthfulness and WeBuzz seed framing

The report identifies two credibility risks: `/about` says WeBuzz is “rapidly gaining momentum,” and the WeBuzz embed is not visibly labelled as an early seeded preview. It recommends removing the organic-growth implication and adding an explicit preview label.

**Decision:** WeBuzz is currently populated with synthetic content, and the previously recorded growth figure is a projection rather than observed organic growth. The user explicitly declined any site changes as a consequence: do not change the existing About wording, add a preview label, or alter WeBuzz unless directly instructed.

### F3 — Real publisher logos in the WePub hero

The audit finds that `/wepub` hero asset `author1.webp` contains identifiable logos for Penguin Random House, Hachette, Allen & Unwin, HarperCollins, Pan Macmillan, and Simon & Schuster. It says this can imply partnerships or endorsements and creates trademark risk.

**Implementation 2026-07-17:** Replaced the hero and WePub social-preview image with the approved `author.webp` illustration. It contains no identifiable third-party publisher marks. The WePub copy, CTA, and layout are unchanged.

### F4 — First-author conversion path

The report flags a self-linking WePub CTA and calls for actions on every pricing tier.

**Current implementation:** the primary `/wepub` “Start publishing” action already opens `https://reader.pub/publish/` in a new tab. The report’s WePub source-line evidence predates that fix. On 17 July 2026, both `/platform` “Start publishing” actions were also set to open `https://reader.pub/publish/` in a new tab.

**Existing decision:** pricing-tier buttons are not to be added because plan-specific prices must be discussed with ReaderPub. Do not implement the audit’s pricing-CTA recommendation.

### F5 — Investor reachability

The audit recommends renaming the investor navigation item to “Investors & Partners,” adding “Investor” to the contact-form role selector, and adding an investor route from `/about`.

**Existing decision:** the public navigation label and the page are both `Strategy`; this supersedes the requested navigation rename. The remaining two ideas — an Investor contact role and an `/about` investor link — are separate, unapproved changes and require a scoped decision.

### F6 — Team visibility

The audit asks for named founders, faces, roles, and short track records on `/about`.

**Current implementation:** the approved eight-person team block, square photos, roles, and LinkedIn links are already on `/about`. No further audit action is planned without new approved biographical wording.

### F7 — Pre-launch wording on `/strategy`

The audit accepts “market-ready” but says “scaling adoption” implies existing customer adoption. It recommends forward-looking language about winning first authors, publishers, and institutional pilots, and seeking capital and partnerships.

**Implementation 2026-07-17:** Replaced the adoption claim with the user-approved forward-looking wording: “The product is ready. We are focused on launching initial pilot projects and attracting partners, and we are open to financial collaboration.” The user-approved page name `Strategy` and market-ready product claim are unchanged.

### F8 — Product-brand scope

The audit recommends folding WeTalk into WeBuzz and presenting Read (WeRead) and Publish (WePub) as the two public pillars, with other capabilities subordinate.

**Existing decision:** WeTalk remains a distinct product. Do not merge it, redirect it, or remove the route. The separate question of how to present the product hierarchy externally remains unapproved.

### F9 — WeBuzz preview and incorrect CTA

The audit recommends a visible early-preview/seed label beside the WeBuzz embed. It also finds the final “Join WeBuzz community” CTA routes to `/wetalk/` rather than `https://webuzz.org/`.

**Implementation 2026-07-17:** The user approved the standalone CTA correction. The final “Join WeBuzz community” action now opens `https://webuzz.org/` in a new tab. No preview wording was added.

### F10 — Explicit competitive differentiation

The audit proposes a compact “Unlike Kindle/KDP/Substack/Scribd…” block on `/` and `/platform`, using ReaderPub’s browser-readability, ownership, discussion, and 5%-versus-up-to-35% message.

**Plan:** this is new comparative marketing copy, not a factual correction. It requires separate approval of the exact public wording and claims before implementation.

### F11 — Footer and visible email

The audit asks for broader footer navigation, a visible support email, and a Terms link.

**Current implementation and decision:** the footer links to Terms and Contact. The user explicitly chose Contact-page enquiries rather than publishing an email address. Do not add an email address unless that decision changes.

### F12 — Mobile

The audit reports no mobile blockers and says the desktop sequencing issue is the priority. No mobile change is planned from this report.

## Strengths to preserve

- The real WeRead demo is strong proof that the product exists.
- The WePub message about direct reader relationships and the 5% commission is specific and memorable.
- The WeRead route provides a clear direct path to the catalogue.
- `/strategy` has a useful investor thesis: markets, shared foundation, revenue logic, use of capital, and why-now framing.
- A pre-launch site does not need invented traction, testimonials, customer logos, or case studies.

## Updated implementation order

1. **Do not alter WeBuzz or its current About wording** because of the audit’s seed-content recommendation; the user expressly declined that change.
2. **Remove real publisher marks** from the `/wepub` hero asset.
3. **Correct remaining low-risk route semantics:** decide the `/platform` “Start publishing” label/target and authorize the final WeBuzz CTA correction.
4. **Apply approved pre-launch copy:** soften `/strategy` adoption language, strictly using approved facts.
5. **Consider investor discoverability additions:** Investor in the Contact selector and a direct investor link on `/about`, while preserving the approved `Strategy` navigation.
6. **Consider new comparative and hierarchy messaging** only after exact copy and scope approval.

The report’s recommendations to replace the staged video, rename `Strategy`, add pricing-tier CTAs, merge WeTalk into WeBuzz, or expose an email conflict with existing direct user decisions and are not implementation tasks.
