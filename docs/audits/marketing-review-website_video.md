# Marketing and positioning audit — working record

## Source and scope

- Source report: `/Users/anatoly/Dropbox/production/reader.pub/marketing-review-website_video.html`
- Branch reviewed by the report: `website_video`
- Audit method: all 16 rendered routes at desktop (1440×900) and mobile (390×844), using investor, author, and reader lenses.
- This file is a faithful working summary of the report, not a replacement for its source HTML.

## Overall assessment

The report judges the underlying product substance to be stronger than its packaging.  It highlights specific pricing, unusually candid security copy, credible institutional detail, a workable investor page, and a focused WeRead page.  Its main concerns are sequencing, proof, conversion plumbing, and product-scope presentation.

## Findings

### F1 — Homepage video delays the value proposition

The audit measured an approximately 27-second path before the line “Guess what? This is not an app, but a web page!” appears.  In the reviewed version, the first homepage H1 and CTA were below the 1440×900 fold.  The report recommends a ~2-second pre-roll, immediate explanatory hero copy, and audience CTAs visible beside the video.

**Decision status:** pending.  The homepage video has since been heavily redesigned at the user’s direction, but the strategic audit decision—retain the long scene or replace it with a fast value-first version—has not been explicitly made.

### F2 — Proof, named team, and factual claims

`/about` names no people and includes the unsupported phrase “rapidly gaining momentum.”  The report notes that “60K+ books” is a Project Gutenberg public-domain corpus rather than traction, while “25,000+” describes market size rather than customers.  It recommends named people and roles, quantified claims only where factual, transparent Gutenberg framing, and a visible patent-pending milestone.

**Decision status:** pending factual input from the user.  No names, metrics, pilot counts, legal claims, or compliance claims may be invented.

### F3 — The investor page is hidden behind “Market”

The report finds `/growth` useful for investors, but says the navigation label “Market” makes the page hard to discover.  It recommends “Company” or “Partners & Investors,” stronger sourced market sizing, and confident language about the use of investment.

**Decision status:** pending.  The current nav label is `Market`, following an earlier user request unrelated to this audit.

### F4 — Six products appear unfocused

The report says that WePub, WeRead, WeBuzz, WeTalk, BookTree, and Scribe appear as six separate products without a sufficiently clear compounding story.  It recommends:

- treat WePub and WeRead as the two core products;
- present WeBuzz, BookTree, and Scribe as connective capabilities;
- merge WeTalk into WeBuzz as private/access-controlled spaces;
- remove “Manufacturers” from audiences unless it represents a real customer segment;
- change the platform introduction to emphasize one network rather than six products.

**Decision status:** pending product-positioning decision.  Product consolidation cannot be assumed from a marketing recommendation.

### F5 — Author conversion path is broken or missing

- The primary “Start publishing” action on `/wepub` points back to `/wepub` instead of `PUBLISH_URL`.
- Pricing tiers lack plan-level CTAs, except for enterprise contact.
- The strongest self-service publishing message is on `/contact` instead of `/wepub` and `/pricing`.
- The homepage gives readers an earlier CTA than authors.

**Decision status:** implementation backlog after the decision pack.  The intended destination of self-service author actions needs to remain `PUBLISH_URL`.

### F6 — Repeated old-versus-new argument

The report counts several old/new comparison blocks across the site and four on `/wepub`.  It recommends no more than one comparison per page, retaining the canonical comparison on the homepage and using the recovered space for onboarding, pricing, migration, and catalog information.

**Decision status:** pending content-scope decision after product positioning is settled.

### F7 — “60K+ books” may create the wrong expectation

The report says visitors may expect current commercial titles.  It recommends plain wording such as “Read 60,000+ public-domain classics free” with the no-app/no-download benefit.

**Decision status:** depends on the factual-claims decision in F2.

### F8 — Footer lacks trust and discovery paths

The report says the footer should provide product, solution, company, legal, and contact links; surface `support@reader.pub`; link `/terms`; and, if public, link the patent-pending reference to a filing.

**Decision status:** pending factual/legal input for contact and corporate details.  A basic `/terms` link is also a separate SEO task.

### F9 — Security copy lacks procurement and accessibility facts

The report praises the security page’s candour but asks for accurate disclosures regarding GDPR posture, accessibility/screen-reader behaviour, SOC 2 status, data residency, and security documentation.  It specifically warns against claiming an accessible text layer unless it is true.

**Decision status:** pending factual/legal/compliance input.  No compliance assertion may be added without verification.

### F10 — Inconsistent category noun and homepage copy typo

The report found “network,” “platform,” and “infrastructure” used as competing category nouns.  It recommends `network` as the main positioning term and identifies an awkward homepage line about “Direct web access.”

**Decision status:** category rule resolved: use **web-native publishing network** as the public category name; use “platform” only when describing technical capabilities.  The remaining copy implementation belongs to the later backlog.

### F11 — Mobile video legibility

The report says a two-page book spread is illegible on narrow screens.  It recommends either showing a legible single-page crop or a static annotated image below 768px.

**Decision status:** linked to the pending video strategy decision.

### F12 — Placeholder copy is not live, but stale data is risky

The report verifies that scaffolding text in `src/data/pages.ts` is not rendered on any live route.  It identifies unused page blueprints as a future risk and recommends deleting unused blueprints while retaining only data still used by contact and KB.

**Decision status:** a low-risk maintenance task for the later implementation backlog; no visitor-facing emergency.

## Strengths to preserve

- Specific and legible pricing, including real price points and the 5% commission.
- Honest security language: no digital system can prevent every form of copying.
- WePub’s direct-relationship positioning.
- Detailed institutional workflows on `/contact`.
- The institutions hook and the disciplined WeRead page.
- The KB’s direct answers and the real product-demo video itself.

## Audit’s own prioritised backlog

1. Fix the WePub self-link.
2. Standardise the category term and correct homepage copy.
3. Add pricing-tier CTAs.
4. Create a functional footer with Terms and discoverable contact.
5. Shorten video pre-roll and show the value proposition/CTAs early.
6. Add a homepage author CTA and relocate the self-service publishing explanation.
7. Name the team; remove or quantify growth claims.
8. Reframe the Gutenberg corpus honestly.
9. Rename `Market` and improve growth-page investor language.
10. Add verified compliance and accessibility information.
11. Delete dead blueprints.
12. Resolve WeTalk/WeBuzz, Manufacturers, and the two-core-product story.
13. Reduce duplicate comparison blocks.
14. Make the mobile video legible.

Do not execute this priority list until the decision pack in [`../audit-remediation-plan.md`](../audit-remediation-plan.md) is completed and the user authorizes implementation.
