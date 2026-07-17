# Prompt for the next Codex session

Continue the ReaderPub website audit-review task.  Read these files completely before taking any action:

1. `/Users/anatoly/Dropbox/production/reader.pub/website_alt/AGENTS.md`
2. `/Users/anatoly/Dropbox/production/reader.pub/website_alt/.worktrees/website_seo/docs/audits/marketing-review-website_video.md`
3. `/Users/anatoly/Dropbox/production/reader.pub/website_alt/.worktrees/website_seo/docs/audits/seo-review-website_video.md`
4. `/Users/anatoly/Dropbox/production/reader.pub/website_alt/.worktrees/website_seo/docs/audit-remediation-plan.md`
5. `/Users/anatoly/Dropbox/production/reader.pub/website_alt/.worktrees/website_seo/docs/website-video-audit-decisions.md`

For detailed original evidence, the two HTML audits are:

- `/Users/anatoly/Dropbox/production/reader.pub/marketing-review-website_video.html`
- `/Users/anatoly/Dropbox/production/reader.pub/seo-review-website_video.html`

## Working context

- Work only in `/Users/anatoly/Dropbox/production/reader.pub/website_alt` and its active worktree `/Users/anatoly/Dropbox/production/reader.pub/website_alt/.worktrees/website_seo`.
- Active branch: `website_video`.
- Local site for this branch: `http://127.0.0.1:4322/`.
- Do not use or modify `/Users/anatoly/Dropbox/production/reader.pub/website_new_modified`.
- The prior committed homepage/video work is commit `68a2ee1` (`Refine homepage video introduction`) and is pushed to `origin/website_video`.
- `artifacts/` is untracked user content: never stage, remove, commit, or overwrite it.

## Critical process rule

The user explicitly requires that all strategy, factual, legal, product-scope, and cross-audit conflicts be resolved **before** implementation of audit recommendations.

Do not make further audit-driven code changes, run deployments, stage files, commit, or push while the decision pack remains open.  A direct instruction to change a specific design element is a limited exception, but agreement with a general audit recommendation is not implementation authorization.

One question per assistant message.  Do not change the agreed order or insert technically urgent SEO work ahead of it.

## Decision pack and current status

1. **Homepage video strategy — pending.** Ask whether to keep the current long staged video experience or adopt the audit’s fast value-first version with copy and CTAs immediately visible.  Existing video work does not itself settle this strategic question.
2. **Category name — resolved.** Public category is `web-native publishing network`; use `platform` only for technical platform capabilities.  Do not ask again.
3. **Investor navigation and Growth positioning — pending.** Ask whether `Market` becomes `Partners & Investors` or `Company` (or remains `Market`), then gather factual Growth claims separately.
4. **WeTalk/WeBuzz model — pending.** Ask whether WeTalk stays separate or becomes private/access-controlled WeBuzz.
5. **Manufacturers audience — pending.** Ask whether it is a real target segment or should be removed.
6. **Publishable facts — pending.** Then collect only approved factual information for team, corporate/contact identity, pilots/metrics, Gutenberg corpus wording, patent reference, and compliance/accessibility.

After all six are resolved, prepare a scoped implementation backlog and ask for approval before implementation.

## Important prior decision and uncommitted state

The user approved trailing slashes as canonical URL format.  Before the process correction, code was changed to implement that rule:

- `astro.config.mjs`: `trailingSlash: "always"`
- `src/layouts/Base.astro`: canonical and OG URL normalization
- internal route links were mechanically changed to trailing-slash URLs

These changes are uncommitted but passed `npm run build` and sitemap-to-canonical verification.  Do not extend, commit, or silently revert them during the decision phase.  Mention them only if the user asks about current worktree state.

## How to begin

Do not summarize the entire audit again.  Ask only the next pending question:

> We are returning to the original decision pack. For the homepage video, do you want to keep the current extended staged experience, or adopt the audit’s fast value-first format where the explanation and relevant CTAs are visible immediately?

After each user answer, update `docs/website-video-audit-decisions.md` only.  Then ask the next item in sequence.
