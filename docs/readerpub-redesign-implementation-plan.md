**1. Executive Summary**
Редизайн ReaderPub должен выполняться как серия маленьких, проверяемых, коммитоподобных инкрементов. Цель: светлый современный PaaS/SaaS-сайт для publishing infrastructure, без dark mode, без мультяшных книжных иллюстраций, без generic startup blobs, без переписывания текстов. Каждый следующий шаг запускается только отдельной командой пользователя.

Ключевая логика реализации: редизайн выполняется не постранично, а системно. Сначала создаются и утверждаются общие дизайн-уровни, которые применяются ко всем релевантным страницам: глобальная дизайн-система, компоненты, mockup/placeholder infrastructure, hero system, problem sections, comparison sections, workflow sections, product/feature sections, business/pricing sections, supporting/docs/forms/legal sections, CTA sections и финальный QA. Такой порядок снижает риск, что поздние страницы потребуют переделки уже готовых ранних страниц.

Page-by-page раздел в этом документе описывает финальное состояние страниц, но не порядок реализации. Реальный порядок работы задается level-first Implementation Roadmap и level-based Design Review Gates.

После этой переработки документ должен использоваться не как обычный список задач, а как Design System Implementation Specification: он фиксирует phases, subphases, Review Gates, Mini Reviews, locked baselines, locked scope, unlocked assets, component lifecycle и правила change request для длительной разработки без потери единого визуального языка.

**2. Non-Negotiable Constraints**
- Не менять тексты, CTA, URL, routes, информационную архитектуру.
- Не удалять и не объединять страницы.
- Не генерировать большие картинки.
- Большие visuals только через semantic placeholder и русское ТЗ для пользователя.
- Дизайн светлый: white/off-white/light gray/light teal/light blue-gray.
- Убрать gradients из nav/cards/dropdowns/buttons/section backgrounds.
- Не использовать cartoon people, детские стопки книг, blob-фоны, random 3D shapes.
- Не создавать dark mode как основной стиль.
- Не превращать сайт в generic SaaS без publishing identity.
- Не создавать локальные хаотичные стили вместо утвержденных системных variants.
- Каждый level-based шаг должен сохранять результат предыдущих утвержденных уровней.
- После утверждения Review Gate соответствующий уровень становится locked baseline.

**3. Current Site Audit**
Текущие страницы: `index`, `platform`, `weread`, `wepub`, `webuzz`, `wetalk`, `booktree`, `scribe`, `authors`, `institutions`, `security`, `pricing`, `about`, `contact`, `kb`, `terms`, redirects `readers`, `start`.

Текущие компоненты: `Nav`, `Footer`, `HeroSection`, `Section`, `CtaBlock`, `Card`, `CardGrid`, `ActionLink`, `PageScaffold`, `SpecCardsSection`, `SectionIcon`, `KbHelpModal`.

Главные проблемы: serif-заголовки, soft gradients, одинаковые card grids, мультяшные hero assets, мало product UI, повторяющиеся hero-композиции, общий reveal-motion без смысловой дифференциации.

Системная проблема текущего подхода: визуальные решения повторяются постранично, а не как управляемые уровни дизайн-системы. Из-за этого поздние изменения в hero, cards, sections или mockups могут требовать возврата к уже готовым страницам. Новый roadmap исправляет это: сначала утверждается уровень, затем этот уровень становится locked baseline для следующих уровней.

**4. Target Visual Language**
Сайт должен транслировать: web-native publishing platform, enterprise-ready PaaS, технологическую инфраструктуру для авторов, издателей, библиотек, университетов, institutional collections и content platforms.

Использовать мотивы: publication dashboard, reader activity stream, web-native reader, access control, knowledge graph, discussion threads, publishing workflow, usage analytics, platform modules, institutional collections, rights/access/security, book as web asset, distribution workflow.

Не использовать: мультяшных людей, большие стопки книг, декоративные картинки без интерфейса, generic AI glow, blob backgrounds, dark cyberpunk, мягкий устаревший книжный лендинг.

Страницы должны отличаться друг от друга через утвержденные variants и signature blocks, а не через случайные локальные стили.

**5. Design Tokens**
Типографика: Manrope для всего сайта. Альтернатива: Manrope headings + Inter body. Serif убрать.

Шкала:
- Hero: 72-88 desktop / 42-52 mobile, weight 750-800, line-height 0.95-1.02, letter-spacing до -0.04em.
- H1: 56-68 / 38-46, weight 750, line-height 1.02.
- H2: 40-48 / 30-36, weight 720.
- H3: 24-30 / 22-26.
- Body large: 19-21 / 17-18.
- Body: 16.
- Small/caption: 12-14.
- Button/nav: 14-15, weight 600-700.

Цвета: background `#ffffff`, page `#f8fafc`, surface `#ffffff`, subtle `#f1f5f9`, light teal `#eefbf8`, light blue-gray `#eef4ff`, text `#0f172a`, secondary `#334155`, muted `#64748b`, border `#dbe3ea`, teal `#008f80`, blue `#2563eb`, focus `rgba(0,143,128,.32)`.

Spacing: `4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 120 / 160`. Sections 96-120 desktop, 48-64 mobile. Card padding 24-32. Grid gap 20-24.

Radius: small 8, medium 12, large 20, xlarge 28, pill 999.

Shadows: default none; card hover subtle; mockup elevated; hero floating card. No heavy permanent shadows.

Borders: 1px cards, hairline separators, teal/slate hover, visible focus ring.

Containers: standard 1180-1240, narrow 760-840, wide mockup 1280-1360, legal/docs 760-820.

Design tokens утверждаются на Review Gate 1 и после этого становятся locked baseline.

**6. Card System**
Feature Card: white, 1px border, icon top/row, title/text, hover lift.  
Product Card: module badge, title, text, optional CTA, border glow.  
Metric Card: large number + label + explanation, count-up optional.  
Workflow Step Card: step chip, title, text, connector.  
Comparison Panel: two panels old/new, lists, no gradient.  
Integration Tile: compact icon + label + status.  
Plan Card: pricing hierarchy, no gradients, recommended via badge/border.  
Proof Card: quote/stat/source if existing content permits.  
Documentation Card: KB category/FAQ preview, compact.

Rule: no gradient cards, no big colored fills, max 1-2 card types per section. Base card system утверждается на Review Gate 1. Section-specific card usage проверяется на соответствующих gates.

**7. Section System**
Types:
1. White section: default content.
2. Subtle gray panel: problem/explanation.
3. Technical grid background: architecture/workflows.
4. Product mockup section: text + UI visual.
5. Comparison section: old/new model.
6. Workflow section: process steps.
7. Metrics strip: business/security/pricing proof.
8. Audience/product split: audience + product relation.
9. Minimal legal/docs: terms/KB.
10. CTA section: final conversion.

Rule: two neighboring sections cannot share identical pattern unless FAQ/table/legal. Section base and variants утверждаются на Review Gate 1. New section variants after approval require change request.

**8. Hero System**
Dashboard Hero: Home, Authors, Institutions. Text 40-45%, dashboard 55-60%, floating metric cards.  
Architecture Hero: Platform. Centered text, wide diagram below.  
Product UI Hero: WeRead, WePub, WeBuzz, WeTalk, Security. Text left, UI mockup right.  
Graph Hero: BookTree. Graph visual dominant.  
Assistant/Product Context Hero: Scribe. Text + contextual assistant workspace.  
Minimal Docs Hero: KB, Terms. Narrow, no large visual.  
Conversion Hero: Contact. Text + onboarding workflow.  
Pricing Hero: minimal SaaS pricing introduction with optional billing mini-panel.  
About Hero: infrastructure narrative, optional roadmap/principles visual.

Запрет: не повторять одинаковый text-left/image-right hero на всех страницах; не использовать cartoon hero images. Hero system утверждается на Review Gate 3 и после этого становится locked baseline.

**9. Product Mockup System**
Новые концепты: `PlaceholderVisual`, `MockupFrame`, `BrowserFrame`, `DashboardFrame`, `MobilePreview`, `FloatingMetricCard`, `StatusChip`, `SideNav`, `MiniChart`, `ActivityStream`, `BookCard`, `DiscussionThread`, `AccessPolicyPanel`, `KnowledgeGraphPanel`.

Все mockups должны выглядеть как части одной продуктовой экосистемы. Реальные большие visuals не создаются Codex. Если asset еще не готов, Codex ставит semantic placeholder с понятным русским описанием, metadata и стабильным aspect ratio.

Mockup/placeholder infrastructure утверждается на Review Gate 2 и после этого становится locked baseline.

**10. UI Grammar**
Mockup-интерфейсы: светлые surfaces, одинаковые toolbar/header, tabs, chips, cards, sidebars, table rows, charts, avatars-initials, hover/focus. Акценты: teal/blue/slate. Данные: titles, metadata, access roles, reader events, fragments, collections, analytics. Не использовать fake dark dashboards как основной visual.

UI grammar применяется через системные components и variants. Если на позднем этапе нужен новый UI pattern, Codex должен сначала определить, это локальное исключение или системная необходимость. Системная необходимость требует change request.

**11. Motion Language**
Motion subtle, duration 120-600ms, diagrams до 1200ms, easing `cubic-bezier(.22,1,.36,1)`, reduced motion обязательно.

Паттерны: page entrance, hero visual entrance, staggered card reveal, hover lift, border glow, floating metric cards, diagram line draw, workflow connector reveal, metric count-up, dropdown fade/scale, mockup parallax, tabs transition, FAQ accordion, mobile menu transition.

Motion base утверждается на Review Gate 1. Специфические motion patterns проверяются на gates соответствующих секций. Не использовать одну и ту же анимацию как единственный прием на всех страницах.

**12. Variety System**
Signature blocks:
Home — platform command center.  
Platform — architecture map.  
WeRead — reader UI.  
WePub — publishing console.  
WeBuzz — discussion feed.  
WeTalk — private workspace.  
BookTree — knowledge graph.  
Scribe — assistant panel.  
Authors — business dashboard.  
Institutions — collection console.  
Security — access-control dashboard.  
Pricing — SaaS pricing table and optional billing panel.  
About — roadmap/principles.  
Contact — onboarding workflow.  
KB — help center search.  
Terms — legal layout.

Variety достигается через утвержденные level-based patterns: hero variants, placeholder slots, section variants, comparison variants, workflow variants, product/feature variants и CTA variants.

**13. Операционный протокол пошаговой реализации**
- Работать строго по одному нумерованному roadmap-шагу за раз.
- Один шаг = одно сообщение пользователя = один завершенный инкремент.
- Реализация идет по уровням дизайн-системы, а не по страницам.
- Каждая большая phase делится на subphases: framework, application, consistency/polish или эквивалентные внутренние этапы.
- Subphase не заменяет roadmap-шаги; она группирует несколько маленьких шагов в управляемый блок.
- После каждой subphase Codex проводит Mini Review без обязательного подтверждения пользователя.
- Один roadmap-шаг может затрагивать несколько страниц, если это один и тот же тип секции или один и тот же компонентный уровень.
- Перед началом шага сообщать: номер шага, phase, subphase, что будет сделано, страницы/файлы/компоненты, что не меняется, что должен подготовить пользователь.
- Не начинать следующий шаг без прямой команды пользователя.
- Каждый шаг сохраняет состояние предыдущих шагов.
- Codex обязан сохранять согласованность уже сделанных уровней.
- Если при работе над новым уровнем возникает необходимость изменить ранее утвержденный общий компонент, Codex обязан остановиться, объяснить причину изменения и запросить подтверждение пользователя.
- Нельзя создавать альтернативные версии уже утвержденных общих компонентов без веской причины.
- После утверждения уровня он считается locked baseline.
- После каждого Review Gate должен быть зафиксирован Locked Scope: что именно теперь заморожено.
- После каждого Review Gate должен быть зафиксирован список Unlocked Assets: что можно заменять без change request.
- Изменения locked baseline допускаются только через отдельный change request.
- Изменения locked scope допускаются только через отдельный change request.
- Unlocked assets можно заменять без change request только если не меняются aspect ratio, layout slot, размер, responsive behavior, компонентная структура и смысл текста.
- Не переписывать уже переделанные файлы с нуля без необходимости.
- Не менять тексты, CTA, routes, структуру сайта.
- Если нужен visual asset, Codex не рисует его, а даёт русское ТЗ.
- После шага отчитываться: завершенный шаг, phase/subphase, измененные файлы, изменения, проверки, риски, следующий рекомендуемый шаг.

Locked baseline — утвержденный пользователем уровень дизайн-системы или тип секций, который нельзя менять в следующих шагах без явного подтверждения пользователя.

Locked scope — конкретные части утвержденного уровня, которые заморожены после Review Gate: layout, spacing, typography, responsive rules, component API, variants, animations, CTA placement, frame behavior, interaction rules или другие явно перечисленные элементы.

Unlocked assets — визуальные assets внутри уже утвержденного слота, которые можно заменить без change request, если не меняются aspect ratio, slot, dimensions, layout, responsive rules, component structure, typography, CTA placement, animation pattern и meaning. Примеры: dashboard screenshot inside approved frame, architecture diagram image inside approved slot, reader UI screenshot inside approved BrowserFrame.

Mini Review — короткая самостоятельная проверка Codex после subphase. Она не требует подтверждения пользователя и не открывает следующую phase автоматически. Review Gate по-прежнему требует обязательного подтверждения пользователя.

Формат задачи пользователю для visual assets:
- Тип asset:
- Где используется:
- Размер / aspect ratio:
- Стиль:
- Композиция:
- Что должно быть внутри:
- Цветовая гамма:
- Что нельзя включать:
- Примечания для анимации:

**14. Change Request Rules**
Если после утверждения Review Gate нужно изменить locked baseline:
- Codex должен остановиться.
- Codex должен объяснить, какой locked baseline затрагивается.
- Codex должен объяснить, какой locked scope затрагивается.
- Codex должен объяснить, почему изменение необходимо.
- Codex должен перечислить страницы и компоненты, которые будут затронуты.
- Codex должен предложить минимальный безопасный патч.
- Codex должен дождаться подтверждения пользователя.
- После патча Codex должен повторно провести соответствующий Review Gate или mini-review.

Запрет:
- Нельзя тихо менять locked component.
- Нельзя создавать fork-компонент.
- Нельзя исправлять проблему только на одной странице, если она системная.
- Нельзя копировать CSS локально, если это изменение должно быть частью общей системы.
- Нельзя обходить locked baseline ради скорости.
- Нельзя объявлять локальное исключение без объяснения последствий.

Change request report должен содержать:
- Затронутый locked baseline.
- Затронутый locked scope.
- Причина изменения.
- Затронутые pages/components.
- Минимальный patch scope.
- Риски.
- Как будет проверяться результат.
- Нужно ли повторять полный Review Gate или достаточно mini-review.

**15. No Silent Drift**
No Silent Drift — обязательное правило против постепенного незаметного распада дизайн-системы. Codex запрещается менять утвержденную систему "по ходу дела" без явного объявления, даже если локальная правка кажется визуально лучше.

Запрещается:
- постепенно менять дизайн-систему без объявления;
- менять Hero только потому что "так лучше";
- менять Card style локально;
- менять Section spacing только на одной странице;
- менять animation pattern только на одной странице;
- менять Button/Icon/Dropdown style локально;
- добавлять локальный CSS для проблемы, которая должна решаться на уровне общего компонента;
- создавать новый visual variant, если существующий approved variant можно использовать без потери смысла;
- исправлять systemic issue page-level патчем.

Если Codex видит, что локальная проблема на странице указывает на системную проблему:
- остановиться;
- назвать affected locked baseline или shared component;
- объяснить, почему локальный фикс неправильный;
- предложить change request;
- дождаться подтверждения пользователя.

**16. Mini Reviews**
Mini Review выполняется после каждой subphase. Это короткая внутренняя проверка Codex, которая помогает не накапливать ошибки между маленькими шагами и большим Review Gate.

Mini Review не требует подтверждения пользователя. Codex может продолжить следующую subphase только если пользователь дал следующую команду, но сам Mini Review не является формальным approval.

Mini Review должен проверить:
- subphase выполнена в пределах scope;
- locked baselines не затронуты без change request;
- locked scope предыдущих gates не нарушен;
- no silent drift;
- content/CTA/routes не изменены;
- component usage остается системным;
- temporary placeholders не выглядят как финальные плохие картинки;
- responsive behavior не ухудшился очевидно;
- нет локальных CSS-костылей для системных проблем.

Формат Mini Review:
- Subphase:
- Roadmap steps completed:
- Files touched:
- Locked baselines affected: no / change request needed.
- Silent drift check: passed / issue found.
- Content invariance: passed.
- Responsive risk:
- Notes before next subphase:

**17. Page-by-Page Redesign Plan**
Этот раздел описывает финальное состояние каждой страницы. Он не определяет порядок реализации. Порядок реализации задается level-first roadmap.

Home:
- Final Hero Variant: Dashboard Hero.
- Final Placeholder: `home-platform-command-center`.
- Problem Variant: challenge matrix.
- Comparison Variant: old/new platform model.
- Workflow Variant: web asset process.
- Product Variant: product module map.
- Business Variant: none.
- CTA Variant: main product-led CTA.
- Participates In Phases: 4, 5, 6, 7, 8, 11, 12.
- Reviewed At Gates: 3, 4, 5, 6, 7, 10, 11.
- Restrictions: headline, body copy, CTA labels, routes unchanged.

Platform:
- Final Hero Variant: Architecture Hero.
- Final Placeholder: `platform-architecture-map`.
- Problem Variant: fragmentation matrix.
- Comparison Variant: old/new platform comparison.
- Workflow Variant: integration/distribution workflow.
- Product Variant: product modules.
- Business Variant: none.
- CTA Variant: platform CTA.
- Participates In Phases: 4, 5, 6, 7, 8, 11, 12.
- Reviewed At Gates: 3, 4, 5, 6, 7, 10, 11.
- Restrictions: platform narrative, module names, navigation structure unchanged.

WeRead:
- Final Hero Variant: Product UI Hero.
- Final Placeholder: `weread-browser-reader-ui`.
- Problem Variant: reading problem sections.
- Comparison Variant: none unless existing content requires.
- Workflow Variant: active reading workflow.
- Product Variant: reconnect/product section.
- Business Variant: none.
- CTA Variant: product CTA.
- Participates In Phases: 4, 5, 7, 8, 11, 12.
- Reviewed At Gates: 3, 4, 6, 7, 10, 11.
- Restrictions: current product copy, CTA text, URLs unchanged.

WePub:
- Final Hero Variant: Product UI Hero.
- Final Placeholder: `wepub-publishing-console`.
- Problem Variant: old-model/problem section.
- Comparison Variant: old/new publishing model.
- Workflow Variant: manuscript-to-live workflow.
- Product Variant: publishing console/product workflow support.
- Business Variant: economics metrics.
- CTA Variant: publisher/product CTA.
- Participates In Phases: 4, 5, 6, 7, 9, 11, 12.
- Reviewed At Gates: 3, 4, 5, 6, 8, 10, 11.
- Restrictions: pricing/economics claims, labels, CTA text unchanged.

WeBuzz:
- Final Hero Variant: Product UI Hero.
- Final Placeholder: `webuzz-book-discussion-feed`.
- Problem Variant: fragmented discussion section.
- Comparison Variant: media/book discussion comparison if existing content supports.
- Workflow Variant: none unless existing section requires.
- Product Variant: discussion tabs/signature block.
- Business Variant: none.
- CTA Variant: discussion/product CTA.
- Participates In Phases: 4, 5, 8, 11, 12.
- Reviewed At Gates: 3, 4, 7, 10, 11.
- Restrictions: product positioning and CTA copy unchanged.

WeTalk:
- Final Hero Variant: Product UI Hero.
- Final Placeholder: `wetalk-private-workspace`.
- Problem Variant: private/institutional fragmentation matrix.
- Comparison Variant: none unless existing content requires.
- Workflow Variant: controlled discussion lifecycle.
- Product Variant: access policy / workspace feature support.
- Business Variant: none.
- CTA Variant: private workspace CTA.
- Participates In Phases: 4, 5, 7, 11, 12.
- Reviewed At Gates: 3, 4, 6, 10, 11.
- Restrictions: private/institutional positioning unchanged.

BookTree:
- Final Hero Variant: Graph Hero.
- Final Placeholder: `booktree-knowledge-graph`.
- Problem Variant: knowledge fragmentation matrix.
- Comparison Variant: before/after comparison.
- Workflow Variant: knowledge flow.
- Product Variant: graph/detail panel support.
- Business Variant: none.
- CTA Variant: knowledge graph CTA.
- Participates In Phases: 4, 5, 6, 7, 11, 12.
- Reviewed At Gates: 3, 4, 5, 6, 10, 11.
- Restrictions: knowledge graph terminology and page route unchanged.

Scribe:
- Final Hero Variant: Assistant/Product Context Hero.
- Final Placeholder: `scribe-contextual-assistant`.
- Problem Variant: knowledge scattered section.
- Comparison Variant: none unless existing content requires.
- Workflow Variant: source/context/action flow.
- Product Variant: AI architecture section.
- Business Variant: none.
- CTA Variant: assistant/product CTA.
- Participates In Phases: 4, 5, 7, 8, 11, 12.
- Reviewed At Gates: 3, 4, 6, 7, 10, 11.
- Restrictions: AI assistant claims unchanged.

Authors:
- Final Hero Variant: Dashboard Hero.
- Final Placeholder: `authors-business-dashboard`.
- Problem Variant: author loss matrix.
- Comparison Variant: marketplace comparison.
- Workflow Variant: none unless existing content requires.
- Product Variant: audience/product relation.
- Business Variant: metrics/living audience.
- CTA Variant: author/business CTA.
- Participates In Phases: 4, 5, 6, 9, 11, 12.
- Reviewed At Gates: 3, 4, 5, 8, 10, 11.
- Restrictions: current author economics copy unchanged.

Institutions:
- Final Hero Variant: Dashboard Hero.
- Final Placeholder: `institutions-collection-console`.
- Problem Variant: institutional problem section.
- Comparison Variant: none unless existing content requires.
- Workflow Variant: collection workflow.
- Product Variant: collection/access product support.
- Business Variant: value/benefit sections.
- CTA Variant: institutional CTA.
- Participates In Phases: 4, 5, 7, 9, 11, 12.
- Reviewed At Gates: 3, 4, 6, 8, 10, 11.
- Restrictions: institution/library terminology unchanged.

Security:
- Final Hero Variant: Product UI Hero.
- Final Placeholder: `security-access-control-dashboard`.
- Problem Variant: security/access problem section.
- Comparison Variant: security comparison section.
- Workflow Variant: threat model flow.
- Product Variant: access/policy product support.
- Business Variant: protected distribution policy matrix.
- CTA Variant: security CTA.
- Participates In Phases: 4, 5, 6, 7, 9, 11, 12.
- Reviewed At Gates: 3, 4, 5, 6, 8, 10, 11.
- Restrictions: security claims, access language, legal/security implications unchanged.

Pricing:
- Final Hero Variant: Pricing Hero / Minimal SaaS Hero.
- Final Placeholder: `pricing-billing-panel-optional`.
- Problem Variant: pricing/economics problem framing.
- Comparison Variant: economics comparison.
- Workflow Variant: none.
- Product Variant: none.
- Business Variant: plan cards, institution plans/table.
- CTA Variant: pricing CTA.
- Participates In Phases: 4, 5, 6, 9, 11, 12.
- Reviewed At Gates: 3, 4, 5, 8, 10, 11.
- Restrictions: plan names, prices, billing text, CTA labels unchanged.

About:
- Final Hero Variant: About Hero / infrastructure narrative.
- Final Placeholder: `about-infrastructure-roadmap-optional`.
- Problem Variant: none.
- Comparison Variant: none.
- Workflow Variant: none unless roadmap visual is approved.
- Product Variant: principles/building sections.
- Business Variant: none.
- CTA Variant: about/supporting CTA.
- Participates In Phases: 4, 10, 11, 12.
- Reviewed At Gates: 3, 9, 10, 11.
- Restrictions: company story and existing claims unchanged.

Contact:
- Final Hero Variant: Conversion Hero.
- Final Placeholder: `contact-onboarding-workflow`.
- Problem Variant: none unless existing content requires.
- Comparison Variant: none.
- Workflow Variant: onboarding workflow.
- Product Variant: pathway cards.
- Business Variant: none.
- CTA Variant: contact/conversion CTA.
- Participates In Phases: 4, 7, 8, 10, 11, 12.
- Reviewed At Gates: 3, 6, 7, 9, 10, 11.
- Restrictions: form purpose, field meaning, CTA copy unchanged.

KB:
- Final Hero Variant: Minimal Docs Hero.
- Final Placeholder: `kb-help-center-search`.
- Problem Variant: none.
- Comparison Variant: none.
- Workflow Variant: none.
- Product Variant: category cards/sidebar.
- Business Variant: none.
- CTA Variant: docs/help CTA if existing.
- Participates In Phases: 4, 8, 10, 12.
- Reviewed At Gates: 3, 7, 9, 11.
- Restrictions: FAQ copy, categories, support semantics unchanged.

Terms:
- Final Hero Variant: Minimal Docs Hero.
- Final Placeholder: none.
- Problem Variant: none.
- Comparison Variant: none.
- Workflow Variant: none.
- Product Variant: none.
- Business Variant: none.
- CTA Variant: none unless currently present.
- Participates In Phases: 4, 10, 12.
- Reviewed At Gates: 3, 9, 11.
- Restrictions: legal text unchanged.

**18. Component Redesign Plan**
Nav/Header:
- Created/refactored in Phase 2.
- Applied across all pages from Phase 2 onward.
- Reviewed at Review Gate 1.
- Locked after Review Gate 1.
- Later changes require change request.

Footer:
- Created/refactored in Phase 2.
- Applied across all pages from Phase 2 onward.
- Reviewed at Review Gate 1.
- Locked after Review Gate 1.
- Later changes require change request.

Button/ActionLink:
- Created/refactored in Phase 2.
- Applied in Phases 4-11.
- Reviewed at Review Gate 1.
- Locked after Review Gate 1.
- CTA labels and hrefs cannot change.

Card:
- Base created in Phase 2.
- Variants applied in Phases 5-10.
- Base reviewed at Review Gate 1; section usage reviewed at Gates 4-9.
- Base locked after Review Gate 1.
- New card variant requires change request if it changes the shared system.

Section:
- Base and variants created in Phase 2.
- Applied in Phases 4-11.
- Reviewed at Review Gate 1.
- Locked after Review Gate 1.
- Section-specific layout can vary only through approved variants.

HeroSection:
- Created/refactored in Phase 4.
- Applied across all pages in Phase 4.
- Reviewed at Review Gate 3.
- Locked after Review Gate 3.
- Later changes require change request.

PlaceholderVisual:
- Created in Phase 3.
- Applied in Phases 4, 7, 8, 10 where visual assets are missing.
- Reviewed at Review Gate 2.
- Locked after Review Gate 2.
- Must include metadata, aspect ratio and Russian asset brief.

MockupFrame / BrowserFrame / DashboardFrame:
- Created in Phase 3.
- Applied in Hero, Product/Feature, Business and Supporting phases.
- Reviewed at Review Gate 2.
- Locked after Review Gate 2.
- Later changes require change request.

FloatingMetricCard / StatusChip:
- Created in Phase 3.
- Applied in Hero, Metrics, Pricing and Security/Business sections.
- Reviewed at Review Gate 2.
- Locked after Review Gate 2.

ActivityStream / BookCard / DiscussionThread:
- Created in Phase 3.
- Applied to Home, WeRead, WeBuzz and Scribe-related visuals.
- Reviewed at Review Gate 2.
- Locked after Review Gate 2.

AccessPolicyPanel / KnowledgeGraphPanel:
- Created in Phase 3.
- Applied to Security, WeTalk, BookTree and Platform visuals.
- Reviewed at Review Gate 2.
- Locked after Review Gate 2.

ProblemMatrix:
- Created/finalized in Phase 5.
- Applied across problem/challenge sections.
- Reviewed at Review Gate 4.
- Locked after Review Gate 4.

ComparisonBlock:
- Created/finalized in Phase 6.
- Applied to old/new, before/after, marketplace, security and pricing comparisons.
- Reviewed at Review Gate 5.
- Locked after Review Gate 5.

ProcessFlow:
- Created/finalized in Phase 7.
- Applied to workflow/process sections.
- Reviewed at Review Gate 6.
- Locked after Review Gate 6.

ProductModuleMap / FeatureSection:
- Created/finalized in Phase 8.
- Applied to platform modules, product tabs, pathway cards and KB categories.
- Reviewed at Review Gate 7.
- Locked after Review Gate 7.

MetricsStrip / MetricCard:
- Created/finalized in Phase 9.
- Applied to Authors, WePub, Security, Pricing and enterprise sections.
- Reviewed at Review Gate 8.
- Locked after Review Gate 8.

PlanCard:
- Created/finalized in Phase 9.
- Applied only to Pricing unless reused through explicit approval.
- Reviewed at Review Gate 8.
- Locked after Review Gate 8.

Form / Modal / FAQ / Docs components:
- Refined in Phase 10.
- Applied to Contact, KB and Terms.
- Reviewed at Review Gate 9.
- Locked after Review Gate 9.

CtaBlock:
- Finalized in Phase 11.
- Applied across all final sections.
- Reviewed at Review Gate 10.
- Locked after Review Gate 10.

Icon system:
- Created/refactored in Phase 2.
- Applied across all phases.
- Reviewed at Review Gate 1.
- Locked after Review Gate 1.

Animation utilities:
- Created/refactored in Phase 2.
- Applied across all phases.
- Base reviewed at Review Gate 1.
- Motion appropriateness reviewed again in Review Gate 11.
- Base locked after Review Gate 1.

**19. Component Lifecycle Matrix**
| Component | Created In | Applied In | Locked At | Unlocked Parts | Can Change Without CR | Needs Change Request |
|---|---|---|---|---|---|---|
| Nav/Header | Phase 2C | All pages from Phase 2 onward | Gate 1 | Link destinations only if separately requested as content/nav task | Nothing visual after Gate 1 | Layout, spacing, dropdown behavior, mobile menu, sticky behavior, typography, animation |
| Footer | Phase 2C | All pages from Phase 2 onward | Gate 1 | Legal/link text only if separately requested as content/legal task | Nothing visual after Gate 1 | Layout, grouping, spacing, background, typography, link style |
| Button / ActionLink | Phase 2A | Phases 4-11 | Gate 1 | CTA text/href only if separately requested as content task | Nothing visual after Gate 1 | Button variants, size, radius, color, hover/focus, icon placement |
| Card | Phase 2B | Phases 5-10 | Gate 1 for base; Gates 4-9 for usage | Card content only if user separately requests content changes | Existing content can flow inside approved card | Base style, padding, border, shadow, hover, new variants |
| Section | Phase 2B | Phases 4-11 | Gate 1 | Section content only if user separately requests content changes | Approved variant assignment within roadmap scope | Base spacing, background variants, container rules, section rhythm |
| HeroSection | Phase 4A | Phase 4B and all pages | Gate 3 | Placeholder image inside approved slot | Dashboard/screenshot/diagram image if aspect ratio and slot stay fixed | Layout, proportions, spacing, typography, CTA placement, responsive rules, animation |
| PlaceholderVisual | Phase 3A | Phases 4, 7, 8, 10 | Gate 2 | Placeholder text brief updates in document if asset brief becomes clearer | Replace placeholder with final asset in same slot/aspect ratio | Component frame, metadata structure, aspect-ratio behavior, visual styling |
| MockupFrame / BrowserFrame / DashboardFrame | Phase 3B | Phases 4, 8, 9, 10 | Gate 2 | Image/content inside frame | Replace screenshot/dashboard content inside same frame | Frame chrome, border, shadow, toolbar, responsive scaling, variants |
| FloatingMetricCard / StatusChip | Phase 3B | Phases 4 and 9 | Gate 2 | Existing metric value/content only if user separately approves content | Swap icon or status text only inside approved style and content constraints | Size, color system, position rules, hover/motion, invented states |
| ActivityStream / BookCard / DiscussionThread | Phase 3C | Home, WeRead, WeBuzz, Scribe visuals | Gate 2 | Row examples inside approved visual | Replace example screenshot/content inside same frame | Component structure, spacing, card style, social/feed behavior |
| AccessPolicyPanel / KnowledgeGraphPanel | Phase 3C | Security, WeTalk, BookTree, Platform visuals | Gate 2 | Graph/dashboard image content | Replace graph screenshot/diagram inside same slot | Panel structure, graph style, access matrix layout, responsive behavior |
| ProblemMatrix | Phase 5A | Phase 5B | Gate 4 | Icons inside approved style | Replace icon asset only | Matrix layout, card style, density, spacing, responsive rules |
| ComparisonBlock | Phase 6A | Phase 6B | Gate 5 | Icons or small decorative markers inside approved style | Replace icon asset only | Panel layout, old/new structure, spacing, mobile stacking, color logic |
| ProcessFlow | Phase 7A | Phase 7B | Gate 6 | Icons inside approved style | Replace icon asset only | Connector system, step layout, motion, responsive stack, spacing |
| ProductModuleMap / FeatureSection | Phase 8A | Phase 8B | Gate 7 | Icons/screenshots inside approved slots | Replace icon or screenshot asset if size/slot fixed | Module layout, tab behavior, feature card style, responsive rules |
| MetricsStrip / MetricCard | Phase 9A | Phase 9B | Gate 8 | Existing approved metric content only | No visual changes without CR; content only by separate explicit request | Metric styling, count-up behavior, hierarchy, invented numbers |
| PlanCard | Phase 9B | Pricing | Gate 8 | Plan text/prices only by explicit pricing/content request | Nothing visual after Gate 8 | Plan hierarchy, recommended badge, layout, table relation |
| Form / Modal / FAQ / Docs components | Phase 10B | Contact, KB, Terms | Gate 9 | Form/legal/FAQ text only by explicit content/legal request | Nothing visual after Gate 9 | Layout, focus, accordion behavior, docs/legal typography |
| CtaBlock | Phase 11A | Phase 11B | Gate 10 | CTA text/href only by explicit content request | Nothing visual after Gate 10 | CTA layout, background, button placement, spacing, responsive rules |
| Icon System | Phase 2D | All phases | Gate 1 | Individual icon glyph in same stroke/size/style | Swap icon glyph if it follows approved icon rules | Stroke, size, color, fill, decorative icon style |
| Animation Utilities | Phase 2D | All phases | Gate 1; validated Gate 11 | Animation disabled by reduced motion | Nothing new without CR; reduced-motion fixes allowed | Timing, easing, new patterns, parallax, reveal behavior |

**20. Placeholder Visual Inventory**
Home:
- Page: Home.
- Section/type: Dashboard Hero / platform overview.
- Appears In Phase: Phase 4B Hero Application.
- Reviewed At Gate: Review Gate 3. Hero System Review.
- Placeholder name: `home-platform-command-center`.
- Type: product dashboard / ecosystem overview.
- Aspect ratio: 16:10.
- Desktop placement: right side or wide hero visual depending approved Dashboard Hero pattern.
- Mobile behavior: visual below hero copy, full-width, stable aspect ratio, no crop.
- Exact Russian asset brief: создать светлый product dashboard платформы ReaderPub: верхняя панель, модульная карта WePub/WeRead/WeBuzz/WeTalk/BookTree/Scribe, activity stream читателей, analytics cards, rights/access status, publication cards. Стиль clean PaaS, white/off-white surfaces, slate text, teal/blue accents, тонкие borders, без людей, без стопок книг, без blobs.
- What Codex does when placeholder appears: ставит semantic placeholder с этим brief и stable frame.
- What user must prepare: финальный dashboard visual 16:10.
- Whether semantic placeholder is allowed temporarily: да.

Platform:
- Page: Platform.
- Section/type: Architecture Hero.
- Appears In Phase: Phase 4B Hero Application.
- Reviewed At Gate: Review Gate 3. Hero System Review.
- Placeholder name: `platform-architecture-map`.
- Type: architecture diagram.
- Aspect ratio: 16:9.
- Desktop placement: wide visual below centered hero copy or alongside text if approved.
- Mobile behavior: stacked below copy, diagram simplified but readable.
- Exact Russian asset brief: layered architecture map publishing platform: ingest, metadata, web edition, access/security, reading layer, discussion layer, knowledge graph, analytics, distribution endpoints. Light technical diagram, тонкие connector lines, small labels, teal/blue/slate accents, без людей и декоративных иллюстраций.
- What Codex does when placeholder appears: ставит semantic placeholder and architecture frame.
- What user must prepare: финальный architecture map 16:9.
- Whether semantic placeholder is allowed temporarily: да.

WeRead:
- Page: WeRead.
- Section/type: Product UI Hero.
- Appears In Phase: Phase 4B Hero Application.
- Reviewed At Gate: Review Gate 3. Hero System Review.
- Placeholder name: `weread-browser-reader-ui`.
- Type: browser reader UI.
- Aspect ratio: 4:3.
- Desktop placement: right side in Product UI Hero.
- Mobile behavior: below copy, full width, key UI labels preserved.
- Exact Russian asset brief: browser-based reading interface: top browser bar, left TOC, main reading text, notes/sidebar, passage markers, discussion markers, reading progress, subtle teal highlights. Clean product UI, no person, no cartoon book.
- What Codex does when placeholder appears: ставит semantic placeholder inside BrowserFrame.
- What user must prepare: final reader UI image 4:3.
- Whether semantic placeholder is allowed temporarily: да.

WePub:
- Page: WePub.
- Section/type: Product UI Hero.
- Appears In Phase: Phase 4B Hero Application.
- Reviewed At Gate: Review Gate 3. Hero System Review.
- Placeholder name: `wepub-publishing-console`.
- Type: publishing control panel.
- Aspect ratio: 16:10.
- Desktop placement: right side in Product UI Hero.
- Mobile behavior: below copy, dashboard scaled without horizontal overflow.
- Exact Russian asset brief: publishing dashboard: upload checklist, metadata fields, web preview, pricing/revenue card, analytics summary, publish status, rights/access chip. Light SaaS console, white cards, slate text, teal/blue accents, no cartoon folder, no people.
- What Codex does when placeholder appears: ставит semantic placeholder inside DashboardFrame.
- What user must prepare: final publishing console visual 16:10.
- Whether semantic placeholder is allowed temporarily: да.

WeBuzz:
- Page: WeBuzz.
- Section/type: Product UI Hero / discussion signature.
- Appears In Phase: Phase 4B Hero Application.
- Reviewed At Gate: Review Gate 3. Hero System Review.
- Placeholder name: `webuzz-book-discussion-feed`.
- Type: book discussion feed.
- Aspect ratio: 16:10.
- Desktop placement: right side hero visual.
- Mobile behavior: stacked below copy, feed cards remain readable.
- Exact Russian asset brief: book-centric discussion feed: book card, passage quote card, author discussion thread, reader replies, reactions, topic chips, no ads, no social-network noise, no people. Light product UI, strong publishing context.
- What Codex does when placeholder appears: ставит semantic placeholder using ActivityStream/DiscussionThread shell.
- What user must prepare: final discussion feed visual 16:10.
- Whether semantic placeholder is allowed temporarily: да.

WeTalk:
- Page: WeTalk.
- Section/type: Product UI Hero / private workspace.
- Appears In Phase: Phase 4B Hero Application.
- Reviewed At Gate: Review Gate 3. Hero System Review.
- Placeholder name: `wetalk-private-workspace`.
- Type: private institutional workspace UI.
- Aspect ratio: 16:10.
- Desktop placement: right side hero visual.
- Mobile behavior: below copy, permissions/status panels stack.
- Exact Russian asset brief: private workspace UI: groups, rooms, permission levels, access status, audit trail, publication-linked discussion, institutional tone. Light UI, no public social feed vibe, no people, no cartoon.
- What Codex does when placeholder appears: ставит semantic placeholder with workspace frame.
- What user must prepare: final private workspace visual 16:10.
- Whether semantic placeholder is allowed temporarily: да.

BookTree:
- Page: BookTree.
- Section/type: Graph Hero.
- Appears In Phase: Phase 4B Hero Application.
- Reviewed At Gate: Review Gate 3. Hero System Review.
- Placeholder name: `booktree-knowledge-graph`.
- Type: knowledge graph UI.
- Aspect ratio: 16:10.
- Desktop placement: dominant hero visual, graph larger than normal mockup.
- Mobile behavior: graph stacks below copy with simplified node density.
- Exact Russian asset brief: knowledge graph tied to publications: book nodes, excerpt nodes, notes, projects, manuscript nodes, selected detail panel, relation labels, search/filter chips. Light technical graph, not random abstract network, no dark cyberpunk.
- What Codex does when placeholder appears: ставит semantic placeholder with KnowledgeGraphPanel shell.
- What user must prepare: final knowledge graph visual 16:10.
- Whether semantic placeholder is allowed temporarily: да.

Scribe:
- Page: Scribe.
- Section/type: Assistant/Product Context Hero.
- Appears In Phase: Phase 4B Hero Application.
- Reviewed At Gate: Review Gate 3. Hero System Review.
- Placeholder name: `scribe-contextual-assistant`.
- Type: contextual assistant panel.
- Aspect ratio: 16:10.
- Desktop placement: right side or wide assistant workspace depending approved hero pattern.
- Mobile behavior: stacked below copy; chat/source cards remain legible.
- Exact Russian asset brief: assistant UI: chat panel, cited passages, source cards, book/context chips, platform actions, confidence/source labels. Clean light interface, no generic AI glow, no dark neon, no robot illustration.
- What Codex does when placeholder appears: ставит semantic placeholder with assistant panel shell.
- What user must prepare: final assistant visual 16:10.
- Whether semantic placeholder is allowed temporarily: да.

Authors:
- Page: Authors.
- Section/type: Dashboard Hero / business metrics.
- Appears In Phase: Phase 4B Hero Application.
- Reviewed At Gate: Review Gate 3. Hero System Review.
- Placeholder name: `authors-business-dashboard`.
- Type: author business dashboard.
- Aspect ratio: 16:10.
- Desktop placement: right side dashboard hero.
- Mobile behavior: below copy, metrics stack cleanly.
- Exact Russian asset brief: author dashboard: sales/revenue cards, 5% comparison if existing copy supports it, reader activity, fan club/community indicators, publication list, payout/status chips. Enterprise SaaS look, no author cartoon.
- What Codex does when placeholder appears: ставит semantic placeholder inside DashboardFrame.
- What user must prepare: final author dashboard 16:10.
- Whether semantic placeholder is allowed temporarily: да.

Institutions:
- Page: Institutions.
- Section/type: Dashboard Hero / collection management.
- Appears In Phase: Phase 4B Hero Application.
- Reviewed At Gate: Review Gate 3. Hero System Review.
- Placeholder name: `institutions-collection-console`.
- Type: collection management console.
- Aspect ratio: 16:10.
- Desktop placement: right side dashboard hero.
- Mobile behavior: below copy; catalog/access/analytics panels stack.
- Exact Russian asset brief: institutional collection console: catalog ingest, metadata mapping, access rules, collection analytics, user groups, publication status. Light enterprise UI, no campus cartoon, no decorative library illustration.
- What Codex does when placeholder appears: ставит semantic placeholder inside DashboardFrame.
- What user must prepare: final collection console visual 16:10.
- Whether semantic placeholder is allowed temporarily: да.

Security:
- Page: Security.
- Section/type: Product UI Hero / access control.
- Appears In Phase: Phase 4B Hero Application.
- Reviewed At Gate: Review Gate 3. Hero System Review.
- Placeholder name: `security-access-control-dashboard`.
- Type: access-control dashboard.
- Aspect ratio: 16:10.
- Desktop placement: right side hero visual.
- Mobile behavior: below copy; policy matrix remains readable.
- Exact Russian asset brief: access-control dashboard: roles, policy matrix, active sessions, audit log, risk indicators, protected distribution status, permission chips. Serious enterprise tone, light UI, no lock cartoon.
- What Codex does when placeholder appears: ставит semantic placeholder with AccessPolicyPanel shell.
- What user must prepare: final access-control dashboard 16:10.
- Whether semantic placeholder is allowed temporarily: да.

Pricing:
- Page: Pricing.
- Section/type: optional billing panel.
- Appears In Phase: Phase 9B Business / Pricing Application.
- Reviewed At Gate: Review Gate 8. Business / Metrics / Pricing / Enterprise Review.
- Placeholder name: `pricing-billing-panel-optional`.
- Type: billing/usage mini-panel.
- Aspect ratio: 3:2.
- Desktop placement: optional small visual in pricing hero or supporting pricing block.
- Mobile behavior: hidden only if decorative; otherwise stacked after hero copy.
- Exact Russian asset brief: minimal billing/usage panel: plan summary, active titles, usage/storage, invoice status, clean table rows, no decorative illustration.
- What Codex does when placeholder appears: asks user whether optional panel is needed; if yes, uses semantic placeholder.
- What user must prepare: final billing panel 3:2 only if approved.
- Whether semantic placeholder is allowed temporarily: да, если visual approved; otherwise no visual.

About:
- Page: About.
- Section/type: optional roadmap/principles visual.
- Appears In Phase: Phase 10A Supporting Framework and Optional Asset Decisions.
- Reviewed At Gate: Review Gate 9. Supporting / Docs / Forms / Legal Review.
- Placeholder name: `about-infrastructure-roadmap-optional`.
- Type: roadmap/principles board.
- Aspect ratio: 16:9.
- Desktop placement: supporting visual near narrative/principles block.
- Mobile behavior: stacked, labels readable.
- Exact Russian asset brief: infrastructure roadmap/principles board: platform layers, publishing infrastructure principles, milestones or focus areas, clean product style, no team cartoon.
- What Codex does when placeholder appears: asks whether optional roadmap visual is needed; if yes, uses semantic placeholder.
- What user must prepare: final roadmap visual 16:9 only if approved.
- Whether semantic placeholder is allowed temporarily: да, если visual approved; otherwise no visual.

Contact:
- Page: Contact.
- Section/type: Conversion Hero / onboarding workflow.
- Appears In Phase: Phase 4B Hero Application and Phase 7B Workflow Application.
- Reviewed At Gate: Review Gate 3. Hero System Review and Review Gate 6. Workflow / Process Sections Review.
- Placeholder name: `contact-onboarding-workflow`.
- Type: onboarding workflow UI.
- Aspect ratio: 3:2.
- Desktop placement: right side of conversion hero or workflow section.
- Mobile behavior: below copy; steps stack vertically.
- Exact Russian asset brief: onboarding workflow: files/catalog -> metadata -> preview -> launch, status cards, checklist, contact/onboarding progress, light UI, no people.
- What Codex does when placeholder appears: ставит semantic placeholder if asset is missing.
- What user must prepare: final onboarding visual 3:2.
- Whether semantic placeholder is allowed temporarily: да.

KB:
- Page: KB.
- Section/type: Minimal Docs Hero / help center search.
- Appears In Phase: Phase 4B Hero Application and Phase 10B Supporting Application.
- Reviewed At Gate: Review Gate 3. Hero System Review and Review Gate 9. Supporting / Docs / Forms / Legal Review.
- Placeholder name: `kb-help-center-search`.
- Type: help center search UI.
- Aspect ratio: 16:9.
- Desktop placement: under or beside KB hero depending Minimal Docs Hero variant.
- Mobile behavior: stacked, search bar full width.
- Exact Russian asset brief: help center interface: search bar, category chips, FAQ preview cards, docs/sidebar cues, clean documentation style, no decorative image.
- What Codex does when placeholder appears: ставит semantic placeholder only if KB hero needs a visual.
- What user must prepare: final help center search UI 16:9.
- Whether semantic placeholder is allowed temporarily: да.

Terms:
- Page: Terms.
- Section/type: legal/docs layout.
- Appears In Phase: Phase 10B Supporting Application.
- Reviewed At Gate: Review Gate 9. Supporting / Docs / Forms / Legal Review.
- Placeholder name: none.
- Type: no large visual.
- Aspect ratio: none.
- Desktop placement: no decorative visual.
- Mobile behavior: legal content remains readable.
- Exact Russian asset brief: не создавать большую картинку; использовать clean legal layout, narrow content, optional TOC.
- What Codex does when placeholder appears: no visual, only layout.
- What user must prepare: nothing.
- Whether semantic placeholder is allowed temporarily: не требуется.

**21. Детальный Implementation Roadmap**
Общий формат каждого шага: номер, название, цель, что будет сделано, что должен сделать пользователь, вероятно затрагиваемые файлы, что нельзя трогать, зависимости, риски, проверка, критерии готовности. Roadmap организован по системным уровням, а не по страницам. Каждая большая phase делится на subphases, а после каждой subphase выполняется Mini Review.

Phase 1. Audit and Global Design Foundation

Phase 1A. Audit Baseline

01. Audit visual system.
- Цель: зафиксировать исходное визуальное состояние перед редизайном.
- Что будет сделано: inventory страниц, компонентов, CSS, assets, gradients, шрифтов, повторяющихся patterns.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: не менять файлы; только чтение проекта.
- Что нельзя трогать: сайт, код, тексты, routes.
- Зависимости: нет.
- Риски: пропустить локальные page-specific styles.
- Проверка: список найденных визуальных проблем и повторяющихся patterns.
- Критерии готовности: audit готов и не внесено ни одного изменения в сайт.

Phase 1A Mini Review: проверить, что audit не изменил файлы, зафиксировал gradients/fonts/assets/components и не начал реализацию.

Phase 1B. Typography and Token Foundation

02. Confirm typography direction.
- Цель: выбрать финальное направление типографики до глобальной замены.
- Что будет сделано: сравнение Manrope-only и Manrope + Inter с текущей структурой сайта.
- Что должен сделать пользователь: утвердить Manrope-only или Manrope + Inter.
- Вероятно затрагиваемые файлы: не менять файлы на этом шаге.
- Что нельзя трогать: тексты, headings, CSS.
- Зависимости: 01.
- Риски: выбрать шрифт, который создаст overflow в длинных заголовках.
- Проверка: аргументация выбора и список потенциальных мест риска.
- Критерии готовности: typography direction утвержден пользователем.

03. Add design tokens.
- Цель: создать базу цветов, шрифтов, spacing, radius, shadows, borders.
- Что будет сделано: добавить или обновить token variables без page-level redesign.
- Что должен сделать пользователь: ничего после утверждения типографики.
- Вероятно затрагиваемые файлы: `global.css`, возможно `Base.astro`.
- Что нельзя трогать: страницы и тексты.
- Зависимости: 02.
- Риски: конфликт с существующими CSS variables.
- Проверка: build, отсутствие визуальных поломок от unused tokens.
- Критерии готовности: tokens доступны глобально и не меняют структуру страниц.

04. Replace typography globally.
- Цель: убрать декоративный serif и применить современную SaaS-типографику.
- Что будет сделано: global font-family, heading scale, body scale, line-height, letter-spacing.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `global.css`, `Base.astro`.
- Что нельзя трогать: тексты, порядок секций, CTA.
- Зависимости: 03.
- Риски: overflow на mobile, слишком плотные headings.
- Проверка: все страницы на desktop/mobile, длинные headings.
- Критерии готовности: serif не используется в headings, текст читается, overflow нет.

Phase 1B Mini Review: проверить, что typography/tokens согласованы, тексты не изменены, responsive risks записаны.

Phase 1C. Global Visual Cleanup

05. Global color and gradient cleanup.
- Цель: заменить устаревшие soft gradients на flat light SaaS surfaces.
- Что будет сделано: глобальная палитра, background surfaces, основные gradient removals.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `global.css`.
- Что нельзя трогать: page-specific layout.
- Зависимости: 03.
- Риски: потеря контраста или visual hierarchy.
- Проверка: nav, cards, buttons, section backgrounds.
- Критерии готовности: основные глобальные gradients убраны, контраст сохранен.

06. Global spacing/radius/shadow cleanup.
- Цель: привести layout density к современному PaaS-виду.
- Что будет сделано: базовые spacing, container widths, radius scale, shadow scale.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `global.css`, shared layout components if needed.
- Что нельзя трогать: тексты, routes, section order.
- Зависимости: 03.
- Риски: неожиданное изменение высоты секций.
- Проверка: основные страницы, card grids, hero containers.
- Критерии готовности: spacing/radius/shadows консистентны и не выглядят устаревшими.

07. Global border/focus states.
- Цель: сделать border language и accessibility focus системными.
- Что будет сделано: shared border colors, hover borders, focus rings, keyboard-visible states.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `global.css`, shared interactive components.
- Что нельзя трогать: behavior dropdown/forms beyond focus styles.
- Зависимости: 03, 05.
- Риски: focus rings могут выглядеть слишком ярко.
- Проверка: keyboard navigation, buttons, links, forms, dropdown triggers.
- Критерии готовности: focus видим, borders тонкие, стиль единый.

08. Initial responsive typography pass.
- Цель: убедиться, что новая типографика работает на desktop/tablet/mobile.
- Что будет сделано: responsive clamps or breakpoints for headings/body where needed.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `global.css`.
- Что нельзя трогать: layout sections beyond text sizing.
- Зависимости: 04.
- Риски: слишком маленький mobile hero или слишком крупный desktop H1.
- Проверка: все page headings на mobile and desktop.
- Критерии готовности: типографика стабильна, текст не обрезается.

Phase 1C Mini Review: проверить global colors, spacing, borders, focus и responsive typography без локальных page-first исправлений.

Definition of Completion — Phase 1:
- audit завершен и исходные visual risks понятны;
- typography direction утвержден;
- design tokens добавлены;
- global typography применена без content changes;
- global color/gradient cleanup начат на уровне foundation;
- spacing/radius/shadow/focus rules заданы;
- responsive typography не ломает headings;
- Mini Reviews 1A, 1B, 1C выполнены;
- Phase 1 готова к включению в Review Gate 1 после завершения Phase 2.

Phase 2. Core Components Foundation

Phase 2A. Interaction Foundation

09. Button/ActionLink system.
- Цель: заменить устаревшие кнопки на современную систему CTA.
- Что будет сделано: primary, secondary, tertiary, icon-ready states, hover/focus/disabled.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `ActionLink.astro`, `global.css`.
- Что нельзя трогать: CTA labels, hrefs, route behavior.
- Зависимости: 03, 05, 07.
- Риски: разная высота кнопок в старых layout.
- Проверка: все CTA на основных страницах.
- Критерии готовности: кнопки без gradients, states единые, CTA тексты не изменены.

Phase 2A Mini Review: проверить button/action states, focus, no CTA text/href changes.

Phase 2B. Content Surfaces and Section Foundation

10. Card base system.
- Цель: создать базовую flat card систему.
- Что будет сделано: white surface, border, padding, radius, hover lift, focus.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `Card.astro`, `CardGrid.astro`, `global.css`.
- Что нельзя трогать: card content.
- Зависимости: 03, 06, 07.
- Риски: старые card grids могут стать слишком плотными.
- Проверка: existing card grids across pages.
- Критерии готовности: base cards clean, no gradients, no heavy shadows.

11. Card variants.
- Цель: определить reusable variants до redesign секций.
- Что будет сделано: feature, product, metric, workflow, comparison, plan, docs card variants.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `Card.astro`, `CardGrid.astro`, возможно new variant helpers, `global.css`.
- Что нельзя трогать: page content.
- Зависимости: 10.
- Риски: слишком много variants без необходимости.
- Проверка: variants documented in component usage.
- Критерии готовности: variants готовы для phases 5-10.

12. Section base system.
- Цель: создать единый shared section shell.
- Что будет сделано: base padding, containers, title blocks, eyebrow/support layout rules.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `Section.astro`, `SpecCardsSection.astro`, `global.css`.
- Что нельзя трогать: page copy and section order.
- Зависимости: 03, 06.
- Риски: legacy sections with custom wrappers.
- Проверка: визуально сравнить all current section wrappers.
- Критерии готовности: base section system готов без page-first redesign.

13. Section variants.
- Цель: создать approved variants для будущих section types.
- Что будет сделано: white, subtle gray, technical grid, product mockup, comparison, workflow, metrics, docs/legal, CTA.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `Section.astro`, `global.css`.
- Что нельзя трогать: content and layout of page-specific sections.
- Зависимости: 12.
- Риски: variants могут выглядеть слишком похожими.
- Проверка: small component preview or representative pages.
- Критерии готовности: variants distinguishable but within one system.

Phase 2B Mini Review: проверить cards/sections as shared surfaces, no local page redesign, no gradient cards.

Phase 2C. Navigation and Site Chrome

14. Header layout.
- Цель: заменить nav на light sticky SaaS header.
- Что будет сделано: header container, logo area, nav links, CTA placement, sticky/glass restraint.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `Nav.astro`, `global.css`.
- Что нельзя трогать: nav URLs, nav labels, route structure.
- Зависимости: 09, 13.
- Риски: desktop dropdown alignment and mobile behavior.
- Проверка: desktop nav, sticky behavior, page width.
- Критерии готовности: header light, no gradients, nav text unchanged.

15. Dropdowns.
- Цель: сделать dropdowns современными и accessible.
- Что будет сделано: white panel, border, subtle shadow, fade/scale transition, focus states.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `Nav.astro`, `global.css`, nav script if present.
- Что нельзя трогать: dropdown link list and destinations.
- Зависимости: 14.
- Риски: keyboard/touch regressions.
- Проверка: hover, focus, click/touch, escape/blur behavior.
- Критерии готовности: dropdown accessible, no gradient, links unchanged.

16. Mobile menu.
- Цель: привести mobile nav к light SaaS interaction.
- Что будет сделано: menu panel, hamburger state, scroll lock/focus if existing behavior supports.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `Nav.astro`, `global.css`, nav script if present.
- Что нельзя трогать: mobile links, routes.
- Зависимости: 14, 15.
- Риски: focus trap or body scroll bugs.
- Проверка: mobile viewport, menu open/close, link click.
- Критерии готовности: menu работает и визуально совпадает с header system.

17. Footer.
- Цель: сделать footer light, structured, product/company/navigation oriented.
- Что будет сделано: footer grid, nav groups, legal row, subtle separator.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `Footer.astro`, `global.css`.
- Что нельзя трогать: legal text, footer links.
- Зависимости: 13.
- Риски: footer may become too large on mobile.
- Проверка: all pages footer desktop/mobile.
- Критерии готовности: footer light, no photo/gradient background, links unchanged.

Phase 2C Mini Review: проверить header/dropdowns/mobile menu/footer together, keyboard/touch risks, link invariance.

Phase 2D. Icon and Motion Foundation

18. Icon system.
- Цель: заменить разнородные/decorative icons на modern line-icon language.
- Что будет сделано: icon sizing, stroke, color rules, usage guidance.
- Что должен сделать пользователь: предоставить иконки только если нет подходящих existing/free line icons.
- Вероятно затрагиваемые файлы: `SectionIcon.astro`, icon assets/components, `global.css`.
- Что нельзя трогать: text labels.
- Зависимости: 05, 07.
- Риски: icons can look generic if overused.
- Проверка: icon consistency in cards, nav and sections.
- Критерии готовности: icons modern, restrained, consistent.

19. Animation utilities + reduced motion support.
- Цель: создать базовую motion систему без перегруза.
- Что будет сделано: reveal utilities, hover/lift states, dropdown motion, reduced motion override.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `animation-pass.js`, `global.css`, shared components if needed.
- Что нельзя трогать: page content or routes.
- Зависимости: 07, 09, 15.
- Риски: heavy JS, layout shift, nausea for motion-sensitive users.
- Проверка: reduced motion, no layout shift, performance.
- Критерии готовности: base animations exist, are subtle, and can be disabled.

Phase 2D Mini Review: проверить icons and animation utilities as shared foundation, no excessive motion.

Definition of Completion — Phase 2:
- buttons/action links готовы;
- base cards and card variants готовы;
- base sections and section variants готовы;
- header, dropdowns, mobile menu and footer приведены к light system;
- icon system and motion utilities готовы;
- reduced motion support включен;
- Mini Reviews 2A, 2B, 2C, 2D выполнены;
- Review Gate 1 проведен и подтвержден пользователем;
- Locked Scope Gate 1 зафиксирован.

Phase 3. Product Mockup and Placeholder Infrastructure

Phase 3A. Placeholder Framework

20. PlaceholderVisual component.
- Цель: создать semantic placeholder для больших visuals без генерации картинок.
- Что будет сделано: reusable placeholder with title, brief, aspect ratio, metadata.
- Что должен сделать пользователь: ничего на этом шаге.
- Вероятно затрагиваемые файлы: new component, `global.css`.
- Что нельзя трогать: pages and final image generation.
- Зависимости: 13.
- Риски: placeholder может выглядеть слишком финально или слишком сыро.
- Проверка: placeholder renders with stable aspect ratio.
- Критерии готовности: component готов и ясно показывает, что это temporary semantic placeholder.

Phase 3A Mini Review: проверить, что PlaceholderVisual не выглядит финальной плохой картинкой и содержит нужную metadata.

Phase 3B. Mockup Frames and Dashboard Primitives

21. MockupFrame component.
- Цель: создать общий frame для product UI mockups.
- Что будет сделано: toolbar, border, surface, shadow, responsive shell.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: new component, `global.css`.
- Что нельзя трогать: page layouts.
- Зависимости: 20.
- Риски: frame can dominate content.
- Проверка: responsive frame at common aspect ratios.
- Критерии готовности: frame reusable for dashboard/browser/product visuals.

22. BrowserFrame and DashboardFrame variants.
- Цель: подготовить разные frame variants для reader UI and dashboards.
- Что будет сделано: BrowserFrame for WeRead/KB-like UI, DashboardFrame for Home/WePub/Authors/Institutions/Security.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: mockup components, `global.css`.
- Что нельзя трогать: page content.
- Зависимости: 21.
- Риски: variants become visually unrelated.
- Проверка: side-by-side comparison of frames.
- Критерии готовности: both variants share one product ecosystem language.

23. FloatingMetricCard and StatusChip.
- Цель: подготовить small UI primitives for dashboards and hero overlays.
- Что будет сделано: metric card, status chip, access chip, revenue/status states.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: new UI components, `global.css`.
- Что нельзя трогать: inventing metrics.
- Зависимости: 21.
- Риски: fake metrics or misleading stats.
- Проверка: use only existing numbers/labels or generic placeholders.
- Критерии готовности: primitives ready without invented claims.

Phase 3B Mini Review: проверить frame consistency, dashboard/browser variants, status/metric primitives and no invented metrics.

Phase 3C. Product UI Mini-Components

24. ActivityStream / BookCard / DiscussionThread mini-components.
- Цель: подготовить product-led primitives для reader activity and discussion visuals.
- Что будет сделано: compact activity rows, publication cards, discussion thread shell.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: new components, `global.css`.
- Что нельзя трогать: live content copy.
- Зависимости: 21.
- Риски: social feed vibe instead of publishing context.
- Проверка: all items stay book/passage/publication centered.
- Критерии готовности: primitives support Home, WeRead, WeBuzz, Scribe.

25. AccessPolicyPanel / KnowledgeGraphPanel shells.
- Цель: подготовить advanced product visual shells для security, WeTalk, BookTree.
- Что будет сделано: access matrix shell, policy rows, graph panel shell, detail side panel.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: new components, `global.css`.
- Что нельзя трогать: final graph/image generation.
- Зависимости: 21.
- Риски: graph may become abstract or security panel too decorative.
- Проверка: labels and structure are publishing-specific.
- Критерии готовности: shells support future semantic placeholders.

Phase 3C Mini Review: проверить, что feed/thread/access/graph primitives остаются publishing-specific.

Phase 3D. Placeholder Metadata and Responsive Behavior

26. Placeholder metadata format.
- Цель: стандартизировать asset brief inside placeholders.
- Что будет сделано: fields for page, section, aspect ratio, style, contents, prohibited elements.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `PlaceholderVisual` component and documentation/comments if needed.
- Что нельзя трогать: images and page texts.
- Зависимости: 20.
- Риски: metadata too verbose for UI.
- Проверка: placeholder displays concise brief while full doc keeps detailed brief.
- Критерии готовности: all future placeholders can map to inventory.

27. Product mockup responsive behavior.
- Цель: убедиться, что mockups/frames scale consistently before page application.
- Что будет сделано: aspect-ratio, max-width, mobile stacking, overflow rules.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: mockup components, `global.css`.
- Что нельзя трогать: page-specific sections.
- Зависимости: 20-26.
- Риски: small text inside mockups may become unreadable.
- Проверка: desktop/tablet/mobile frame scaling.
- Критерии готовности: mockup infrastructure ready for heroes and sections.

Phase 3D Mini Review: проверить metadata format, aspect ratios, mobile scaling and unlocked asset boundaries.

Definition of Completion — Phase 3:
- PlaceholderVisual готов;
- MockupFrame, BrowserFrame and DashboardFrame готовы;
- FloatingMetricCard and StatusChip готовы;
- ActivityStream, BookCard, DiscussionThread готовы;
- AccessPolicyPanel and KnowledgeGraphPanel готовы;
- placeholder metadata format стабилен;
- responsive behavior mockups проверен;
- Mini Reviews 3A, 3B, 3C, 3D выполнены;
- Review Gate 2 проведен и подтвержден пользователем;
- Locked Scope Gate 2 и Unlocked Assets Gate 2 зафиксированы.

Phase 4. Hero System Across All Pages

Phase 4A. Hero Framework

28. HeroSection system update.
- Цель: подготовить HeroSection к нескольким approved hero patterns.
- Что будет сделано: shared structure for copy, visual slot, eyebrow, CTA area, responsive ordering.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `HeroSection.astro`, `global.css`.
- Что нельзя трогать: hero texts, CTA texts, routes.
- Зависимости: 19, 27.
- Риски: old pages may rely on implicit hero markup.
- Проверка: current heroes still render before pattern application.
- Критерии готовности: HeroSection supports variants without content changes.

29. Dashboard Hero pattern.
- Цель: утвердить pattern для Home, Authors, Institutions.
- Что будет сделано: text/visual ratio, dashboard frame placement, floating metrics rules.
- Что должен сделать пользователь: ничего на этом шаге.
- Вероятно затрагиваемые файлы: `HeroSection.astro`, hero CSS.
- Что нельзя трогать: page-specific copy.
- Зависимости: 28.
- Риски: dashboard visual can feel generic.
- Проверка: pattern includes publishing-specific metadata slots.
- Критерии готовности: Dashboard Hero pattern ready for application.

30. Architecture Hero pattern.
- Цель: утвердить pattern для Platform.
- Что будет сделано: centered or wide architecture layout, diagram container, technical background.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `HeroSection.astro`, hero CSS.
- Что нельзя трогать: Platform text.
- Зависимости: 28.
- Риски: diagram may become too dense on mobile.
- Проверка: desktop wide and mobile stack behavior.
- Критерии готовности: Architecture Hero pattern ready.

31. Product UI Hero pattern.
- Цель: утвердить pattern для WeRead, WePub, WeBuzz, WeTalk, Security.
- Что будет сделано: text-left/product-right layout, mockup visual slot, responsive order.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `HeroSection.astro`, hero CSS.
- Что нельзя трогать: product copy.
- Зависимости: 28.
- Риски: слишком много страниц могут выглядеть одинаково.
- Проверка: variant supports different mockup types and internal rhythm.
- Критерии готовности: Product UI Hero pattern ready with variation rules.

32. Graph Hero pattern.
- Цель: утвердить pattern для BookTree.
- Что будет сделано: dominant graph visual layout, detail panel placement, text balance.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `HeroSection.astro`, hero CSS.
- Что нельзя трогать: BookTree copy.
- Зависимости: 28, 25.
- Риски: graph can look abstract/generic.
- Проверка: graph slot supports publishing-specific nodes.
- Критерии готовности: Graph Hero pattern ready.

33. Minimal Docs Hero pattern.
- Цель: утвердить pattern для KB and Terms.
- Что будет сделано: narrow text layout, optional search/docs slot, no decorative image rule.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `HeroSection.astro`, hero CSS.
- Что нельзя трогать: docs/legal copy.
- Зависимости: 28.
- Риски: hero may feel underdesigned.
- Проверка: KB can include search visual, Terms remains clean.
- Критерии готовности: Minimal Docs Hero pattern ready.

34. Conversion Hero pattern.
- Цель: утвердить pattern для Contact.
- Что будет сделано: conversion-oriented text + onboarding workflow visual slot.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: `HeroSection.astro`, hero CSS.
- Что нельзя трогать: form fields or CTA copy.
- Зависимости: 28, 20.
- Риски: contact page can look like marketing hero instead of onboarding.
- Проверка: form path remains clear.
- Критерии готовности: Conversion Hero pattern ready.

Phase 4A Mini Review: проверить HeroSection framework, hero variants, layout rules, responsive rules and no page copy changes.

Phase 4B. Hero Application

35. Apply Home and Platform hero layouts.
- Цель: применить Dashboard Hero and Architecture Hero to two anchor pages.
- Что будет сделано: Home gets platform command center slot; Platform gets architecture map slot.
- Что должен сделать пользователь: подготовить Home command center 16:10 and Platform architecture map 16:9 later; semantic placeholder allowed now.
- Вероятно затрагиваемые файлы: `index.astro`, `platform.astro`, hero CSS if needed.
- Что нельзя трогать: copy, CTA labels, routes, non-hero sections.
- Зависимости: 29, 30.
- Риски: Home/Platform may define too much visual tone for later pages.
- Проверка: both heroes differ but share design system.
- Критерии готовности: Home and Platform heroes applied with semantic placeholders.

36. Apply product UI heroes.
- Цель: применить Product UI Hero to WeRead, WePub, WeBuzz, WeTalk and Security.
- Что будет сделано: hero visual slots for reader UI, publishing console, discussion feed, private workspace, access-control dashboard.
- Что должен сделать пользователь: подготовить соответствующие visuals later; semantic placeholders allowed now.
- Вероятно затрагиваемые файлы: `weread.astro`, `wepub.astro`, `webuzz.astro`, `wetalk.astro`, `security.astro`.
- Что нельзя трогать: copy, CTA, body sections.
- Зависимости: 31.
- Риски: five heroes may look too similar.
- Проверка: each hero has distinct product visual and spacing.
- Критерии готовности: product UI heroes applied and visually varied.

37. Apply graph and assistant heroes.
- Цель: применить special hero patterns to BookTree and Scribe.
- Что будет сделано: BookTree gets graph slot; Scribe gets contextual assistant slot.
- Что должен сделать пользователь: подготовить knowledge graph 16:10 and assistant UI 16:10 later; semantic placeholders allowed now.
- Вероятно затрагиваемые файлы: `booktree.astro`, `scribe.astro`.
- Что нельзя трогать: page copy and routes.
- Зависимости: 32 and product mockup shells.
- Риски: Scribe may fall into generic AI visual language.
- Проверка: BookTree graph is publication-specific; Scribe avoids AI glow.
- Критерии готовности: both special heroes applied.

38. Apply business, pricing and about heroes.
- Цель: применить appropriate hero patterns to Authors, Institutions, Pricing, About.
- Что будет сделано: Authors/Institutions dashboard heroes; Pricing minimal SaaS hero; About infrastructure narrative hero.
- Что должен сделать пользователь: prepare Authors dashboard 16:10, Institutions console 16:10; decide later about Pricing billing panel and About roadmap visual.
- Вероятно затрагиваемые файлы: `authors.astro`, `institutions.astro`, `pricing.astro`, `about.astro`.
- Что нельзя трогать: pricing data, author/institution copy.
- Зависимости: 29, 33.
- Риски: business pages can feel disconnected from product pages.
- Проверка: enterprise tone and publishing identity.
- Критерии готовности: business/pricing/about heroes applied with correct placeholders/optional slots.

39. Apply Contact, KB and Terms hero layouts.
- Цель: применить conversion and docs hero patterns.
- Что будет сделано: Contact conversion hero, KB docs/search hero, Terms clean legal hero.
- Что должен сделать пользователь: prepare Contact onboarding visual 3:2 and KB help center search 16:9 later if approved; Terms needs no visual.
- Вероятно затрагиваемые файлы: `contact.astro`, `kb.astro`, `terms.astro`.
- Что нельзя трогать: form semantics, FAQ/legal text.
- Зависимости: 33, 34.
- Риски: docs/legal may become overdesigned.
- Проверка: Contact is conversion-focused; KB is docs-like; Terms is readable.
- Критерии готовности: supporting heroes applied without decorative overload.

Phase 4B Mini Review: проверить все applied heroes together, distinct signatures, placeholder slots and no silent drift from approved framework.

Phase 4C. Hero Polish and Consistency

40. Hero responsive and consistency pass.
- Цель: проверить все hero together before locking Hero System.
- Что будет сделано: desktop/tablet/mobile pass, visual rhythm, placeholder scaling, CTA alignment.
- Что должен сделать пользователь: review all heroes at Review Gate 3.
- Вероятно затрагиваемые файлы: hero CSS and page hero fixes only.
- Что нельзя трогать: non-hero sections.
- Зависимости: 35-39.
- Риски: fixing one hero may affect all variants.
- Проверка: screenshots of all page heroes.
- Критерии готовности: hero system is consistent, varied and ready for Gate 3.

Phase 4C Mini Review: проверить responsive hero behavior, CTA placement, typography, proportions and animation restraint before Gate 3.

Definition of Completion — Phase 4:
- HeroSection framework готов;
- все hero variants определены;
- все страницы получили approved hero layout;
- все hero responsive;
- hero placeholders стоят в стабильных slots;
- hero typography and CTA placement consistent;
- Hero layouts follow variant rules;
- Mini Reviews 4A, 4B, 4C выполнены;
- Review Gate 3 проведен и подтвержден пользователем;
- Hero Locked Scope зафиксирован;
- Hero placeholder assets остаются Unlocked Assets в пределах approved slots.

Phase 5. Problem / Challenge Sections Across All Pages

Phase 5A. Problem Framework

41. Problem Matrix component/style.
- Цель: создать системный pattern для problem/challenge content.
- Что будет сделано: problem matrix layout, severity/impact cards, subtle section background.
- Что должен сделать пользователь: ничего.
- Вероятно затрагиваемые файлы: shared component or section CSS.
- Что нельзя трогать: problem copy.
- Зависимости: 11, 13.
- Риски: matrix can make all pages too similar.
- Проверка: variant options for dense/simple problem sections.
- Критерии готовности: problem section system ready.

Phase 5A Mini Review: проверить Problem Matrix framework, density variants and no overlap with comparison/workflow systems.

Phase 5B. Problem Application

42. Home challenge matrix.
- Цель: применить problem system to Home challenge content.
- Что будет сделано: challenge matrix using approved problem style.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `index.astro`.
- Что нельзя трогать: home text and CTA.
- Зависимости: 41.
- Риски: too heavy near hero.
- Проверка: Home flow from hero to challenge.
- Критерии готовности: Home challenge matches system and page rhythm.

43. Platform fragmentation matrix.
- Цель: применить problem system to Platform fragmentation content.
- Что будет сделано: technical fragmentation matrix with infrastructure tone.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `platform.astro`.
- Что нельзя трогать: copy and module names.
- Зависимости: 41.
- Риски: matrix too close to Home.
- Проверка: Platform feels more technical than Home.
- Критерии готовности: Platform problem section is distinct but systemic.

44. WeRead and WePub problem sections.
- Цель: оформить reading and publishing problems through shared system.
- Что будет сделано: WeRead problem cards; WePub old-model/problem section.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `weread.astro`, `wepub.astro`.
- Что нельзя трогать: product copy.
- Зависимости: 41.
- Риски: confusing problem with comparison sections.
- Проверка: problem sections lead naturally to product solution.
- Критерии готовности: both pages use system without duplicate composition.

45. WeBuzz and WeTalk problem sections.
- Цель: оформить fragmented discussion/private workspace problems.
- Что будет сделано: WeBuzz fragmented discussion; WeTalk fragmentation matrix.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `webuzz.astro`, `wetalk.astro`.
- Что нельзя трогать: copy and positioning.
- Зависимости: 41.
- Риски: public/social and private/institutional tones may blur.
- Проверка: WeBuzz feels public discussion; WeTalk feels controlled/private.
- Критерии готовности: both problem sections visually distinct.

46. BookTree and Scribe problem sections.
- Цель: оформить knowledge fragmentation and AI/context problems.
- Что будет сделано: BookTree problem matrix; Scribe knowledge scattered section.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `booktree.astro`, `scribe.astro`.
- Что нельзя трогать: knowledge/AI claims.
- Зависимости: 41.
- Риски: Scribe may look generic AI.
- Проверка: sections stay publication/source/context oriented.
- Критерии готовности: both sections match target visual language.

47. Authors, Institutions and Security problem sections.
- Цель: оформить business/enterprise/security problems.
- Что будет сделано: Authors loss matrix, Institutions problem, Security problem/threat intro.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `authors.astro`, `institutions.astro`, `security.astro`.
- Что нельзя трогать: business/security claims.
- Зависимости: 41.
- Риски: enterprise pages can become too decorative.
- Проверка: serious business tone.
- Критерии готовности: problem sections feel enterprise-ready.

48. Pricing/contact/docs problem sections where present.
- Цель: оформить support/pricing problem content without overdesign.
- Что будет сделано: Pricing economics problem framing and any lightweight Contact/KB support problem blocks.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `pricing.astro`, possibly `contact.astro`, `kb.astro`.
- Что нельзя трогать: pricing copy, FAQ copy.
- Зависимости: 41.
- Риски: docs pages can become too marketing-heavy.
- Проверка: pricing clear; docs restrained.
- Критерии готовности: supporting problem blocks use system appropriately.

Phase 5B Mini Review: проверить все applied problem sections together, page-specific tone and no repeated mechanical layout.

Phase 5C. Problem Consistency

49. Problem sections consistency pass.
- Цель: review all problem/challenge sections as one system.
- Что будет сделано: rhythm, background, card density, visual variety pass.
- Что должен сделать пользователь: review at Gate 4.
- Вероятно затрагиваемые файлы: problem section CSS and touched pages only.
- Что нельзя трогать: comparison/workflow/product sections.
- Зависимости: 42-48.
- Риски: local fixes may weaken baseline.
- Проверка: all problem sections side by side.
- Критерии готовности: sections coherent, varied and ready for Gate 4.

Phase 5C Mini Review: проверить final problem section consistency, locked component boundaries and ready-for-Gate status.

Definition of Completion — Phase 5:
- Problem Matrix framework готов;
- все relevant problem/challenge sections применены;
- страницы сохраняют разные tones внутри одной системы;
- problem sections не перепутаны с comparisons или workflows;
- responsive behavior проверен;
- Mini Reviews 5A, 5B, 5C выполнены;
- Review Gate 4 проведен и подтвержден пользователем;
- Problem Locked Scope зафиксирован.

Phase 6. Comparison Sections Across All Pages

Phase 6A. Comparison Framework

50. ComparisonBlock final system.
- Цель: утвердить shared old/new and before/after comparison style.
- Что будет сделано: two-panel layout, list styling, badges, responsive stacking.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: new/shared comparison component, `global.css`.
- Что нельзя трогать: list text and claims.
- Зависимости: 11, 13.
- Риски: comparison panels can become too dense.
- Проверка: desktop and mobile comparison readability.
- Критерии готовности: ComparisonBlock ready for all pages.

Phase 6A Mini Review: проверить ComparisonBlock framework, old/new semantics, mobile stacking and no claim changes.

Phase 6B. Comparison Application

51. Home and Platform old/new comparisons.
- Цель: применить comparison system to core platform narrative.
- Что будет сделано: Home old model vs ReaderPub; Platform old/new comparison.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `index.astro`, `platform.astro`.
- Что нельзя трогать: comparison copy.
- Зависимости: 50.
- Риски: both comparisons may look identical.
- Проверка: Home feels broad; Platform feels architectural.
- Критерии готовности: both comparisons applied with proper variation.

52. WePub old/new model.
- Цель: оформить publishing model comparison.
- Что будет сделано: WePub old-model/new web-native model comparison.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `wepub.astro`.
- Что нельзя трогать: economics/publishing copy.
- Зависимости: 50.
- Риски: overlap with WePub problem section.
- Проверка: problem and comparison have different visual roles.
- Критерии готовности: WePub comparison is clear and systemic.

53. BookTree before/after comparison.
- Цель: оформить knowledge before/after comparison.
- Что будет сделано: fragmented notes/resources vs connected graph model.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `booktree.astro`.
- Что нельзя трогать: knowledge copy.
- Зависимости: 50.
- Риски: graph visual language may leak into comparison too strongly.
- Проверка: comparison remains readable and not diagram-heavy.
- Критерии готовности: BookTree comparison complete.

54. Authors marketplace comparison.
- Цель: оформить author marketplace/economics comparison.
- Что будет сделано: comparison panel for old marketplace model vs ReaderPub model.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `authors.astro`.
- Что нельзя трогать: percentages, claims, CTA.
- Зависимости: 50.
- Риски: legal/business implication of altered wording.
- Проверка: text unchanged and hierarchy clear.
- Критерии готовности: Authors comparison complete.

55. Security and Pricing comparison sections.
- Цель: оформить security and pricing comparisons.
- Что будет сделано: Security comparison section; Pricing problem/economics comparison.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `security.astro`, `pricing.astro`.
- Что нельзя трогать: pricing/security claims.
- Зависимости: 50.
- Риски: pricing comparison can look like plan table.
- Проверка: comparison separate from pricing cards.
- Критерии готовности: both comparisons complete.

Phase 6B Mini Review: проверить all applied comparisons, density, page variation and content invariance.

Phase 6C. Comparison Consistency

56. Comparison sections consistency pass.
- Цель: проверить all comparison sections as one system.
- Что будет сделано: density, contrast, mobile stacking, variant consistency.
- Что должен сделать пользователь: review at Gate 5.
- Вероятно затрагиваемые файлы: comparison component/CSS and touched pages only.
- Что нельзя трогать: problem or workflow sections.
- Зависимости: 51-55.
- Риски: too much sameness.
- Проверка: all comparisons side by side.
- Критерии готовности: comparisons coherent and ready for Gate 5.

Phase 6C Mini Review: проверить ready-for-Gate comparison state and no local panel forks.

Definition of Completion — Phase 6:
- ComparisonBlock system готов;
- all comparison sections applied;
- old/new, before/after, marketplace, security and pricing comparisons visually coherent;
- claims/text unchanged;
- mobile stacking readable;
- Mini Reviews 6A, 6B, 6C выполнены;
- Review Gate 5 проведен и подтвержден пользователем;
- Comparison Locked Scope зафиксирован.

Phase 7. Workflow / Process Sections Across All Pages

Phase 7A. Workflow Framework

57. ProcessFlow final system.
- Цель: создать shared system for workflow/process sections.
- Что будет сделано: step cards, connectors, horizontal desktop, vertical mobile, line drawing option.
- Что должен сделать пользователь: provide line icons only if existing icon system insufficient.
- Вероятно затрагиваемые файлы: new/shared process component, `global.css`.
- Что нельзя трогать: step copy.
- Зависимости: 18, 19, 13.
- Риски: connectors break on mobile.
- Проверка: responsive process flow.
- Критерии готовности: ProcessFlow ready for page application.

Phase 7A Mini Review: проверить ProcessFlow framework, connectors, mobile stack and motion boundaries.

Phase 7B. Workflow Application

58. Home web asset process.
- Цель: оформить web asset process on Home.
- Что будет сделано: process from publishing/discovery/reading/discussion/following if present.
- Что должен сделать пользователь: optional line icons for publish/discover/read/discuss/follow.
- Вероятно затрагиваемые файлы: `index.astro`.
- Что нельзя трогать: process copy.
- Зависимости: 57.
- Риски: process too explanatory near product module map.
- Проверка: clear distinction from module section.
- Критерии готовности: Home process complete.

59. Platform workflow/integration sections.
- Цель: оформить platform integration/distribution workflow.
- Что будет сделано: ingest/API/access/analytics or equivalent existing flow.
- Что должен сделать пользователь: optional line icons if needed.
- Вероятно затрагиваемые файлы: `platform.astro`.
- Что нельзя трогать: platform content.
- Зависимости: 57.
- Риски: architecture hero and workflow may duplicate.
- Проверка: hero is map; workflow is process.
- Критерии готовности: Platform workflow complete.

60. WeRead and WePub workflows.
- Цель: оформить reading and publishing flows.
- Что будет сделано: WeRead active reading workflow; WePub manuscript-to-live workflow.
- Что должен сделать пользователь: optional line icons for workflow steps.
- Вероятно затрагиваемые файлы: `weread.astro`, `wepub.astro`.
- Что нельзя трогать: product copy and CTA.
- Зависимости: 57.
- Риски: workflows may feel same despite different products.
- Проверка: WeRead is reader activity; WePub is publishing operation.
- Критерии готовности: both workflows complete and distinct.

61. WeTalk controlled discussion lifecycle.
- Цель: оформить private/controlled discussion process.
- Что будет сделано: lifecycle from publication access to moderated/private discussion.
- Что должен сделать пользователь: optional access/security icons.
- Вероятно затрагиваемые файлы: `wetalk.astro`.
- Что нельзя трогать: copy and permissions semantics.
- Зависимости: 57.
- Риски: public social vibe.
- Проверка: controlled/institutional tone.
- Критерии готовности: WeTalk workflow complete.

62. BookTree knowledge flow and Scribe contextual flow.
- Цель: оформить knowledge graph and assistant source/action process.
- Что будет сделано: BookTree knowledge flow; Scribe contextual source-to-answer/action flow if present.
- Что должен сделать пользователь: optional graph/source icons.
- Вероятно затрагиваемые файлы: `booktree.astro`, `scribe.astro`.
- Что нельзя трогать: AI/knowledge claims.
- Зависимости: 57.
- Риски: Scribe flow becomes generic AI pipeline.
- Проверка: flow anchored in books, sources, citations, actions.
- Критерии готовности: both flows complete.

63. Institutions, Security and Contact workflows.
- Цель: оформить enterprise/support workflows.
- Что будет сделано: Institutions collection workflow, Security threat model flow, Contact onboarding workflow.
- Что должен сделать пользователь: Contact onboarding visual can remain semantic placeholder; optional icons for institutional/security steps.
- Вероятно затрагиваемые файлы: `institutions.astro`, `security.astro`, `contact.astro`.
- Что нельзя трогать: security/legal/form copy.
- Зависимости: 57.
- Риски: too much density across enterprise pages.
- Проверка: workflows readable and serious.
- Критерии готовности: workflows complete across enterprise/support pages.

Phase 7B Mini Review: проверить all applied workflows, page-specific process meaning and no generic pipeline drift.

Phase 7C. Workflow Consistency

64. Workflow sections consistency pass.
- Цель: проверить all workflow/process sections as one system.
- Что будет сделано: connectors, step density, mobile behavior, motion restraint.
- Что должен сделать пользователь: review at Gate 6.
- Вероятно затрагиваемые файлы: ProcessFlow/CSS and touched pages only.
- Что нельзя трогать: comparison/product sections.
- Зависимости: 58-63.
- Риски: local connector hacks.
- Проверка: all workflows side by side.
- Критерии готовности: process system ready for Gate 6.

Phase 7C Mini Review: проверить workflow consistency, connector system and no local CSS hacks.

Definition of Completion — Phase 7:
- ProcessFlow system готов;
- all workflow/process sections applied;
- desktop horizontal and mobile vertical rules work;
- connectors and motion are restrained;
- workflows remain publishing/product-specific;
- Mini Reviews 7A, 7B, 7C выполнены;
- Review Gate 6 проведен и подтвержден пользователем;
- Workflow Locked Scope зафиксирован.

Phase 8. Product / Module / Feature Sections Across All Pages

Phase 8A. Product/Feature Framework

65. ProductModuleMap / FeatureSection system.
- Цель: создать shared system for modules, feature tabs, pathways and docs categories.
- Что будет сделано: module cards, connected map, tabs, compact feature grid rules.
- Что должен сделать пользователь: optional module icons if not text-only.
- Вероятно затрагиваемые файлы: shared components, `global.css`.
- Что нельзя трогать: product names and text.
- Зависимости: 11, 13, 18.
- Риски: feature grids become repetitive.
- Проверка: variants for module map, tabs, cards, category grid.
- Критерии готовности: product/feature system ready.

Phase 8A Mini Review: проверить ProductModuleMap/FeatureSection framework, variants and anti-repetition rules.

Phase 8B. Product/Feature Application

66. Home product module map.
- Цель: показать ecosystem modules on Home.
- Что будет сделано: WePub/WeRead/WeBuzz/WeTalk/BookTree/Scribe module map.
- Что должен сделать пользователь: optional module icons.
- Вероятно затрагиваемые файлы: `index.astro`.
- Что нельзя трогать: module labels and links.
- Зависимости: 65.
- Риски: module map too dense on mobile.
- Проверка: modules readable and connected.
- Критерии готовности: Home module map complete.

67. Platform product modules.
- Цель: оформить platform modules with technical/infrastructure tone.
- Что будет сделано: product module grid/map for Platform.
- Что должен сделать пользователь: optional line icons.
- Вероятно затрагиваемые файлы: `platform.astro`.
- Что нельзя трогать: module names and routes.
- Зависимости: 65.
- Риски: duplication with Home module map.
- Проверка: Platform version more architectural/technical.
- Критерии готовности: Platform modules complete.

68. WeRead reconnect/product section.
- Цель: оформить product-led reading/reconnect section.
- Что будет сделано: feature/product cards or split using approved FeatureSection.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `weread.astro`.
- Что нельзя трогать: page copy.
- Зависимости: 65.
- Риски: feels like generic feature grid.
- Проверка: section grounded in reader activity and books.
- Критерии готовности: WeRead product section complete.

69. WeBuzz discussion tabs/signature block.
- Цель: создать distinct product feature block for discussion.
- Что будет сделано: tabs or signature block for book/author/passage discussion if existing structure supports.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `webuzz.astro`.
- Что нельзя трогать: text and tab labels.
- Зависимости: 65.
- Риски: tabs can become purely decorative.
- Проверка: tabs map to meaningful discussion contexts.
- Критерии готовности: WeBuzz feature block complete.

70. Scribe AI architecture section.
- Цель: оформить Scribe architecture as product/context system.
- Что будет сделано: source cards, context layers, assistant/action relation.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `scribe.astro`.
- Что нельзя трогать: AI claims.
- Зависимости: 65, 24.
- Риски: generic AI pipeline.
- Проверка: all visual language tied to sources/books/platform actions.
- Критерии готовности: Scribe product section complete.

71. Contact pathway cards and KB category cards/sidebar.
- Цель: оформить support/product entry points with shared feature system.
- Что будет сделано: Contact pathway cards; KB category cards/sidebar.
- Что должен сделать пользователь: optional icons for categories/pathways.
- Вероятно затрагиваемые файлы: `contact.astro`, `kb.astro`.
- Что нельзя трогать: form categories, FAQ text.
- Зависимости: 65.
- Риски: Contact and KB can look like marketing cards instead of utility.
- Проверка: clear utility and navigation value.
- Критерии готовности: pathways/categories complete.

Phase 8B Mini Review: проверить all applied product/feature sections, module clarity, tabs utility and no generic grid fallback.

Phase 8C. Product/Feature Consistency

72. Product/feature sections consistency pass.
- Цель: проверить all product/module/feature sections as one system.
- Что будет сделано: card density, module hierarchy, tabs behavior, mobile layout.
- Что должен сделать пользователь: review at Gate 7.
- Вероятно затрагиваемые файлы: feature components/CSS and touched pages only.
- Что нельзя трогать: pricing/business/docs forms.
- Зависимости: 66-71.
- Риски: repeated grids.
- Проверка: all feature sections side by side.
- Критерии готовности: product/feature system ready for Gate 7.

Phase 8C Mini Review: проверить product/feature sections as one system and readiness for Gate 7.

Definition of Completion — Phase 8:
- ProductModuleMap/FeatureSection system готов;
- product maps, module maps, tabs, pathway cards and KB categories applied;
- each product/feature section has clear role;
- no repeated card-grid monotony;
- mobile behavior checked;
- Mini Reviews 8A, 8B, 8C выполнены;
- Review Gate 7 проведен и подтвержден пользователем;
- Product/Feature Locked Scope зафиксирован.

Phase 9. Business / Metrics / Pricing / Enterprise Sections

Phase 9A. Business/Metrics Framework

73. Metrics system finalization.
- Цель: финализировать metric cards/strips before business pages.
- Что будет сделано: metrics layout, count-up readiness, source/label hierarchy, no invented numbers.
- Что должен сделать пользователь: confirm no new numbers should be invented.
- Вероятно затрагиваемые файлы: metric components, `global.css`.
- Что нельзя трогать: metrics copy or values.
- Зависимости: 23, 11.
- Риски: misleading or decorative metrics.
- Проверка: all metrics use existing content.
- Критерии готовности: metrics system ready.

Phase 9A Mini Review: проверить metrics framework, no invented numbers and enterprise tone.

Phase 9B. Business/Pricing Application

74. Authors metrics/living audience.
- Цель: оформить author business proof sections.
- Что будет сделано: metrics/living audience cards using approved metrics system.
- Что должен сделать пользователь: nothing unless replacing placeholder data with approved content later.
- Вероятно затрагиваемые файлы: `authors.astro`.
- Что нельзя трогать: economics copy.
- Зависимости: 73.
- Риски: overemphasis on unverified numbers.
- Проверка: numbers/claims unchanged.
- Критерии готовности: Authors metrics complete.

75. WePub economics metrics.
- Цель: оформить publishing economics proof.
- Что будет сделано: metrics/cards for economics using existing content.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `wepub.astro`.
- Что нельзя трогать: claims and percentages.
- Зависимости: 73.
- Риски: duplication with Authors metrics.
- Проверка: WePub metrics tied to publisher workflow.
- Критерии готовности: WePub economics complete.

76. Security protected distribution policy matrix.
- Цель: оформить security/business policy matrix.
- Что будет сделано: protected distribution policy matrix with access/security visual tone.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `security.astro`.
- Что нельзя трогать: security claims.
- Зависимости: 73, 25.
- Риски: matrix too complex on mobile.
- Проверка: mobile stacking and readability.
- Критерии готовности: security policy section complete.

77. Pricing optional billing decision and plan cards.
- Цель: оформить primary pricing experience.
- Что будет сделано: ask whether optional billing panel is used; plan cards polished without decorative illustration.
- Что должен сделать пользователь: решить, нужен ли optional billing mini-panel; provide asset later if yes.
- Вероятно затрагиваемые файлы: `pricing.astro`.
- Что нельзя трогать: prices, plan names, billing CTA.
- Зависимости: 73, 11.
- Риски: pricing page can feel too decorative or unclear.
- Проверка: plan hierarchy and mobile readability.
- Критерии готовности: pricing plan cards complete; billing visual decision recorded.

78. Pricing institution plans/table and Institutions value sections.
- Цель: оформить enterprise/institutional business sections.
- Что будет сделано: Pricing institution plans/table; Institutions value/benefit sections.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `pricing.astro`, `institutions.astro`.
- Что нельзя трогать: plan details, institution copy.
- Зависимости: 77, 73.
- Риски: enterprise sections can become table-heavy.
- Проверка: tables readable; value sections not decorative.
- Критерии готовности: enterprise/pricing content complete.

Phase 9B Mini Review: проверить applied business/pricing sections, numbers, plan hierarchy and enterprise clarity.

Phase 9C. Business/Pricing Consistency

79. Business/pricing/enterprise consistency pass.
- Цель: проверить all business, metrics, pricing and enterprise sections.
- Что будет сделано: visual hierarchy, numbers, tables, policy matrices, enterprise tone.
- Что должен сделать пользователь: review at Gate 8.
- Вероятно затрагиваемые файлы: business/pricing CSS and touched pages only.
- Что нельзя трогать: supporting docs or CTA sections.
- Зависимости: 74-78.
- Риски: business pages drift from publishing identity.
- Проверка: Authors, WePub, Institutions, Security, Pricing side by side.
- Критерии готовности: business system ready for Gate 8.

Phase 9C Mini Review: проверить business/pricing/enterprise consistency and no pricing/security claim changes.

Definition of Completion — Phase 9:
- Metrics system готов;
- Authors, WePub, Institutions, Security and Pricing business sections applied;
- pricing plan cards and institution tables readable;
- no invented metrics or altered pricing/security claims;
- optional billing panel decision recorded;
- Mini Reviews 9A, 9B, 9C выполнены;
- Review Gate 8 проведен и подтвержден пользователем;
- Business/Pricing Locked Scope зафиксирован.

Phase 10. Supporting / Docs / Forms / Legal

Phase 10A. Supporting Framework and Optional Asset Decisions

80. About narrative/principles and optional roadmap placeholder.
- Цель: оформить About as infrastructure narrative, not decorative story page.
- Что будет сделано: narrative/principles sections and optional roadmap placeholder decision.
- Что должен сделать пользователь: решить, нужен ли About roadmap visual; provide later if yes.
- Вероятно затрагиваемые файлы: `about.astro`.
- Что нельзя трогать: About text and company claims.
- Зависимости: 13, 20.
- Риски: About can look weaker than product pages.
- Проверка: About matches infrastructure tone.
- Критерии готовности: About supporting sections complete.

Phase 10A Mini Review: проверить About direction, optional roadmap decision and supporting page tone.

Phase 10B. Supporting Application

81. Contact form/modal polish.
- Цель: сделать contact form/modal clean and conversion-ready.
- Что будет сделано: form layout, labels, focus, modal style, error/success states if present.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `contact.astro`, form/modal CSS, `KbHelpModal` if shared.
- Что нельзя трогать: form fields semantics and submitted data behavior.
- Зависимости: 07, 09, 34.
- Риски: accessibility regressions.
- Проверка: keyboard, labels, focus, mobile.
- Критерии готовности: form/modal polished without behavior regression.

82. KB FAQ accordion and Terms legal layout/TOC.
- Цель: оформить docs/legal pages as utility surfaces.
- Что будет сделано: KB FAQ accordion polish; Terms narrow legal layout and optional TOC.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `kb.astro`, `terms.astro`, FAQ/legal CSS.
- Что нельзя трогать: FAQ and legal text.
- Зависимости: 33, 71.
- Риски: overdesign of legal content.
- Проверка: readability, keyboard interaction for FAQ.
- Критерии готовности: KB and Terms supporting layouts complete.

Phase 10B Mini Review: проверить Contact form/modal, KB FAQ/docs and Terms legal layout, especially accessibility and content invariance.

Phase 10C. Supporting Consistency

83. Supporting/docs/forms/legal consistency pass.
- Цель: проверить About, Contact, KB and Terms together.
- Что будет сделано: utility tone, form accessibility, docs readability, legal minimalism.
- Что должен сделать пользователь: review at Gate 9.
- Вероятно затрагиваемые файлы: supporting pages and CSS only.
- Что нельзя трогать: product/business sections.
- Зависимости: 80-82.
- Риски: supporting pages feel disconnected.
- Проверка: all supporting pages side by side.
- Критерии готовности: supporting system ready for Gate 9.

Phase 10C Mini Review: проверить supporting/docs/forms/legal consistency and readiness for Gate 9.

Definition of Completion — Phase 10:
- About supporting narrative polished;
- optional About roadmap visual decision recorded;
- Contact form/modal polished;
- KB FAQ/docs and Terms legal layouts polished;
- legal/FAQ/form content unchanged;
- supporting pages consistent with product system;
- Mini Reviews 10A, 10B, 10C выполнены;
- Review Gate 9 проведен и подтвержден пользователем;
- Supporting/Docs/Forms/Legal Locked Scope зафиксирован.

Phase 11. CTA and Page Completion Pass

Phase 11A. CTA Framework

84. CTA system finalization.
- Цель: финализировать final CTA pattern across pages.
- Что будет сделано: CtaBlock variants, button alignment, background, spacing, mobile behavior.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `CtaBlock.astro`, `global.css`.
- Что нельзя трогать: CTA text, hrefs.
- Зависимости: 09, 13.
- Риски: CTA sections look too repetitive.
- Проверка: CTA variants for product/business/supporting pages.
- Критерии готовности: CTA system ready.

Phase 11A Mini Review: проверить CtaBlock variants, CTA placement rules, no label/href changes.

Phase 11B. CTA Application

85. Home CTA polish.
- Цель: завершить Home page ending.
- Что будет сделано: final CTA rhythm, preceding section transition, mobile spacing.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `index.astro`.
- Что нельзя трогать: CTA copy/hrefs.
- Зависимости: 84.
- Риски: Home may end too abruptly.
- Проверка: Home full-page scroll.
- Критерии готовности: Home feels complete.

86. Product pages CTA polish.
- Цель: завершить product page endings consistently.
- Что будет сделано: CTA polish for Platform, WeRead, WePub, WeBuzz, WeTalk, BookTree, Scribe.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: product page `.astro` files.
- Что нельзя трогать: CTA copy/hrefs and body sections.
- Зависимости: 84.
- Риски: all product CTAs identical.
- Проверка: product pages side by side.
- Критерии готовности: product pages complete but varied.

87. Business/supporting pages CTA polish.
- Цель: завершить business/supporting page endings.
- Что будет сделано: CTA polish for Authors, Institutions, Security, Pricing, About, Contact, KB as applicable.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: business/supporting page `.astro` files.
- Что нельзя трогать: legal text, pricing CTA, form behavior.
- Зависимости: 84.
- Риски: Terms should not get inappropriate marketing CTA if not currently present.
- Проверка: page endings match page purpose.
- Критерии готовности: business/supporting CTAs complete.

Phase 11B Mini Review: проверить applied CTAs across home/product/business/supporting pages and no repetitive endings.

Phase 11C. Page-Level Balance

88. Page-level visual balance pass.
- Цель: проверить, что страницы выглядят завершенно after level-first implementation.
- Что будет сделано: section rhythm, no abrupt transitions, no duplicate adjacent patterns.
- Что должен сделать пользователь: review at Gate 10.
- Вероятно затрагиваемые файлы: page CSS/layout fixes only.
- Что нельзя трогать: locked baselines without change request.
- Зависимости: 85-87.
- Риски: temptation to make broad local fixes.
- Проверка: full-page desktop/mobile scan.
- Критерии готовности: all pages visually complete and ready for Gate 10.

Phase 11C Mini Review: проверить full-page rhythm, no visual cliffs, no locked baseline drift.

Definition of Completion — Phase 11:
- CTA system finalized;
- Home, product pages, business pages and supporting pages have appropriate page endings;
- CTA texts/hrefs unchanged;
- full-page visual rhythm checked;
- no page ends abruptly;
- Mini Reviews 11A, 11B, 11C выполнены;
- Review Gate 10 проведен и подтвержден пользователем;
- CTA/Page Completion Locked Scope зафиксирован.

Phase 12. Responsive, Accessibility, Performance, Final QA

Phase 12A. Responsive and Mobile QA

89. Responsive desktop/tablet/mobile pass.
- Цель: проверить all pages across viewports.
- Что будет сделано: desktop, tablet, mobile layout scan for sections, cards, mockups and CTAs.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: CSS/page fixes only.
- Что нельзя трогать: text/content/routes.
- Зависимости: 88.
- Риски: fixes may affect locked components.
- Проверка: screenshots or manual viewport review.
- Критерии готовности: no overflow, no broken layouts, no text collisions.

90. Mobile navigation and mockup scaling pass.
- Цель: specifically validate mobile menu and heavy visual components.
- Что будет сделано: mobile nav, dropdowns, hero mockups, placeholders, tables, process flows.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: nav/mockup/process/table CSS only.
- Что нельзя трогать: desktop-only decisions unless necessary.
- Зависимости: 89.
- Риски: mobile-specific hacks.
- Проверка: 360-430px mobile widths and tablet.
- Критерии готовности: mobile feels professional and readable.

Phase 12A Mini Review: проверить responsive and mobile-specific behavior without locked component drift.

Phase 12B. Accessibility and Motion/Performance QA

91. Accessibility pass.
- Цель: validate keyboard, focus, contrast, headings, labels.
- Что будет сделано: keyboard navigation, focus order, contrast check, form labels, reduced motion.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: accessibility fixes only.
- Что нельзя трогать: content meaning.
- Зависимости: 89.
- Риски: visual-only fix can harm semantics.
- Проверка: keyboard and accessibility scan.
- Критерии готовности: accessible interactions and readable contrast.

92. Reduced motion and animation performance pass.
- Цель: ensure motion is subtle, performant and disableable.
- Что будет сделано: prefers-reduced-motion, no layout shift, no heavy JS, animation durations check.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: `animation-pass.js`, `global.css`.
- Что нельзя трогать: layout and content.
- Зависимости: 19, 91.
- Риски: animations can hide content or create CLS.
- Проверка: reduced motion mode and performance scan.
- Критерии готовности: animations restrained and accessible.

Phase 12B Mini Review: проверить accessibility, reduced motion and animation performance together.

Phase 12C. Consistency, Regression and Final Report

93. Visual consistency and content invariance check.
- Цель: verify design consistency and no unauthorized content changes.
- Что будет сделано: compare texts/CTA/routes, scan colors, gradients, fonts, card/section variants.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: no edits unless issues found.
- Что нельзя трогать: locked baselines without change request.
- Зависимости: 89-92.
- Риски: missed accidental copy changes.
- Проверка: route/content diff and visual audit.
- Критерии готовности: content invariant, visual system consistent.

94. Build, routes and regression pass.
- Цель: verify technical correctness after visual redesign.
- Что будет сделано: build, route checks, console errors, key interactions.
- Что должен сделать пользователь: nothing.
- Вероятно затрагиваемые файлы: no edits unless build/regression issues found.
- Что нельзя трогать: scope expansion.
- Зависимости: 93.
- Риски: late build fix touches broad CSS.
- Проверка: successful build and route regression.
- Критерии готовности: build passes and routes work.

95. Final placeholder/asset inventory and final review report.
- Цель: close redesign with clear asset and QA status.
- Что будет сделано: final placeholder list, remaining assets needed, compromises, passed gates, deployment readiness report.
- Что должен сделать пользователь: decide asset replacement priority and deployment timing.
- Вероятно затрагиваемые файлы: no site file edits unless report is documented separately by request.
- Что нельзя трогать: site code after final QA unless user requests.
- Зависимости: 94.
- Риски: treating placeholders as final assets.
- Проверка: placeholder inventory matches actual site.
- Критерии готовности: final report delivered and ready for Review Gate 11.

Phase 12C Mini Review: проверить content invariance, routes, build status, placeholder inventory and final report readiness.

Definition of Completion — Phase 12:
- desktop/tablet/mobile QA completed;
- mobile nav and mockup scaling validated;
- accessibility pass completed;
- reduced motion and performance checked;
- visual consistency and content invariance confirmed;
- build and routes regression passed;
- final placeholder/asset inventory updated;
- Mini Reviews 12A, 12B, 12C выполнены;
- Review Gate 11 проведен и подтвержден пользователем;
- Final QA accepted.

**22. Design Review Gates**
Review Gates являются обязательными контрольными точками между крупными level-based phases. После завершения Gate следующий уровень нельзя начинать без отдельного подтверждения пользователя.

Review Gate 1. Global Design Foundation Review
- Когда выполняется: после Phase 1 and Phase 2.
- Какие phases/roadmap-шаги входят: Phase 1A-1C steps 01-08, Phase 2A-2D steps 09-19.
- Что должен показать Codex: typography, colors, spacing, radius, shadows, borders, focus states, buttons, cards, sections, header, dropdowns, mobile menu, footer, icons, animation base.
- Что должен проверить пользователь: сайт стал светлее и современнее; typography PaaS-like; gradients ушли из global UI; базовые components premium but restrained; no generic SaaS drift.
- Какие решения пользователь должен принять: утвердить typography, palette, button/card/section direction, header/footer, motion base.
- Что считается passed: foundation and core components approved as locked baseline.
- Locked Scope: typography scale, font direction, color tokens, spacing/radius/shadow/border/focus rules, Button/ActionLink system, Card base, Section base/variants, Header/Nav, Dropdowns, Mobile menu, Footer, Icon system, Animation utilities base.
- Unlocked Assets: future page-specific images, mockup screenshots and placeholders are not locked by this gate because they are introduced later.
- Можно ли переходить дальше: только после явного подтверждения пользователя.

Review Gate 2. Product Mockup / Placeholder Infrastructure Review
- Когда выполняется: после Phase 3.
- Какие phases/roadmap-шаги входят: Phase 3A-3D steps 20-27.
- Что должен показать Codex: PlaceholderVisual, MockupFrame, BrowserFrame, DashboardFrame, StatusChip, FloatingMetricCard, ActivityStream, BookCard, DiscussionThread, AccessPolicyPanel, KnowledgeGraphPanel, metadata format, responsive behavior.
- Что должен проверить пользователь: placeholders не выглядят как плохие финальные картинки; mockups share one ecosystem; UI grammar соответствует publishing infrastructure; responsive behavior stable.
- Какие решения пользователь должен принять: утвердить placeholder format, mockup shells, dashboard/browser/graph/access styles.
- Что считается passed: mockup/placeholder infrastructure approved as locked baseline.
- Locked Scope: PlaceholderVisual component, metadata format, aspect-ratio handling, MockupFrame chrome, BrowserFrame, DashboardFrame, FloatingMetricCard, StatusChip, ActivityStream, BookCard, DiscussionThread, AccessPolicyPanel, KnowledgeGraphPanel, responsive scaling rules.
- Unlocked Assets: actual screenshot/dashboard/diagram/image content inside approved frames and slots, if aspect ratio, frame, slot size, responsive behavior and layout do not change.
- Можно ли переходить дальше: только после явного подтверждения пользователя.

Review Gate 3. Hero System Review
- Когда выполняется: после Phase 4.
- Какие phases/roadmap-шаги входят: Phase 4A Hero Framework, Phase 4B Hero Application, Phase 4C Hero Polish, steps 28-40.
- Что должен показать Codex: all heroes together: Home, Platform, WeRead, WePub, WeBuzz, WeTalk, BookTree, Scribe, Authors, Institutions, Security, Pricing, About, Contact, KB, Terms.
- Что должен проверить пользователь: heroes разные, но принадлежат одной системе; every key page has a signature block; no cartoon visuals; no repeated generic layout; mobile heroes work.
- Какие решения пользователь должен принять: утвердить hero variants and placeholder direction for each page.
- Что считается passed: Hero system approved as locked baseline.
- Locked Scope: HeroSection, hero layout, hero spacing, hero typography, hero CTA placement, hero proportions, hero responsive rules, hero animations, Dashboard/Architecture/Product UI/Graph/Minimal Docs/Conversion hero variants.
- Unlocked Assets: hero placeholder images, screenshots, dashboard contents, architecture diagrams, reader UI screenshots and final graphics inside approved slots, if aspect ratio, slot, size, layout and responsive rules do not change.
- Можно ли переходить дальше: только после явного подтверждения пользователя.

Review Gate 4. Problem / Challenge Sections Review
- Когда выполняется: после Phase 5.
- Какие phases/roadmap-шаги входят: Phase 5A Problem Framework, Phase 5B Problem Application, Phase 5C Problem Consistency, steps 41-49.
- Что должен показать Codex: all problem/challenge sections across pages, including Home, Platform, product pages, business/security/pricing/supporting where present.
- Что должен проверить пользователь: problem sections are coherent, serious, publishing-specific and not repetitive; they do not rewrite copy or become decorative.
- Какие решения пользователь должен принять: утвердить Problem Matrix system and page-specific variants.
- Что считается passed: problem/challenge sections approved as locked baseline.
- Locked Scope: ProblemMatrix component/style, problem section spacing, card density, background variant, problem icon treatment, responsive matrix/stack behavior, page-specific problem variants.
- Unlocked Assets: icons inside approved icon system and fixed slots; no layout, spacing or typography changes.
- Можно ли переходить дальше: только после явного подтверждения пользователя.

Review Gate 5. Comparison Sections Review
- Когда выполняется: после Phase 6.
- Какие phases/roadmap-шаги входят: Phase 6A Comparison Framework, Phase 6B Comparison Application, Phase 6C Comparison Consistency, steps 50-56.
- Что должен показать Codex: all old/new, before/after, marketplace, security and pricing comparisons.
- Что должен проверить пользователь: comparisons are readable, not too dense, not visually identical, and do not alter claims.
- Какие решения пользователь должен принять: утвердить ComparisonBlock system and variations.
- Что считается passed: comparison system approved as locked baseline.
- Locked Scope: ComparisonBlock layout, old/new panel structure, badges/list style, spacing, borders, responsive stacking, comparison variants.
- Unlocked Assets: small icons or markers inside approved icon rules; no panel structure, copy, claims or responsive changes.
- Можно ли переходить дальше: только после явного подтверждения пользователя.

Review Gate 6. Workflow / Process Sections Review
- Когда выполняется: после Phase 7.
- Какие phases/roadmap-шаги входят: Phase 7A Workflow Framework, Phase 7B Workflow Application, Phase 7C Workflow Consistency, steps 57-64.
- Что должен показать Codex: all process/workflow/flow sections, connectors, mobile stack, motion behavior if used.
- Что должен проверить пользователь: workflows feel technical/product-led, not decorative; each process matches its page purpose; mobile is readable.
- Какие решения пользователь должен принять: утвердить ProcessFlow system and workflow variants.
- Что считается passed: workflow/process system approved as locked baseline.
- Locked Scope: ProcessFlow component, connector system, step card layout, workflow spacing, desktop horizontal/mobile vertical rules, workflow animation pattern, workflow variants.
- Unlocked Assets: icons inside approved icon system and fixed slots; no connector, spacing, order or responsive changes.
- Можно ли переходить дальше: только после явного подтверждения пользователя.

Review Gate 7. Product / Module / Feature Sections Review
- Когда выполняется: после Phase 8.
- Какие phases/roadmap-шаги входят: Phase 8A Product/Feature Framework, Phase 8B Product/Feature Application, Phase 8C Product/Feature Consistency, steps 65-72.
- Что должен показать Codex: product maps, module maps, tabs, feature cards, pathway cards, KB categories.
- Что должен проверить пользователь: feature sections are product-led, not repetitive card grids; product modules are clear; page differences use approved variants.
- Какие решения пользователь должен принять: утвердить ProductModuleMap/FeatureSection system.
- Что считается passed: product/feature system approved as locked baseline.
- Locked Scope: ProductModuleMap, FeatureSection, module card style, tabs/signature block behavior, feature grid density, pathway/category card layout, responsive behavior.
- Unlocked Assets: icons or screenshots inside approved slots; no tab behavior, module layout, feature card style or spacing changes.
- Можно ли переходить дальше: только после явного подтверждения пользователя.

Review Gate 8. Business / Metrics / Pricing / Enterprise Review
- Когда выполняется: после Phase 9.
- Какие phases/roadmap-шаги входят: Phase 9A Business/Metrics Framework, Phase 9B Business/Pricing Application, Phase 9C Business/Pricing Consistency, steps 73-79.
- Что должен показать Codex: metrics, pricing cards, pricing table, Authors business sections, Institutions enterprise sections, Security policy matrix, WePub economics.
- Что должен проверить пользователь: business tone is credible; no invented metrics; pricing is clear; enterprise pages still feel publishing-specific.
- Какие решения пользователь должен принять: утвердить metrics/pricing/business visual language and optional pricing billing visual decision.
- Что считается passed: business/pricing/enterprise system approved as locked baseline.
- Locked Scope: MetricsStrip/MetricCard, PlanCard, pricing table layout, business dashboard section rules, enterprise section style, policy matrix structure, count-up behavior if used.
- Unlocked Assets: optional billing panel image or dashboard screenshots inside approved slots; metrics values/prices/text never change without explicit content request.
- Можно ли переходить дальше: только после явного подтверждения пользователя.

Review Gate 9. Supporting / Docs / Forms / Legal Review
- Когда выполняется: после Phase 10.
- Какие phases/roadmap-шаги входят: Phase 10A Supporting Framework, Phase 10B Supporting Application, Phase 10C Supporting Consistency, steps 80-83.
- Что должен показать Codex: About, Contact form/modal, KB FAQ/docs layout, Terms legal layout.
- Что должен проверить пользователь: supporting pages are consistent, utility-focused, readable and not overdecorated; legal and FAQ text unchanged.
- Какие решения пользователь должен принять: утвердить supporting/docs/forms/legal direction and optional About roadmap visual decision.
- Что считается passed: supporting/docs/forms/legal system approved as locked baseline.
- Locked Scope: Contact form/modal visual system, FAQ accordion style/behavior, docs/legal typography and layout, About supporting section style, supporting page spacing.
- Unlocked Assets: optional About roadmap visual and KB search visual inside approved slots; no form behavior, legal layout or FAQ interaction changes.
- Можно ли переходить дальше: только после явного подтверждения пользователя.

Review Gate 10. CTA and Page Completion Review
- Когда выполняется: после Phase 11.
- Какие phases/roadmap-шаги входят: Phase 11A CTA Framework, Phase 11B CTA Application, Phase 11C Page-Level Balance, steps 84-88.
- Что должен показать Codex: all page endings, CTA sections, full-page visual rhythm for every page.
- Что должен проверить пользователь: pages feel complete; no visual cliff at bottom; CTAs are consistent but not monotonous; CTA text/hrefs unchanged.
- Какие решения пользователь должен принять: утвердить CTA system and page-level completion.
- Что считается passed: CTA/page completion approved as locked baseline.
- Locked Scope: CtaBlock variants, final CTA spacing, CTA button placement, final section backgrounds, page-ending rhythm, full-page balance rules.
- Unlocked Assets: no visual changes by default; only already approved image assets inside fixed slots may be replaced without CR.
- Можно ли переходить дальше: только после явного подтверждения пользователя.

Review Gate 11. Final QA Review
- Когда выполняется: после Phase 12.
- Какие phases/roadmap-шаги входят: Phase 12A Responsive/Mobile QA, Phase 12B Accessibility/Motion/Performance QA, Phase 12C Consistency/Regression/Final Report, steps 89-95.
- Что должен показать Codex: responsive/accessibility/performance results, content invariance check, build/routes regression, final placeholder inventory, remaining assets, known compromises.
- Что должен проверить пользователь: site is light, modern, product-led, infrastructure-oriented; no old bookish style; no forbidden gradients; mobile professional; placeholders clear; content unchanged.
- Какие решения пользователь должен принять: принять redesign as complete, prioritize asset replacement, decide staging/production deploy timing.
- Что считается passed: QA complete, all gates passed or documented, site ready for deploy decision.
- Locked Scope: all previously approved baselines, all final responsive/accessibility/performance fixes, final route/content invariance status, final placeholder inventory.
- Unlocked Assets: future replacement of approved placeholder images only when aspect ratio, slot, dimensions, layout and responsive rules do not change; all other changes require a new task or change request.
- Можно ли переходить дальше: this is final gate; further work only through separate tasks.

Если Review Gate не пройден:
- Следующий roadmap phase выполнять запрещено.
- Сначала исправляются замечания пользователя по текущему или предыдущему level.
- Нельзя говорить "исправим потом" для системного замечания.
- Нельзя продолжать реализацию, если пользователь не подтвердил текущий Gate.
- Если замечание затрагивает locked baseline, применяется Change Request Rules.
- После исправлений Codex должен снова провести review того же Gate или mini-review.

Минимальный формат отчета после Gate:
- Завершенный Gate:
- Входящие phases/roadmap-шаги:
- Измененные файлы:
- Обновленные компоненты:
- Обновленные страницы:
- Что визуально изменилось:
- Почему это соответствует Target Visual Language:
- Что стало locked baseline:
- Оставшиеся placeholder'ы:
- Assets, которые нужны от пользователя:
- Открытые вопросы:
- Риски:
- Следующий рекомендуемый phase:
- Требуется подтверждение пользователя: да.

**23. Locked Scope and Unlocked Assets**
Locked Scope фиксирует, какие части утвержденной системы нельзя менять дальше без Change Request. Unlocked Assets фиксирует, какие визуальные материалы можно заменять без Change Request, если не меняются slot, aspect ratio, dimensions, layout, responsive rules, component structure, typography, CTA placement, animation pattern и meaning.

| Review Gate | Locked Scope | Unlocked Assets | Can Change Without CR | Needs Change Request |
|---|---|---|---|---|
| Gate 1. Global Design Foundation | Typography, tokens, color system, spacing, radius, shadows, borders, focus, buttons, card base, section base, header, dropdowns, mobile menu, footer, icons, animation base | Future page-specific images are outside this gate | Nothing visual in foundation after approval | Any typography/token/component base change |
| Gate 2. Product Mockup / Placeholder Infrastructure | PlaceholderVisual, MockupFrame, BrowserFrame, DashboardFrame, StatusChip, FloatingMetricCard, ActivityStream, DiscussionThread, AccessPolicyPanel, KnowledgeGraphPanel, metadata, responsive frame behavior | Screenshot/dashboard/diagram content inside approved frames | Replace image/content inside approved frame and ratio | Frame chrome, metadata format, responsive behavior, component structure |
| Gate 3. Hero System | HeroSection, hero variants, hero layout, hero spacing, hero typography, CTA placement, proportions, responsive rules, hero animations | Hero images, screenshots, dashboard contents, diagrams, final graphics | Replace visual asset inside approved slot/aspect ratio | Hero layout, spacing, typography, CTA position, proportions, animations |
| Gate 4. Problem / Challenge Sections | ProblemMatrix, problem card style, density, spacing, background variant, responsive behavior | Icons inside approved style | Replace icon glyph only | Matrix layout, card style, spacing, typography, variants |
| Gate 5. Comparison Sections | ComparisonBlock, panel layout, old/new structure, badges/lists, responsive stacking | Icons/markers inside approved style | Replace icon/marker only | Panel structure, spacing, mobile stacking, claim presentation |
| Gate 6. Workflow / Process Sections | ProcessFlow, step layout, connector system, desktop/mobile rules, workflow motion | Icons inside approved style | Replace icon glyph only | Connector, step layout, animation, responsive stack |
| Gate 7. Product / Module / Feature Sections | ProductModuleMap, FeatureSection, tabs, module cards, pathway/category cards, responsive behavior | Icons/screenshots inside approved slots | Replace icon/screenshot with same dimensions/ratio | Module map, tabs behavior, card style, layout |
| Gate 8. Business / Metrics / Pricing / Enterprise | MetricsStrip, MetricCard, PlanCard, pricing table, enterprise sections, policy matrix | Optional billing/dashboard images inside approved slots | Replace approved image asset; content only by explicit content request | Metric style, pricing layout, plan hierarchy, new numbers/prices |
| Gate 9. Supporting / Docs / Forms / Legal | Form/modal styling, FAQ behavior, docs/legal layout, About supporting style | Optional About roadmap and KB search visual inside approved slots | Replace visual asset only | Form behavior, FAQ interaction, legal/docs layout, supporting spacing |
| Gate 10. CTA and Page Completion | CtaBlock variants, final section spacing, CTA placement, page ending rhythm | Previously approved visual assets inside fixed slots | Replace approved image only | CTA layout, text placement, section endings, page rhythm |
| Gate 11. Final QA | All approved baselines, final QA fixes, content/route invariance, final placeholder inventory | Future replacement of approved placeholder images | Replace image only if slot/ratio/layout/responsive unchanged | Any layout/component/style/content/route change |

Special rule for Unlocked Assets:
- Replacing an asset is allowed only when it is a true asset replacement.
- The replacement cannot require CSS changes.
- The replacement cannot change aspect ratio.
- The replacement cannot change visual slot size.
- The replacement cannot change layout balance.
- The replacement cannot change responsive behavior.
- The replacement cannot change component structure.
- The replacement cannot introduce prohibited visual language.

**24. Design Consistency Matrix**
| Design Area | Reviewed / Locked At | Status After Gate | Can Change Without CR? | Notes |
|---|---|---|---|---|
| Typography | Gate 1 | Locked | No | Font family, scale, line-height and heading style require CR after Gate 1. |
| Color Tokens | Gate 1 | Locked | No | Palette and semantic tokens require CR. |
| Spacing / Radius / Shadows | Gate 1 | Locked | No | Local spacing drift is prohibited. |
| Borders / Focus States | Gate 1 | Locked | No | Accessibility fixes allowed only if they do not alter system direction; otherwise CR. |
| Buttons / ActionLink | Gate 1 | Locked | No | CTA text/href changes are content tasks, not visual changes. |
| Cards | Gate 1 for base, Gates 4-9 for usage | Locked by layer | No visual change | Content can flow; style changes require CR. |
| Sections | Gate 1 for base, later gates for section types | Locked by layer | No visual change | Section type variants must remain approved. |
| Nav / Dropdown / Mobile Menu | Gate 1 | Locked | No | Link text/routes unchanged unless separate nav/content task. |
| Footer | Gate 1 | Locked | No | Legal/footer link content changes are separate tasks. |
| Icon System | Gate 1 | Locked | Limited | Individual glyph can change if stroke/size/style remain approved. |
| Animation | Gate 1, validated Gate 11 | Locked | No | Reduced-motion fixes allowed; new patterns require CR. |
| PlaceholderVisual | Gate 2 | Component locked | Asset only | Metadata/frame behavior require CR. |
| Product Mockups | Gate 2 | Frame locked, image not locked | Yes, asset only | Screenshot/dashboard content can change inside same frame/ratio. |
| Hero Layouts | Gate 3 | Locked | No | Hero visuals can change only inside approved slots. |
| Hero Placeholder Images | Gate 3 | Not locked as image assets | Yes | Aspect ratio, slot, size, layout and responsive rules cannot change. |
| Problem Sections | Gate 4 | Locked | Icons only | Layout/style changes require CR. |
| Comparison Sections | Gate 5 | Locked | Icons/markers only | Claims and structure cannot change. |
| Workflow Sections | Gate 6 | Locked | Icons only | Connector and step layout require CR. |
| Product/Feature Sections | Gate 7 | Locked | Images/icons only | Tabs/module layout require CR. |
| Metrics/Pricing | Gate 8 | Locked | No visual change | Prices, metrics and claims never change without explicit content request. |
| Forms/FAQ/Legal | Gate 9 | Locked | No visual change | Legal text never changes in visual tasks. |
| CTA Sections | Gate 10 | Locked | No visual change | CTA copy/hrefs unchanged unless explicit content task. |
| Content | Never changes in redesign | Protected | No | Text, CTA labels, routes and IA are invariant. |
| Routes | Never changes in redesign | Protected | No | Route changes are out of scope. |

**25. QA Checklist**
Level-first process:
- Roadmap выполнялся по системным уровням, а не по страницам.
- Каждая большая phase была разбита на subphases.
- После каждой subphase был выполнен Mini Review.
- Каждый Review Gate был проведен и подтвержден.
- Locked baselines не менялись без change request.
- Locked Scope каждого gate был зафиксирован.
- Unlocked Assets каждого gate были явно перечислены.
- No Silent Drift проверялся после каждой subphase and gate.
- Страничные различия достигнуты через approved variants.

Visual:
- no nav/card/dropdown/button gradients;
- no serif headings;
- no cartoon hero visuals;
- no generic startup blobs;
- product placeholders present where assets are missing;
- light site;
- teal restrained;
- each key page has a signature block;
- section patterns do not repeat mechanically.

Content:
- texts unchanged;
- CTA labels unchanged;
- hrefs/routes unchanged;
- pricing/security/legal claims unchanged;
- no invented metrics.

Responsive:
- desktop/tablet/mobile checked;
- mockups scale;
- no overflow;
- process flows stack correctly;
- pricing tables readable;
- legal/docs readable.

Accessibility:
- contrast;
- focus states;
- keyboard nav;
- dropdown/mobile menu behavior;
- form labels;
- FAQ interaction;
- reduced motion.

Performance:
- no heavy animation JS;
- no layout shift;
- optimized assets or semantic placeholders;
- lazy visuals where appropriate.

**26. Anti-Patterns**
Запрещены:
- page-first implementation that completes one full page before system levels are approved;
- skipping subphases or Mini Reviews;
- treating Mini Review as user approval;
- gradients in nav/cards/dropdowns/buttons/section backgrounds;
- blobs, gradient orbs, generic startup decoration;
- cartoon people and childlike book stacks;
- repeated hero layout on all pages;
- repeated card grids as main design answer;
- serif headings;
- teal overuse;
- dark-mode site;
- heavy shadows;
- glassmorphism everywhere;
- animation everywhere;
- text rewriting;
- route changes;
- generated large images;
- final-looking placeholders without Russian descriptions;
- changing locked baselines without change request;
- changing locked scope without change request;
- changing layout while pretending to replace only an asset;
- changing asset aspect ratio inside an approved slot without change request;
- creating fork components instead of fixing the shared system;
- local CSS patches for systemic component problems.
- silent design drift across multiple small steps;
- page-level style exceptions without documenting why approved variants are insufficient.

**27. Final Definition of Done**
Работа готова, только если:
- roadmap выполнялся по системным уровням, а не по страницам;
- roadmap выполнялся через phases and subphases;
- после каждой subphase был Mini Review;
- каждый level-based Review Gate был пройден;
- locked baselines не нарушались без change request;
- locked scope не нарушался без change request;
- unlocked assets менялись только в пределах approved slots/aspect ratios/layouts;
- No Silent Drift соблюдался на протяжении всей реализации;
- все системные компоненты применены консистентно;
- страничные различия достигнуты через утвержденные variants, а не через хаотичные локальные стили;
- все placeholders привязаны к актуальным phases and review gates, а не к хрупким step numbers;
- Component Lifecycle Matrix остается актуальной;
- Design Consistency Matrix остается актуальной;
- каждый шаг выполнялся отдельно по команде пользователя;
- после каждого шага был отчет;
- все visual tasks сформулированы по-русски;
- Codex не генерировал большие картинки;
- placeholders имеют понятные описания;
- тексты/CTA/routes не изменены;
- сайт светлый, product-led, infrastructure-oriented;
- placeholders можно заменить готовыми изображениями без переписывания layout;
- build и responsive/accessibility/performance QA пройдены;
- финальный placeholder/asset inventory актуален;
- пользователь принял Final QA Review.

# Appendix A. Development Governance
Appendix A расширяет основную спецификацию и не заменяет существующие разделы. Его цель — защитить долгую пошаговую разработку от потери контекста, scope creep, silent drift, случайного нарушения locked baselines и размывания visual language.

Все правила Appendix A действуют поверх основного документа. Если для применения правила нужно изменить существующий roadmap, Review Gate, numbering или structure, такое изменение не выполняется автоматически. Оно сначала фиксируется как отдельное решение пользователя.

## A1. Design Decision Log
Design Decision Log — обязательный журнал принятых дизайн-решений. Во время многомесячной разработки необходимо помнить не только что было принято, но и почему это было принято.

После каждого Review Gate Codex обязан добавить новую запись в журнал решений. Запись должна фиксировать approved direction, отклоненные альтернативы, affected components, affected locked baselines и будущие решения, которые зависят от этого решения.

Decision Log является обязательной частью процесса. Review Gate не считается полностью закрытым, пока соответствующая запись не добавлена или пользователь явно не сказал не добавлять запись для конкретного gate.

Структура записи:
- ID:
- Дата:
- Review Gate:
- Категория:
- Принятое решение:
- Причина:
- Какие альтернативы рассматривались:
- Почему они были отклонены:
- Кто утвердил:
- Какие компоненты затронуты:
- Какие Locked Baselines затронуты:
- Какие будущие решения могут зависеть от этого:

Примеры категорий:
- Typography
- Hero
- Placeholder
- Animation
- Cards
- Sections
- Pricing
- Responsive
- Accessibility
- Mockups
- Workflow
- CTA
- Navigation
- Color System
- Document Structure

Правила ведения:
- ID должен быть стабильным и коротким, например `DDL-001`.
- Дата должна фиксироваться в формате `YYYY-MM-DD`.
- Категория должна быть одной из существующих или новой только при необходимости.
- Если решение затрагивает locked baseline, это должно быть явно указано.
- Если решение создает зависимость для будущих phases, это должно быть явно указано.
- Если решение отклоняет альтернативу, нужно указать реальную причину, а не формальное "не подходит".

## A2. Future Iteration Backlog
Future Iteration Backlog — список идей, которые сознательно не входят в текущий scope. Он нужен для того, чтобы полезные идеи не терялись, но и не раздували текущий roadmap.

Любая новая идея, которая не является прямым выполнением текущего roadmap, сначала попадает в Future Iteration Backlog. Она не становится частью текущей реализации без отдельного решения пользователя.

Структура записи:
- Название:
- Краткое описание:
- Причина, почему не входит в текущую версию:
- Приоритет:
- Возможная версия реализации:
- Зависимости:
- Влияет ли на Locked Baselines:

Примеры backlog ideas:
- Dark Mode.
- Interactive Knowledge Graph.
- 3D Product Visuals.
- Animated Architecture Map.
- Interactive Module Explorer.
- Motion Expansion.
- Advanced Dashboards.
- Reader Heatmaps.
- Live Demo Data.

Правила приоритета:
- `Low`: идея полезна, но не нужна для текущего redesign.
- `Medium`: идея может улучшить продуктовую выразительность, но требует отдельного scope.
- `High`: идея важна для следующей крупной итерации, но все равно не входит в текущий roadmap без решения пользователя.

Правила зависимости:
- Если идея влияет на locked baseline, ее нельзя реализовывать как маленький локальный patch.
- Если идея требует новых assets, она должна иметь отдельное asset brief.
- Если идея требует новых interactions, она должна проходить через отдельный motion/accessibility review.
- Если идея может изменить information architecture, она выходит за рамки текущего visual redesign.

## A3. Scope Protection Rules
Scope Protection Rules защищают проект от незаметного расширения задач во время реализации.

Если во время реализации появляется новая идея:
- она сначала записывается в Future Iteration Backlog;
- она не добавляется автоматически в текущий roadmap;
- Codex должен объяснить, является ли идея текущим scope, change request или future iteration;
- пользователь должен отдельно подтвердить, если идея должна войти в текущую реализацию.

Любое расширение текущего roadmap требует отдельного решения пользователя.

Запрещается:
- превращать polish в новый feature scope;
- добавлять новые sections, которых нет в roadmap, без отдельного решения;
- добавлять новые page types без отдельного решения;
- добавлять новые interactive features без отдельного решения;
- менять product positioning под видом visual improvement;
- менять content, CTA, routes или information architecture под видом redesign;
- расширять motion system после approval без change request;
- добавлять new assets, которые требуют layout changes, без change request.

Если идея кажется полезной, но не нужна для текущего gate:
- добавить ее в Future Iteration Backlog;
- указать, почему она не входит в текущую версию;
- указать, какой locked baseline она может затронуть;
- продолжить текущий roadmap без расширения scope.

## A4. Decision Hierarchy
Decision Hierarchy определяет, какое правило важнее, если два правила или желания противоречат друг другу.

Приоритеты от большего к меньшему:

1. Non-Negotiable Constraints.
2. Target Visual Language.
3. Design Tokens.
4. Approved Component Systems.
5. Locked Baselines.
6. Locked Scope.
7. Roadmap.
8. Page-by-Page Plan.
9. Placeholder Inventory.
10. User preference for current iteration.

Правила применения:
- Если current preference конфликтует с Non-Negotiable Constraints, выполняются Non-Negotiable Constraints.
- Если page-specific желание конфликтует с approved component system, нужен Change Request.
- Если placeholder brief конфликтует с Target Visual Language, placeholder brief нужно уточнить.
- Если roadmap step конфликтует с locked scope, нужен Change Request.
- Если новая идея конфликтует с текущим scope, она идет в Future Iteration Backlog.

Decision Hierarchy не отменяет пользователя. Она помогает Codex объяснить конфликт и запросить явное решение, когда нужно нарушить более высокий уровень.

## A5. Design Stability Principles
Design Stability Principles действуют до самого конца проекта. Они защищают единый visual language и снижают вероятность хаотичных локальных решений.

Принципы:
- Лучше повторно использовать уже утвержденный компонент, чем создавать новый.
- Лучше создать новый approved variant, чем локальный exception.
- Лучше добавить Change Request, чем тихо менять систему.
- Лучше заменить Placeholder, чем менять Layout.
- Лучше изменить Asset, чем менять Hero.
- Лучше исправить системную проблему, чем делать локальный CSS patch.
- Лучше сохранить approved spacing, чем визуально "подогнать" одну страницу.
- Лучше уменьшить scope, чем нарушить locked baseline.
- Лучше записать идею в Future Iteration Backlog, чем расширять текущий roadmap.
- Лучше провести Mini Review раньше, чем искать drift в конце phase.
- Лучше сохранить publishing identity, чем сделать более generic SaaS-паттерн.
- Лучше использовать restrained motion, чем добавлять эффект ради визуальной выразительности.

Если принцип конфликтует с локальным визуальным желанием, Codex должен остановиться и объяснить tradeoff.

## A6. Project Health Checklist
Project Health Checklist выполняется Codex раз в несколько Review Gates, минимум после Gate 3, Gate 7, Gate 10 и Gate 11. Пользователь может запросить его в любой момент.

Чеклист:
- Не выросло ли количество локальных exceptions?
- Не появились ли fork-компоненты?
- Не нарушен ли Target Visual Language?
- Не появилось ли слишком много page-specific CSS?
- Не нарушены ли Locked Baselines?
- Не нарушен ли Locked Scope?
- Не используются ли Unlocked Assets для скрытого изменения layout?
- Не потерялась ли publishing identity?
- Не превратился ли сайт в generic SaaS?
- Не появились ли запрещенные visual patterns?
- Не начали ли pages выглядеть слишком одинаково?
- Не появились ли новые gradients в запрещенных местах?
- Не появились ли cartoon visuals, blobs или decorative illustrations?
- Не ухудшился ли mobile layout?
- Не накопились ли accessibility risks?
- Не появились ли content/CTA/route changes?
- Не устарел ли Placeholder Inventory?
- Не нужно ли обновить Future Iteration Backlog?
- Все ли Design Decision Log entries добавлены после Review Gates?

Если Project Health Checklist выявляет проблему:
- определить, локальная это проблема или системная;
- если системная, использовать Change Request Rules;
- если future idea, перенести в Future Iteration Backlog;
- если broken locked baseline, остановить следующий phase до исправления.

## A7. Version History
Version History фиксирует изменения самой спецификации. Это помогает сопровождать документ без переписывания его структуры.

Структура записи:
- Version:
- Date:
- Summary:
- Reason:
- Sections Changed:
- Compatibility:
- Current Version:

Правила:
- Version History обновляется только при изменении самой спецификации.
- Мелкие правки опечаток можно фиксировать как patch-level note.
- Изменения roadmap, Review Gates, numbering или locked scope считаются major governance changes.
- Добавление appendices или clarification rules считается minor governance change, если не ломает существующую структуру.
- Compatibility должна объяснять, совместимо ли изменение с уже утвержденными gates and locked baselines.

Текущая запись:
- Version: `1.1`
- Date: `2026-07-05`
- Summary: Added Appendix A. Development Governance.
- Reason: Зафиксировать Decision Log, Future Iteration Backlog, Scope Protection Rules, Decision Hierarchy, Design Stability Principles, Project Health Checklist and Version History без изменения основной спецификации.
- Sections Changed: Added Appendix A only.
- Compatibility: Fully compatible with existing specification; no roadmap, Review Gates, numbering or existing sections changed.
- Current Version: yes.
