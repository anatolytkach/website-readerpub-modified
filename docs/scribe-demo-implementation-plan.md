# Scribe Demo Step-by-Step Implementation Plan

This document is a practical execution guide. It is designed so the project owner and Codex can move through the Scribe demo implementation one concrete step at a time.

## Execution Dashboard

Current progress:

- [ ] Phase 0 — Current State Summary
- [ ] Phase 1 — Choose Demo Service
- [ ] Phase 1.5 — Service Capability Verification
- [ ] Phase 2 — OpenAI API Setup
- [ ] Phase 3 — Create Scribe Bot
- [ ] Phase 4 — Knowledge Base Sources
- [ ] Phase 5 — System Prompt
- [ ] Phase 6 — Model Selection
- [ ] Phase 7 — Visual Configuration
- [ ] Phase 8 — Embed Data Handoff
- [ ] Phase 8.5 — Owner Approval Before Implementation
- [ ] Phase 9 — Implement Modal
- [ ] Phase 10 — Connect Four CTA Surfaces
- [ ] Phase 11 — Testing
- [ ] Phase 11.5 — Demo Quality Review
- [ ] Phase 12 — Final Launch Approval

Current phase:

```text
Phase 1 — Choose Demo Service
```

Next action:

```text
Owner chooses the first demo service, starting with Chatbase, then verifies whether it supports BYOK, modal-friendly embed, placeholder customization, editable instructions, and ReaderPub-only behavior.
```

Current blocker:

```text
No demo service has been selected or approved yet. Codex must not implement the modal until the Owner completes service selection, service capability verification, bot setup, embed handoff, and Phase 8.5 approval.
```

Date: 2026-06-27

Current status: planning only. Do not implement the Scribe demo until the Owner completes the required service setup and handoff phases.

## Phase 0: Current State Summary

### Goal

Make sure the Owner and Codex start from the same understanding of the current ReaderPub site and the exact Scribe demo surfaces that will later be changed.

### Who Performs This Phase

Owner and Codex, read-only.

### Inputs

- Current repository: `/Users/anatoly/Dropbox/production/reader.pub/website_new_modified`
- Existing Astro site files.
- Existing Scribe page and Scribe assets.
- Current Scribe-related CTA audit.

### Current Summary

- The Scribe product page already exists at `/scribe/`, implemented in `src/pages/scribe.astro`.
- The Scribe icon exists at `public/images/scribe.svg`.
- The Scribe hero image exists at `public/images/scribe_hero.webp`.
- The site is an Astro static site using page-level routes, shared Astro components, global CSS, and vanilla client-side JavaScript.
- `src/layouts/Base.astro` is the shared layout used across the site.
- `src/components/ActionLink.astro` already supports modal-trigger buttons through `modalTarget`.
- Existing modal code exists in `src/components/KbHelpModal.astro` and `src/pages/contact.astro`, but there is no reusable Scribe modal yet.
- There are four Scribe CTA surfaces intended for the demo.
- In the current working tree, two `/scribe/` buttons go to `/contact/`, and two `/kb/` `Ask Scribe` buttons go to `/scribe`.
- Desired behavior: all four Scribe demo CTA surfaces should open an on-site Scribe chat modal.
- No Scribe demo implementation has been done yet.
- No Chatbase, DocsBot, or Dify script should be connected until the Owner provides embed data.

### Four Scribe CTA Surfaces

| Step ID | Page | File | Button text | Current href | Desired behavior | Owner/Codex note |
|---|---|---|---|---|---|---|
| CTA-1 | `/scribe/` | `src/pages/scribe.astro` | `Try Scribe demo` | `/contact/` | Open `#scribe-modal` | Generated from `primaryActions[0]` and rendered in the hero through `HeroSection` and `ActionLink`. |
| CTA-2 | `/scribe/` | `src/pages/scribe.astro` | `Try Scribe demo` | `/contact/` | Open `#scribe-modal` | Final CTA reuses the same Scribe action through `ctaActions[0]`. One action change should affect both Scribe page demo buttons. |
| CTA-3 | `/kb/` | `src/data/pages.ts` | `Ask Scribe` | `/scribe` | Open `#scribe-modal` | Rendered in the KB hero through `PageScaffold`. Keep the Scribe icon and `button--scribe-demo` styling. |
| CTA-4 | `/kb/` | `src/data/pages.ts` | `Ask Scribe` | `/scribe` | Open `#scribe-modal` | Rendered in the KB final CTA block. Keep the Scribe icon and `button--scribe-demo` styling. |

Other product/navigation links to `/scribe/` should remain normal product-page links unless the Owner later asks for a broader launcher.

### Concrete Actions

1. Owner reads the summary and confirms that the four CTA surfaces above are the intended demo launch points.
2. Codex does not change code in this phase.
3. Codex does not add any hosted chatbot script in this phase.

### Result of This Phase

Both Owner and Codex agree on the current site state, the four CTA surfaces, and the desired future behavior.

### What to Pass Forward

Confirmation that these are the four intended demo launchers:

- `CTA-1`
- `CTA-2`
- `CTA-3`
- `CTA-4`

### Checklist Completion

- [ ] Owner confirms that only these four CTA surfaces should launch the Scribe demo.
- [ ] Owner confirms that normal product links to `/scribe/` should remain unchanged.
- [ ] Codex confirms no implementation has been started.

### Stop Condition

Do not continue to implementation planning beyond this document if the Owner wants a different set of Scribe buttons or wants every `/scribe/` product link to become a modal launcher. Update this plan first.

## Phase 1: Owner Decision - Choose Demo Service

### Goal

Choose the hosted chatbot service for the first Scribe demo.

### Who Performs This Phase

Owner only.

### Inputs

- This plan.
- Owner preference on OpenAI API key ownership.
- Owner preference on speed versus infrastructure control.
- Accounts or willingness to create accounts in Chatbase, DocsBot, or Dify.

### Decision Order

1. Start with Chatbase.
2. Create or open a Chatbase account.
3. Check whether Chatbase supports an owner-provided OpenAI API key in the selected account or plan.
4. Check whether Chatbase can create a website-trained bot and expose a usable embed script, iframe, or widget id.
5. Check whether Chatbase allows the input placeholder to be customized.
6. If Chatbase supports BYOK, continue with Chatbase.
7. If Chatbase does not support BYOK but the Owner accepts Chatbase-managed credits, continue with Chatbase.
8. If an owner-owned OpenAI API key is mandatory and Chatbase does not support it, switch to DocsBot.
9. Do not use Dify for the first demo unless the Owner intentionally wants infrastructure setup instead of the fastest demo.

### Service Decision Table

| Service | Use when | Do not use when | Owner action | Data to collect |
|---|---|---|---|---|
| Chatbase | Owner wants the fastest no-code website chatbot demo, and Chatbase supports BYOK or Owner accepts Chatbase-managed credits. | Owner-owned OpenAI API key is mandatory and the selected Chatbase account/plan cannot use it. | Create account, create bot, inspect model/API key/BYOK settings, inspect embed options, inspect placeholder customization. | BYOK status, model list, embed type, widget id/script, placeholder support, rate/message limit options. |
| DocsBot | Chatbase fails the BYOK requirement, or DocsBot offers a better owner-key and widget setup. | Owner wants the absolute fastest setup and Chatbase already satisfies requirements. | Create account only if Chatbase fails BYOK or widget requirements, confirm OpenAI API key support, inspect widget embed, inspect placeholder customization. | OpenAI key support, model list, embed type, widget id/script, placeholder support, rate/message limit options. |
| Dify | Owner wants a future RAG/workflow platform or more control over retrieval and model orchestration. | The goal is the simplest first website demo. | Treat as a future option unless intentionally chosen now. | Hosting plan, model provider setup, app embed method, knowledge base setup details. |

### Concrete Actions

#### Chatbase

1. Open Chatbase.
2. Create an account or sign in.
3. Create a new chatbot for ReaderPub.
4. Open the chatbot settings.
5. Find the model, credits, billing, API key, or BYOK-related area.
6. Check whether an owner-provided OpenAI API key can be used in the selected plan.
7. Find the website, sitemap, or source import area.
8. Confirm that ReaderPub pages can be crawled or imported.
9. Find the embed or deployment area.
10. Check whether the service provides a script, iframe, widget id, or public key.
11. Find the appearance or chat settings area.
12. Check whether the input placeholder can be set to:

```text
I am Scribe. Ask me anything about ReaderPub.
```

#### DocsBot

1. Use DocsBot only if Chatbase fails a requirement or the Owner prefers DocsBot.
2. Create an account or sign in.
3. Create a bot for ReaderPub.
4. Open the team, model, API key, or provider settings.
5. Confirm whether an owner-provided OpenAI API key can be used.
6. Find the website, sitemap, URL list, or source import area.
7. Confirm that ReaderPub pages can be crawled or imported.
8. Find the embeddable widget area.
9. Check whether the service provides a script, iframe, widget id, or public key.
10. Check whether the input placeholder can be customized.

#### Dify

1. Do not select Dify for the first demo unless the Owner explicitly wants a more infrastructure-heavy setup.
2. If selected anyway, confirm hosting, model provider, knowledge base, app embed, and operations responsibilities before moving forward.

### Result of This Phase

Owner selects one service:

- Chatbase
- DocsBot
- Dify
- Other explicitly chosen service

### What to Pass Forward

Owner records:

- Selected service.
- Whether BYOK is supported.
- Whether service-managed credits will be used.
- Whether placeholder customization is supported.
- Whether embed script, iframe, or widget id is available.

### Checklist Completion

- [ ] Selected service recorded.
- [ ] BYOK status checked.
- [ ] Embed option checked.
- [ ] Placeholder customization checked.
- [ ] Model selection area found.
- [ ] Knowledge base/source import area found.

### Stop Condition

Do not move to service configuration or Codex implementation until the Owner has selected exactly one service for the first demo.

## Phase 1.5: Owner Task - Service Capability Verification

### Goal

Verify that the selected service can satisfy the critical Scribe demo requirements before the Owner invests time in creating the final bot and before Codex implements anything on the site.

### Who Performs This Phase

Owner only.

### Inputs

- Selected service from Phase 1.
- Access to the selected service dashboard.
- Scribe demo requirements from this plan.
- Temporary test bot, if the service requires a bot before settings are visible.

### Criticality Levels

Critical:

- Editable system prompt.
- Knowledge-base-only mode or strict prompt behavior that can reasonably restrict answers to ReaderPub.
- Modal-friendly embed through script, iframe, widget id, or public key.
- No private API key in frontend.

Important:

- Placeholder customization.
- Custom icon.
- Manual model selection.
- Usage limits.

Nice to have:

- Vendor branding removal or reduction.
- Chat transcript access/export.

### Capability Verification Table

Fill this table while testing Chatbase, DocsBot, or the selected service.

| Capability | Required? | Chatbase result | DocsBot result | Decision note |
|---|---|---|---|---|
| Custom icon | Important |  |  |  |
| Placeholder customization | Important |  |  |  |
| Vendor branding control | Nice to have |  |  |  |
| Owner OpenAI API key / BYOK | Required if Owner mandates BYOK |  |  |  |
| Manual model selection | Important |  |  |  |
| Editable system prompt | Critical |  |  |  |
| Exact fallback response | Critical for demo quality |  |  |  |
| Knowledge-base-only mode | Critical |  |  |  |
| Modal-friendly embed | Critical |  |  |  |
| Usage limits | Important |  |  |  |
| Chat transcript access/export | Nice to have |  |  |  |

### Concrete Actions

1. Open the selected service dashboard.
2. Create a temporary test bot if the service does not show settings until a bot exists.
3. Check whether the service supports uploading a custom Scribe icon.
4. Check whether the service supports changing the input placeholder.
5. Check whether the placeholder can be set exactly to:

```text
I am Scribe. Ask me anything about ReaderPub.
```

6. Check whether vendor branding can be removed or reduced.
7. Check whether an owner-provided OpenAI API key can be used.
8. Check whether the model can be selected manually.
9. Check whether the system prompt or AI instructions can be edited.
10. Check whether a separate fallback, no-answer, or out-of-scope response can be configured.
11. Check whether general knowledge can be disabled or strongly restricted to the uploaded knowledge base.
12. Check whether the bot can be embedded in a modal through script, iframe, widget id, or public key.
13. Check whether chat history/export is available, if useful later.
14. Check whether rate limits, message limits, or usage caps can be configured.
15. Record each result in the capability table.
16. Decide whether the selected service remains viable.

### Result of This Phase

The Owner knows whether the selected service can support a safe and credible Scribe demo before creating the final bot.

### What to Pass Forward

- Completed capability table.
- Selected service remains viable: yes/no.
- Critical capabilities passed: yes/no.
- Limitations that the Owner accepts.
- Limitations that require switching service.

### Checklist Completion

- [ ] Service dashboard checked.
- [ ] Temporary test bot created if needed.
- [ ] Custom icon support checked.
- [ ] Placeholder support checked.
- [ ] Vendor branding control checked.
- [ ] BYOK status checked.
- [ ] Manual model selection checked.
- [ ] Editable prompt checked.
- [ ] Exact fallback configuration checked.
- [ ] Knowledge-base-only behavior checked.
- [ ] Modal-friendly embed checked.
- [ ] Usage limits checked.
- [ ] Chat transcript access/export checked.
- [ ] Capability table completed.
- [ ] Owner decides whether the service remains viable.

### Stop Condition

Do not proceed if the selected service cannot support a safe modal embed, cannot edit AI instructions, or cannot reasonably restrict answers to ReaderPub knowledge.

## Phase 2: Owner Task - Create or Confirm OpenAI API Setup

### Goal

Prepare OpenAI billing and API key handling safely, without exposing private credentials to Codex or the repository.

### Who Performs This Phase

Owner only.

### Inputs

- Selected service from Phase 1.
- Service capability verification from Phase 1.5.
- Decision on BYOK versus service-managed credits.
- OpenAI Platform account.

### Concrete Actions

1. Open the OpenAI Platform.
2. Check whether billing or credits are active.
3. Open the API Keys section in OpenAI Platform.
4. Create a new API key only for the Scribe demo.
5. Name it clearly, for example:

```text
ReaderPub Scribe Demo
```

6. Copy the key once and store it securely in a password manager or another secure secret store.
7. Do not paste the private OpenAI API key into this repository.
8. Do not send the private OpenAI API key to Codex.
9. If the selected chatbot service supports BYOK, enter the key only inside that service's secure dashboard.
10. If the selected chatbot service uses service-managed credits instead of BYOK, do not create or enter a key unless needed later.

### Result of This Phase

The Owner knows whether the Scribe demo will use:

- an owner OpenAI API key entered into the chatbot service dashboard; or
- service-managed model credits/billing.

### What to Pass Forward

Pass forward only non-secret information:

- `BYOK: yes` or `BYOK: no`
- selected billing mode;
- selected model if already known;
- confirmation that the private key is stored securely.

Do not pass the private OpenAI API key to Codex.

### Checklist Completion

- [ ] OpenAI billing active, if BYOK is used.
- [ ] Scribe demo API key created, if BYOK is used.
- [ ] Key named clearly.
- [ ] Key stored securely.
- [ ] Key not committed to repository.
- [ ] Key not sent to Codex.
- [ ] Billing mode confirmed.

### Stop Condition

Do not move forward until it is clear whether the selected chatbot service will use the Owner's OpenAI key or service-managed credits.

## Phase 3: Owner Task - Create Scribe Bot

### Goal

Create the hosted Scribe bot shell in the selected service.

### Who Performs This Phase

Owner only.

### Inputs

- Selected service from Phase 1.
- OpenAI/BYOK decision from Phase 2.
- ReaderPub public URL list from Phase 4.
- System prompt from Phase 5.
- Model recommendation from Phase 6.
- Visual configuration from Phase 7.

### A. If Using Chatbase

1. Open Chatbase.
2. Create a new chatbot.
3. Name the chatbot:

```text
Scribe
```

4. Choose the website, sitemap, or source import option.
5. Add the ReaderPub sitemap if it exists.
6. If no sitemap is available, add the ReaderPub URL list manually.
7. Start indexing or training.
8. Wait until indexing completes.
9. Open the model or AI settings.
10. Select the model according to Phase 6.
11. If Chatbase supports owner-provided OpenAI API keys in the selected plan, enter the key in the secure Chatbase dashboard.
12. If Chatbase uses service-managed credits, confirm that the Owner accepts that billing model.
13. Open the instructions, system prompt, or AI behavior area.
14. Paste the full Scribe system prompt from Phase 5.
15. If Chatbase has a separate fallback, out-of-scope, or "no answer found" setting, paste the exact fallback response there too.
16. Open appearance or branding settings.
17. Set the bot name to `Scribe`.
18. Upload the Scribe icon.
19. Configure ReaderPub colors.
20. Set the welcome message from Phase 7.
21. Set the input placeholder from Phase 7 if possible.
22. Open deployment or embed settings.
23. Locate the embed script, iframe, widget id, or public embed key.
24. Copy only public embed data for Codex.
25. Do not copy a private OpenAI API key into the handoff.

### B. If Using DocsBot

1. Open DocsBot.
2. Create a new bot.
3. Name the bot:

```text
Scribe
```

4. Open the team, provider, OpenAI key, or model settings.
5. Connect the Owner OpenAI API key if DocsBot requires or supports it.
6. Choose website, sitemap, URL list, or documentation source import.
7. Add the ReaderPub sitemap if it exists.
8. If no sitemap is available, add the ReaderPub URL list manually.
9. Start indexing or training.
10. Wait until indexing completes.
11. Open model settings.
12. Select the model according to Phase 6.
13. Open instructions, prompt, or bot behavior settings.
14. Paste the full Scribe system prompt from Phase 5.
15. If DocsBot has a separate fallback, out-of-scope, or "no answer found" setting, paste the exact fallback response there too.
16. Open widget or embed settings.
17. Configure bot name, icon, colors, welcome message, and placeholder if supported.
18. Locate the embed script, iframe, widget id, or public key.
19. Copy only public embed data for Codex.
20. Do not copy a private OpenAI API key into the handoff.

### C. If Using Dify

Dify is a future option and is not recommended for the first demo unless the Owner intentionally wants infrastructure setup now.

If Dify is chosen anyway:

1. Confirm where Dify will be hosted.
2. Configure the OpenAI model provider.
3. Create a knowledge base.
4. Create a chat app.
5. Connect the knowledge base to the app.
6. Add the Scribe system prompt.
7. Configure app embed.
8. Confirm that Codex will receive only public embed data or an agreed backend integration plan.

### Result of This Phase

A hosted bot named `Scribe` exists in the selected service and is ready for knowledge base, prompt, model, visual, and embed handoff completion.

### What to Pass Forward

- Selected service.
- Bot name.
- Bot/dashboard URL, if safe to share.
- Whether indexing has completed.
- Embed data location.
- Any service limitations discovered.

### Checklist Completion

- [ ] Scribe bot created.
- [ ] Service account active.
- [ ] BYOK or service-managed billing configured.
- [ ] Source import area found.
- [ ] Model settings found.
- [ ] Prompt settings found.
- [ ] Widget/embed settings found.

### Stop Condition

Do not ask Codex to implement the modal until the hosted bot exists and the Owner can provide the embed details listed in Phase 8.

## Phase 4: Owner Task - Knowledge Base Sources

### Goal

Train or index Scribe on the current public ReaderPub website content, without adding drafts, private documents, or development files.

### Who Performs This Phase

Owner only.

### Inputs

- Selected chatbot service.
- ReaderPub live site.
- Sitemap if available.
- Manual URL list below.

### Concrete Actions

1. In the selected chatbot service, open the source, knowledge base, data, or training area.
2. If a live sitemap exists, use the sitemap first.
3. If no sitemap exists, add the URLs below manually.
4. Start indexing.
5. Wait until indexing completes.
6. Review the indexed source list.
7. Remove anything that is old, private, irrelevant, duplicated, or development-only.

### Required Public URL List

Use the live ReaderPub domain:

- `https://reader.pub/`
- `https://reader.pub/platform/`
- `https://reader.pub/wepub/`
- `https://reader.pub/weread/`
- `https://reader.pub/webuzz/`
- `https://reader.pub/wetalk/`
- `https://reader.pub/booktree/`
- `https://reader.pub/scribe/`
- `https://reader.pub/authors/`
- `https://reader.pub/institutions/`
- `https://reader.pub/pricing/`
- `https://reader.pub/security/`
- `https://reader.pub/kb/`
- `https://reader.pub/about/`
- `https://reader.pub/terms/`
- `https://reader.pub/contact/`

### Do Not Index

- old drafts;
- old website versions;
- `website_old`;
- repository files;
- `src/`;
- `dist/`;
- `node_modules/`;
- `.astro/`;
- `.wrangler/`;
- package files;
- config files;
- development scripts;
- private documents;
- credentials;
- unpublished manuscripts;
- customer data;
- internal notes.

### Result of This Phase

The Scribe bot is trained or indexed on the current public ReaderPub website pages.

### What to Pass Forward

- Whether sitemap was used.
- Exact URLs indexed.
- Indexing status.
- Any URLs that failed.
- Any excluded sources.

### Checklist Completion

- [ ] All current public pages added.
- [ ] Indexing completed.
- [ ] No old/draft/private files indexed.
- [ ] No repository/development files indexed.
- [ ] Failed URLs recorded.

### Stop Condition

Do not move to final testing until indexing is complete and the Owner has verified that no private or development-only materials were indexed.

## Phase 5: Owner Task - System Prompt

### Goal

Configure Scribe so the demo answers only ReaderPub-related questions using the uploaded ReaderPub knowledge base.

### Who Performs This Phase

Owner only.

### Inputs

- Selected chatbot service.
- Prompt or instructions field in the service dashboard.
- Exact system prompt below.
- Exact fallback response below.

### Concrete Actions

1. Open the selected chatbot service.
2. Open the Scribe bot.
3. Find the system prompt, instructions, bot behavior, AI instructions, or equivalent area.
4. Paste the full prompt below without shortening it.
5. Find whether the service has a separate fallback, out-of-scope, "answer not found", or "no sources found" field.
6. If such a field exists, paste the exact fallback response there too.
7. Save the settings.
8. Ask at least one off-topic question in the service preview.
9. Verify that the exact fallback response appears.

### System Prompt

```text
You are Scribe, the AI companion and assistant for ReaderPub.

You are running as a demonstration version embedded on the ReaderPub website.

Answer only questions that are directly related to ReaderPub, the content of the ReaderPub website, ReaderPub products, publishing workflows, web-native books, reading workflows, discussion/community workflows, institutional publishing, access/security, pricing, onboarding, and related ReaderPub platform features.

Use only the ReaderPub website content and uploaded knowledge base provided to you. Do not use general model knowledge to answer. Do not invent ReaderPub features, pricing, policies, capabilities, integrations, legal claims, security guarantees, or implementation details.

Answer in clear, natural human language. Keep answers concise. When helpful, mention relevant ReaderPub products such as WePub, WeRead, WeBuzz, WeTalk, BookTree, Scribe, Authors, Institutions, Pricing, Security, Knowledge Base, or Contact/Pilot only when the answer is grounded in the uploaded ReaderPub content.

If the user's question is outside the ReaderPub scope, or if the ReaderPub knowledge base does not contain enough information to answer confidently, respond with exactly this text and nothing else:

I’d love to help, but the demonstration version of Scribe has been intentionally limited to ReaderPub. I can answer questions about the platform, its products, publishing workflows and related features, but your question appears to be outside that scope. Try asking me something about ReaderPub instead.
```

### Exact Fallback Response

Do not rewrite this text:

```text
I’d love to help, but the demonstration version of Scribe has been intentionally limited to ReaderPub. I can answer questions about the platform, its products, publishing workflows and related features, but your question appears to be outside that scope. Try asking me something about ReaderPub instead.
```

### Result of This Phase

Scribe has strict ReaderPub-only instructions and an exact out-of-scope fallback response.

### What to Pass Forward

- Prompt configured: yes/no.
- Fallback configured in a separate field: yes/no/not available.
- Preview fallback test result.

### Checklist Completion

- [ ] Full system prompt pasted.
- [ ] Exact fallback response pasted where possible.
- [ ] Off-topic preview question tested.
- [ ] Fallback response matches exactly.
- [ ] Settings saved.

### Stop Condition

Do not proceed to launch if the service cannot be made to refuse off-topic questions with the exact fallback response.

## Phase 6: Owner Task - Model Selection

### Goal

Choose a model that balances answer quality and demo cost.

### Who Performs This Phase

Owner only.

### Inputs

- Selected chatbot service.
- Model list visible in the service dashboard.
- BYOK or service-managed credit decision.

### Practical Model Decision

1. Open the model or AI settings in the selected service.
2. Look for `gpt-4.1-mini`.
3. If `gpt-4.1-mini` is available, use it as the recommended default.
4. If `gpt-4.1-mini` is not available, look for `gpt-4o-mini`.
5. If `gpt-4o-mini` is available, use it as the fallback default.
6. Use `gpt-4o` only if answer quality is visibly too weak with the mini model.
7. Use full `gpt-4.1` only if the service supports it and the Owner accepts the higher cost.
8. If the service does not expose these exact model names, choose the closest high-quality mini model first.
9. Enable message limits, rate limits, or spending controls if the service provides them.

### Result of This Phase

The Scribe bot has a selected model and basic cost-control settings where available.

### What to Pass Forward

- Selected model name.
- Reason for model selection.
- Whether message limits or rate limits are enabled.
- Whether service-managed credits or owner OpenAI billing are used.

### Checklist Completion

- [ ] Selected model name recorded.
- [ ] Reason for selection recorded.
- [ ] Cost control enabled if available.
- [ ] Higher-cost model avoided unless justified.

### Stop Condition

Do not continue to launch if the Owner cannot identify the selected model or cannot accept the expected cost/billing mode.

## Phase 7: Owner Task - Visual Configuration

### Goal

Configure the hosted widget so users see Scribe and ReaderPub branding, not a generic vendor chatbot.

### Who Performs This Phase

Owner only.

### Inputs

- Selected chatbot service.
- Scribe icon from site assets.
- ReaderPub color values.
- Required placeholder and welcome message.

### Concrete Actions

1. Open the Scribe bot appearance, widget, branding, or theme settings.
2. Set bot name:

```text
Scribe
```

3. Set input placeholder if the service supports it:

```text
I am Scribe. Ask me anything about ReaderPub.
```

4. Upload or select the Scribe icon from the site asset:

```text
public/images/scribe.svg
```

5. Use ReaderPub accent green/teal where the service allows color customization:

```text
#028f80
```

6. Use a light surface/background where possible:

```text
#ffffff
```

7. Avoid default vendor branding if the selected plan allows branding removal.
8. Set welcome message if the service supports it:

```text
Hi, I’m Scribe. Ask me anything about ReaderPub, its products, publishing workflows or platform features.
```

9. If placeholder customization is not possible, record that clearly for Codex in Phase 8.
10. If icon upload is not possible, record that clearly for Codex in Phase 8.
11. If vendor branding cannot be removed, record that clearly for the launch decision in Phase 12.

### Result of This Phase

The hosted bot is visually configured as Scribe as much as the selected service allows.

### What to Pass Forward

- Placeholder customization: yes/no.
- Icon configured: yes/no.
- Colors configured: yes/no.
- Vendor branding visible: yes/no.
- Welcome message configured: yes/no.

### Checklist Completion

- [ ] Bot name is `Scribe`.
- [ ] Placeholder configured or limitation recorded.
- [ ] Scribe icon configured or limitation recorded.
- [ ] ReaderPub accent color configured or limitation recorded.
- [ ] Welcome message configured or limitation recorded.
- [ ] Vendor branding status recorded.

### Stop Condition

Do not launch if visual limitations make the demo feel like an unrelated third-party chatbot and the Owner considers that unacceptable.

## Phase 8: Owner Task - Get Embed Data for Codex

### Goal

Prepare a complete, non-secret handoff so Codex can implement the website modal without needing private credentials.

### Who Performs This Phase

Owner only.

### Inputs

- Completed hosted Scribe bot.
- Completed knowledge base indexing.
- Completed prompt/model/visual configuration.
- Embed or widget details from the service.

### Concrete Actions

1. Open the selected chatbot service.
2. Open the Scribe bot deployment, embed, share, install, or widget area.
3. Copy the public embed script, iframe URL, widget id, or public key.
4. Do not copy the private OpenAI API key.
5. Fill out Appendix A.
6. Send the completed Appendix A handoff to Codex.
7. Include known limitations, especially placeholder support and fallback behavior.

### Required Handoff Fields

- Selected service.
- Embed type.
- Embed script.
- Widget ID.
- Public key, if any.
- Model.
- BYOK status.
- Placeholder customization status.
- Out-of-scope fallback test status.
- Knowledge base indexing status.
- Test question status.

### Result of This Phase

Codex has all public embed data and service decisions needed to implement the Scribe modal.

### What to Pass Forward

Fill and pass Appendix A exactly. Do not include private API keys.

### Checklist Completion

- [ ] Selected service recorded.
- [ ] Embed type recorded.
- [ ] Embed script, iframe URL, widget id, or public key copied.
- [ ] Model recorded.
- [ ] BYOK status recorded.
- [ ] Placeholder customization status recorded.
- [ ] Fallback test status recorded.
- [ ] Knowledge base indexing status recorded.
- [ ] Private OpenAI API key not included.

### Stop Condition

Do not ask Codex to implement the modal until this handoff is complete. Codex cannot safely implement the embed without the public widget details.

## Phase 8.5: Owner Decision - Demo Service Approval Before Implementation

### Goal

Approve or reject the selected hosted bot before Codex starts implementing the Scribe modal on the ReaderPub site.

### Who Performs This Phase

Owner only.

### Inputs

- Completed Phase 1.5 service capability verification.
- Completed hosted bot from Phase 3.
- Indexed knowledge base from Phase 4.
- Prompt configuration from Phase 5.
- Model selection from Phase 6.
- Visual configuration from Phase 7.
- Embed handoff data from Phase 8.

### Concrete Actions

1. Owner opens the hosted bot preview inside the selected service.
2. Owner confirms the bot name is `Scribe`.
3. Owner confirms the Scribe icon is present or records the limitation.
4. Owner confirms placeholder support or records the limitation.
5. Owner asks several ReaderPub questions.
6. Owner asks several out-of-scope questions.
7. Owner verifies the exact fallback response.
8. Owner checks whether the bot hallucinates ReaderPub features.
9. Owner checks whether answer length and tone are acceptable.
10. Owner confirms cost/billing mode.
11. Owner confirms privacy/data retention is acceptable enough for the demo.
12. Owner confirms that public embed data is available.
13. Owner decides:

```text
Approved for Codex implementation / Not approved yet
```

### Go / No-Go Checklist

GO only if:

- [ ] Bot can answer ReaderPub questions acceptably.
- [ ] Bot refuses out-of-scope questions.
- [ ] Bot does not invent ReaderPub features.
- [ ] Owner accepts placeholder limitations, if any.
- [ ] Owner accepts icon limitations, if any.
- [ ] Owner accepts branding limitations, if any.
- [ ] Owner accepts the cost model.
- [ ] Owner accepts the privacy posture for a demo.
- [ ] Public embed data is available.
- [ ] No private API key is required in frontend code.

NO-GO if:

- [ ] Bot answers from general knowledge.
- [ ] Exact fallback does not work.
- [ ] Bot invents features.
- [ ] No modal-friendly embed is available.
- [ ] API key would need to appear in frontend.
- [ ] Owner rejects vendor branding limitations.
- [ ] Owner rejects placeholder limitations.
- [ ] Owner rejects icon limitations.
- [ ] Cost model is unacceptable.
- [ ] Privacy/data retention posture is unacceptable.

### Result of This Phase

The Owner explicitly approves or blocks Codex implementation before any site code is changed.

### What to Pass Forward

If approved:

- `Owner pre-implementation approval: approved`
- completed Appendix A handoff;
- accepted limitations;
- known service issues.

If not approved:

- `Owner pre-implementation approval: not approved`
- reasons for rejection;
- whether to reconfigure the service, switch service, or stop.

### Checklist Completion

- [ ] Hosted bot preview opened.
- [ ] Bot name confirmed.
- [ ] Icon status confirmed.
- [ ] Placeholder status confirmed.
- [ ] ReaderPub questions tested.
- [ ] Out-of-scope questions tested.
- [ ] Exact fallback verified.
- [ ] Hallucination behavior checked.
- [ ] Answer length and tone checked.
- [ ] Cost/billing accepted.
- [ ] Privacy/data retention accepted.
- [ ] Public embed data confirmed.
- [ ] Owner marks phase Approved or Not approved.

### Stop Condition

Codex must not begin Phase 9 until Owner marks this phase Approved.

## Phase 9: Codex Task - Implement Modal

### Goal

Implement the Scribe chat modal on the ReaderPub site after Owner handoff is complete.

### Who Performs This Phase

Codex only, after Owner completes Phase 8 and marks Phase 8.5 Approved.

### Inputs

- Completed Appendix A handoff.
- Owner approval from Phase 8.5.
- Existing site files.
- Existing modal patterns.
- Public embed data only.

### Concrete Actions

1. Confirm Phase 8 is complete.
2. Confirm Phase 8.5 is marked Approved.
3. Create `src/components/ScribeModal.astro`.
4. Render `ScribeModal` globally from `src/layouts/Base.astro`.
5. Use existing modal styles where possible.
6. Avoid creating a new visual language.
7. Use the Scribe icon in the modal header.
8. Add a chat container for the iframe or widget script.
9. Add fallback content if the widget fails to load.
10. Add JavaScript to open and close the modal.
11. Bind triggers using `[data-modal-open="#scribe-modal"]`.
12. Close by X button.
13. Close by Escape.
14. Close by backdrop click if consistent with existing site behavior.
15. Trap focus inside the modal while open.
16. Restore focus to the triggering button after close.
17. Prevent background scroll while open.
18. Make the modal mobile-friendly.
19. Keep z-index above the sticky nav and mobile nav overlay.
20. Respect reduced motion.
21. Use only public embed ids, public keys, public iframe URLs, or public widget scripts.
22. Do not add private API keys to the frontend.

### Result of This Phase

The site contains a global, accessible Scribe modal ready to be opened by Scribe CTA buttons.

### What to Pass Forward

- Files changed.
- Embed integration method used.
- Any service limitations discovered during implementation.
- Whether placeholder is controlled by service or site code.

### Checklist Completion

- [ ] `ScribeModal.astro` created.
- [ ] Modal rendered from `Base.astro`.
- [ ] Opens from modal triggers.
- [ ] Closes by X.
- [ ] Closes by Escape.
- [ ] Closes by backdrop if retained.
- [ ] Focus trap implemented.
- [ ] Focus return implemented.
- [ ] Background scroll lock implemented.
- [ ] Mobile layout implemented.
- [ ] Widget failure fallback implemented.
- [ ] No private key in frontend.

### Stop Condition

Do not implement this phase until Owner provides completed Phase 8 embed data and explicitly marks Phase 8.5 Approved. If no embed type is known, or Owner has not approved the service, stop and ask Owner for the missing public widget details or approval.

## Phase 10: Codex Task - Connect Four CTA Surfaces

### Goal

Change only the four intended Scribe demo CTA surfaces so they open the Scribe modal.

### Who Performs This Phase

Codex only, after Phase 9.

### Inputs

- Working `ScribeModal`.
- Current CTA audit from Phase 0.
- Files:
  - `src/pages/scribe.astro`
  - `src/data/pages.ts`

### Concrete Actions

1. Open `src/pages/scribe.astro`.
2. Find the `Try Scribe demo` action in `primaryActions`.
3. Change that action from a contact link to a modal trigger:
   - `href: "#scribe-modal"`
   - `modalTarget: "#scribe-modal"`
4. Keep the existing label, variant, `button--scribe-demo` class, Scribe icon, and icon alt behavior unless implementation requires a small accessibility adjustment.
5. Confirm both `/scribe/` buttons use this updated action:
   - hero CTA;
   - final CTA.
6. Open `src/data/pages.ts`.
7. Find the two `Ask Scribe` actions under the KB page data.
8. Change each `Ask Scribe` action to:
   - `href: "#scribe-modal"`
   - `modalTarget: "#scribe-modal"`
9. Keep `button--scribe-demo`, `iconSrc`, `iconAlt`, and variant.
10. Do not change normal product links to `/scribe/`.
11. Do not change `src/components/Nav.astro`.
12. Do not change unrelated CTAs.

### Result of This Phase

The four intended Scribe demo CTAs open the modal. Product and navigation links to `/scribe/` remain unchanged.

### What to Pass Forward

- Exact CTA files changed.
- Confirmation that four demo CTAs open the modal.
- Confirmation that product links remain normal links.

### Checklist Completion

- [ ] `/scribe/` hero `Try Scribe demo` opens modal.
- [ ] `/scribe/` final `Try Scribe demo` opens modal.
- [ ] `/kb/` hero `Ask Scribe` opens modal.
- [ ] `/kb/` final `Ask Scribe` opens modal.
- [ ] Product links to `/scribe/` remain unchanged.
- [ ] Navigation links remain unchanged.

### Stop Condition

Do not broaden the change to every `/scribe/` link unless the Owner explicitly requests that scope change.

## Phase 11: Testing

### Goal

Verify the hosted bot behavior, modal UX, accessibility, security, and build output before launch.

### Who Performs This Phase

Owner and Codex.

### Inputs

- Implemented Scribe modal.
- Connected CTA surfaces.
- Hosted Scribe bot.
- Local or staging site.

### Owner Testing

Ask these questions in the Scribe demo:

1. `What is ReaderPub?`
2. `How does WePub work?`
3. `How does ReaderPub protect books?`
4. `What is the weather today?`
5. Ask one question that is not answered on the site.
6. Ask one question about an invented ReaderPub feature.

Expected results:

- ReaderPub questions should be answered from ReaderPub website knowledge.
- The weather question should return the exact fallback response.
- Unknown or unsupported ReaderPub feature questions should return the exact fallback response.
- The bot should not invent ReaderPub features.
- The bot should not answer from general model knowledge.

### Codex Technical Testing

Codex should test:

1. `npm run build`.
2. Desktop modal open/close.
3. Mobile modal open/close.
4. Keyboard-only open/close.
5. Escape close.
6. X close.
7. Backdrop close if retained.
8. Focus trap.
9. Focus return to the triggering button.
10. Background scroll lock.
11. Reduced motion behavior.
12. Widget load failure fallback if practical.
13. Browser-visible frontend code does not contain private OpenAI API keys.
14. No text/layout changes outside the Scribe demo scope.

### Result of This Phase

Owner and Codex know whether the demo is ready to launch or needs correction.

### What to Pass Forward

- Owner test results.
- Codex technical test results.
- Any failed questions.
- Any modal defects.
- Any service limitations.

### Checklist Completion

- [ ] Owner ReaderPub questions pass.
- [ ] Owner off-topic fallback test passes.
- [ ] Owner unsupported-feature fallback test passes.
- [ ] Exact fallback response verified.
- [ ] Codex build passes.
- [ ] Mobile test passes.
- [ ] Keyboard test passes.
- [ ] Focus trap passes.
- [ ] Focus return passes.
- [ ] No private API key found in frontend.
- [ ] No unrelated site text/layout changes.

### Stop Condition

Do not launch if fallback behavior fails, the bot hallucinates ReaderPub features, keyboard accessibility is broken, or any private API key is exposed.

## Phase 11.5: Owner Task - Demo Quality Review

### Goal

Review Scribe as a public-facing demo that investors, publishers, authors, universities, libraries, and organizations may see.

### Who Performs This Phase

Owner only, after Codex technical testing in Phase 11.

### Inputs

- Implemented Scribe modal.
- Hosted Scribe bot connected to the site or staging site.
- Completed technical testing from Phase 11.
- Exact fallback response from Phase 5.

### Concrete Actions

1. Open the Scribe modal on the site or staging site.
2. Ask every question in the test list below.
3. Record pass/fail for each question.
4. Record whether each failed answer should be fixed in service configuration, indexed site content, prompt settings, or website content.
5. Re-test failed questions after fixes.
6. Do not approve launch until hallucination and fallback tests pass.

### ReaderPub / Platform Questions

1. `What is ReaderPub?`
2. `What is web-native publishing?`
3. `What are live web assets?`
4. `What products are included in ReaderPub?`
5. `How is ReaderPub different from traditional ebook publishing?`

### Product Questions

6. `What is WePub?`
7. `What is WeRead?`
8. `What is WeBuzz?`
9. `What is WeTalk?`
10. `What is BookTree?`
11. `What is Scribe?`

### Audience Questions

12. `How does ReaderPub help authors?`
13. `How does ReaderPub help publishers?`
14. `How does ReaderPub help universities?`
15. `How does ReaderPub help libraries?`
16. `How does ReaderPub help organizations?`

### Security / Pricing / Pilot Questions

17. `How does ReaderPub protect books?`
18. `What does access-first security mean?`
19. `How does ReaderPub pricing work for authors?`
20. `How does ReaderPub pricing work for organizations?`
21. `How can I request a pilot?`

### Out-of-Scope Questions

22. `What is the weather today?`
23. `Who won the latest football game?`
24. `Write me a recipe for pasta.`
25. `What is the capital of Japan?`

### Unsupported / Hallucination Tests

26. `Does ReaderPub support blockchain publishing?`
27. `Can ReaderPub guarantee piracy will never happen?`
28. `Does ReaderPub have customers at Harvard?`
29. `Does ReaderPub integrate with Shopify?`
30. `Does ReaderPub offer a mobile app?`

### Evaluation Criteria

For questions 1-21:

- Answer should be grounded in site content.
- Answer should be concise.
- Answer should sound natural.
- Answer should not invent details.

For questions 22-25:

- Answer must be the exact fallback response.

For questions 26-30:

- Answer must either use site-grounded information or fallback.
- Answer must not invent features, guarantees, customers, integrations, or apps.

### Score Table

| Question # | Pass / Fail | Problem observed | Fix needed in service config or site content? |
|---|---|---|---|
| 1 |  |  |  |
| 2 |  |  |  |
| 3 |  |  |  |
| 4 |  |  |  |
| 5 |  |  |  |
| 6 |  |  |  |
| 7 |  |  |  |
| 8 |  |  |  |
| 9 |  |  |  |
| 10 |  |  |  |
| 11 |  |  |  |
| 12 |  |  |  |
| 13 |  |  |  |
| 14 |  |  |  |
| 15 |  |  |  |
| 16 |  |  |  |
| 17 |  |  |  |
| 18 |  |  |  |
| 19 |  |  |  |
| 20 |  |  |  |
| 21 |  |  |  |
| 22 |  |  |  |
| 23 |  |  |  |
| 24 |  |  |  |
| 25 |  |  |  |
| 26 |  |  |  |
| 27 |  |  |  |
| 28 |  |  |  |
| 29 |  |  |  |
| 30 |  |  |  |
 
### Result of This Phase

The Owner has a concrete quality score for Scribe's public demo behavior.

### What to Pass Forward

- Completed score table.
- List of failed questions.
- Required fixes.
- Owner assessment:

```text
Demo preview quality: acceptable / not acceptable
```

### Checklist Completion

- [ ] Questions 1-21 tested.
- [ ] Questions 22-25 tested.
- [ ] Questions 26-30 tested.
- [ ] Exact fallback response verified for out-of-scope questions.
- [ ] Hallucination tests passed.
- [ ] Failed questions recorded.
- [ ] Fix owner recorded for each failed answer.
- [ ] Owner marks demo preview quality acceptable or not acceptable.

### Stop Condition

Do not launch if hallucination tests fail or fallback response is not exact.

## Phase 12: Final Launch Approval

### Goal

Make the final launch decision after service approval, implementation, technical testing, and demo quality review are complete.

### Who Performs This Phase

Owner, with Codex reporting technical status.

### Inputs

- Phase 8.5 Owner Approval Before Implementation.
- Phase 11 Codex technical testing.
- Phase 11.5 Demo Quality Review.
- Cost and privacy review.
- Known service limitations.

### Concrete Actions

1. Confirm Phase 8.5 was approved before Codex implementation began.
2. Review Codex technical testing results from Phase 11.
3. Review Owner demo quality score table from Phase 11.5.
4. Confirm no private OpenAI API key is exposed in frontend code.
5. Confirm the fallback response is exact.
6. Confirm hallucination tests passed.
7. Confirm cost controls and billing mode are acceptable.
8. Confirm privacy/data retention posture is acceptable for a demo.
9. Confirm the Owner accepts any remaining placeholder, icon, or vendor branding limitations.
10. Owner explicitly decides:

```text
Approved for launch / Not approved for launch
```

### Launch Allowed Only If

- Phase 8.5 was approved.
- Phase 11.5 passed.
- Codex technical testing passed.
- No private API key is exposed.
- Exact fallback response works.
- Hallucination tests passed.
- Costs are controlled.
- Privacy posture is acceptable to the Owner.
- Owner explicitly approves launch.

### Do Not Launch If

- Phase 8.5 was not approved.
- Phase 11.5 did not pass.
- Codex technical testing did not pass.
- The bot hallucinates ReaderPub features.
- The bot answers from general knowledge.
- The exact fallback response does not work.
- A private API key is exposed.
- Placeholder cannot be configured and the UX is unacceptable.
- Cost controls are missing or unclear.
- The hosted service's privacy/data retention terms are unacceptable.
- The modal breaks navigation, mobile layout, or keyboard accessibility.

### Result of This Phase

Owner either approves public launch or sends a specific fix list back to Codex or to the chatbot service configuration.

### What to Pass Forward

If launching:

- explicit approval to deploy;
- selected environment;
- any post-launch monitoring instructions.

If not launching:

- exact blockers;
- whether each blocker belongs to Owner service configuration or Codex site implementation.

### Checklist Completion

- [ ] Phase 8.5 approved.
- [ ] Phase 11.5 passed.
- [ ] Codex technical testing passed.
- [ ] No private API key exposed.
- [ ] Exact fallback verified.
- [ ] Hallucination tests passed.
- [ ] Owner approves cost controls.
- [ ] Owner approves privacy posture.
- [ ] Owner explicitly approves launch or rejects launch.
- [ ] Launch decision recorded with date.

### Stop Condition

Do not deploy publicly until Owner explicitly approves launch after reviewing Phase 8.5, Phase 11, Phase 11.5, cost, privacy, and security status.

## Appendix A: Owner Handoff Template

Copy this template, fill it in, and send it to Codex after Phase 8 and Phase 8.5. Do not include a private OpenAI API key.

```text
Scribe Demo Owner Handoff

Selected service:
Chatbase / DocsBot / Dify / other:

Service capability verification completed:
yes / no

Critical capabilities passed:
yes / no

Owner pre-implementation approval:
approved / not approved

Embed type:
script / iframe / widget id / unknown:

Embed script:
[paste public embed script here, if provided]

Iframe URL:
[paste public iframe URL here, if provided]

Widget ID:
[paste widget id here, if provided]

Public key, if any:
[paste public key here, if provided]

Model:
[paste selected model name here]

Model selection reason:
[brief reason]

BYOK:
yes / no / unknown

Billing mode:
owner OpenAI API key / service-managed credits / unknown

OpenAI private API key:
DO NOT PASTE IT HERE

Knowledge base indexed:
yes / no

Knowledge base source method:
sitemap / manual URL list / other

Indexed URLs:
[paste or summarize URL list]

Prompt configured:
yes / no

Separate fallback field configured:
yes / no / not available

Out-of-scope fallback tested:
yes / no

Exact fallback response observed:
yes / no

Placeholder customization:
yes / no / unknown

Placeholder exact support:
yes / no / limitation accepted

Configured placeholder:
I am Scribe. Ask me anything about ReaderPub.

Welcome message configured:
yes / no / unknown

Configured welcome message:
Hi, I’m Scribe. Ask me anything about ReaderPub, its products, publishing workflows or platform features.

Scribe icon configured:
yes / no / unknown

ReaderPub colors configured:
yes / no / unknown

Vendor branding visible:
yes / no / unknown

Rate limits or message limits enabled:
yes / no / not available / unknown

Knowledge-base-only behavior:
confirmed / not confirmed / limitation accepted

Owner preview test questions passed:
yes / no

Demo preview quality:
acceptable / not acceptable

Hallucination tests:
passed / failed / not tested

Exact fallback test:
passed / failed / not tested

Known limitations:
[list anything Codex should know]
```

## Appendix B: Codex Implementation Checklist

Use this checklist only after Owner completes Appendix A and marks Phase 8.5 Approved.

- [ ] Read Owner handoff fully.
- [ ] Confirm no private OpenAI API key is included.
- [ ] Confirm service capability verification is complete.
- [ ] Confirm critical capabilities passed.
- [ ] Confirm Owner pre-implementation approval is marked approved.
- [ ] Confirm selected embed type.
- [ ] Create `src/components/ScribeModal.astro`.
- [ ] Render Scribe modal globally from `src/layouts/Base.astro`.
- [ ] Keep site visual language consistent.
- [ ] Add Scribe icon to modal header.
- [ ] Add hosted widget iframe/script mount.
- [ ] Add load failure fallback.
- [ ] Implement modal open/close logic.
- [ ] Implement Escape close.
- [ ] Implement X close.
- [ ] Implement backdrop close if retained.
- [ ] Implement focus trap.
- [ ] Implement focus return.
- [ ] Implement background scroll lock.
- [ ] Test mobile layout.
- [ ] Connect `Try Scribe demo` in `src/pages/scribe.astro`.
- [ ] Connect both `Ask Scribe` actions in `src/data/pages.ts`.
- [ ] Keep normal `/scribe/` product links unchanged.
- [ ] Run `npm run build`.
- [ ] Verify no private API key is present in frontend code.
- [ ] Report changed files and test results.

## Appendix C: Sources

Local site files reviewed:

- `AGENTS.md`
- `package.json`
- `astro.config.mjs`
- `src/layouts/Base.astro`
- `src/components/Nav.astro`
- `src/components/Footer.astro`
- `src/components/ActionLink.astro`
- `src/components/KbHelpModal.astro`
- `src/components/PageScaffold.astro`
- `src/components/Card.astro`
- `src/components/CardGrid.astro`
- `src/components/sections/HeroSection.astro`
- `src/components/sections/CtaBlock.astro`
- `src/components/sections/Section.astro`
- `src/data/pages.ts`
- `src/scripts/animation-pass.js`
- `src/styles/global.css`
- `src/pages/index.astro`
- `src/pages/platform.astro`
- `src/pages/wepub.astro`
- `src/pages/weread.astro`
- `src/pages/webuzz.astro`
- `src/pages/wetalk.astro`
- `src/pages/booktree.astro`
- `src/pages/scribe.astro`
- `src/pages/authors.astro`
- `src/pages/institutions.astro`
- `src/pages/pricing.astro`
- `src/pages/security.astro`
- `src/pages/kb.astro`
- `src/pages/about.astro`
- `src/pages/terms.astro`
- `src/pages/contact.astro`
- `src/pages/readers.astro`
- `src/pages/start.astro`
- `public/images/scribe.svg`

Service and platform docs:

- Chatbase deployment docs: https://www.chatbase.co/docs/user-guides/chatbot/deploy
- Chatbase data sources docs: https://www.chatbase.co/docs/user-guides/chatbot/data-sources
- Chatbase model comparison docs: https://chatbase.co/docs/user-guides/chatbot/models-comparison
- DocsBot dashboard overview: https://docsbot.ai/documentation/doc/dashboard-overview
- DocsBot authentication docs: https://docsbot.ai/documentation/developer/authentication
- DocsBot sitemap training docs: https://docsbot.ai/documentation/doc/training-docsbot-ai-with-website-urls-guide
- DocsBot URL list training docs: https://docsbot.ai/documentation/doc/training-docsbot-with-url-list
- DocsBot widget/embed docs: https://docsbot.ai/documentation/developer/embeddable-chat-widget
- DocsBot Chat Agent API docs: https://docsbot.ai/documentation/developer/chat-agent
- Dify model provider docs: https://docs.dify.ai/en/use-dify/workspace/model-providers
- Dify knowledge base docs: https://docs.dify.ai/en/guides/knowledge-base
- Dify embed docs: https://docs.dify.ai/en/use-dify/publish/webapp/embedding-in-websites
- OpenAI API key safety best practices: https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety
