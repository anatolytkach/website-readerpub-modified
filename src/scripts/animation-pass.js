const animationPassState = (window.readerPubAnimationPassState ||= {
	hasRunInitialSetup: false,
	isClientNavigation: false,
	greenWaveCurrentOffset: 0,
	greenWaveTargetOffset: 0,
});
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const revealSelectors = [
	".content > .hero-section",
	".content > .network-hero",
	".content > .section",
	".content > .proof-section",
	".content > .pricing-source-section",
	".content > .pricing-source-sections",
	".section-header",
	".hero-copy",
	".network-hero-copy",
	".proof-copy",
	".cta-block-copy",
	".flow-chain",
	".comparison-list",
	".faq-list",
	".kb-category",
	".kb-search-panel",
	".section-media",
	".proof-media",
	".image-block",
	".image-placeholder",
	"figure",
	"picture",
];

const cardGroupSelector = ".card-grid, .model-grid, .platform-commerce-cards, .webuzz-overview-card-grid, .indie-protection-books";
const heroMediaSelectors = [
	".hero-section .hero-media",
	".network-hero .institutions-network-media",
	".network-hero > .image-block",
];
const mediaRevealSelector = [
	".hero-media",
	".institutions-network-media",
	".section-media",
	".proof-media",
	".image-block",
	".image-placeholder",
	"figure",
	"picture",
].join(",");
const mediaRevealContextSelector = ".hero-section, .network-hero, .section, .proof-section, .pricing-source-section, .pricing-source-sections, section";
const mediaRevealReferenceSelector = ".hero-copy, .network-hero-copy, .proof-copy, .section-header";
const revealExcludedAreaSelector = ".nav, .nav-overlay, .site-footer, .modal-content";
const cardExcludedAreaSelector = ".nav, .nav-overlay, .site-footer, .hero-section, .network-hero, .cta-block, form, .modal-content";
const backgroundParallaxSelector = ".section.section--gray, .section.section--green, .institutions-expanded-access-grid";
const goodCardSelector = [
	".card--good",
	".section--green .card",
	".home-readerpub-model-card",
	".home-readerpub-publishing-card",
	".platform-readerpub-model-card",
	".readerpub-model-card",
	".pricing-readerpub-model-card",
	".wepub-readerpub-path-card",
	".booktree-with-card",
	".security-readerpub-solution-card",
	".security-protected-book-card",
	".webuzz-legacy-solution-card",
	".webuzz-overview-card--green",
].join(",");
const badCardSelector = [
	".section--gray .card",
	".section[class*='problem'] .card",
	".card-grid[class*='problem'] .card",
	"[class*='problem-grid'] .card",
	".card[class*='old']",
	".card[class*='traditional']",
	".card[class*='marketplace']",
	".card[class*='without']",
	".card[class*='fragmented']",
	".card[class*='loss']",
	".card[class*='fail']",
].join(",");
const cardRevealDuration = 1240;
const cardRevealDelay = 360;
const cardRiseRevealDelay = 140;
const cardRevealThreshold = 0.65;
const cardRowTopTolerance = 8;
const cardRevealDirections = ["left", "right", "bottom", "fade", "rise"];
const greenWaveScrollSpeed = 0.64;
const greenWaveEase = 0.18;
const greenWaveSettleDistance = 0.08;

const revealedElements = new WeakSet();
const revealedCards = new WeakSet();
let revealObserver;
let revealElementsByTarget = new WeakMap();
let mediaRevealSentinels = [];
let cardRevealObserver;
let cardRevealRowsByTarget = new WeakMap();
let cardNaturalRects = new WeakMap();
let cardRevealTimers = [];
let cardRevealSentinels = [];
let heroRevealTimers = [];
let backgroundParallaxTargets = [];
let backgroundParallaxFrame = 0;
let hasBackgroundParallaxListeners = false;
let greenWaveLastScrollY;
let greenWaveCurrentOffset = animationPassState.greenWaveCurrentOffset || 0;
let greenWaveTargetOffset = animationPassState.greenWaveTargetOffset || 0;
let isClientNavigation = animationPassState.isClientNavigation;
let hasRunInitialSetup = animationPassState.hasRunInitialSetup;
const supportsIntersectionObserver = "IntersectionObserver" in window;

const setClientNavigation = (value) => {
	isClientNavigation = value;
	animationPassState.isClientNavigation = value;
};

const setHasRunInitialSetup = (value) => {
	hasRunInitialSetup = value;
	animationPassState.hasRunInitialSetup = value;
};

const uniqueElements = (selectors) => {
	return [...new Set(selectors.flatMap((selector) => [...document.querySelectorAll(selector)]))].filter(
		(element) => element instanceof HTMLElement,
	);
};

const revealElement = (element, observerTarget = element) => {
	element.classList.add("is-revealed");
	revealedElements.add(element);
	revealObserver?.unobserve(observerTarget);
};

const revealObserverTargetElements = (observerTarget) => {
	const elements = revealElementsByTarget.get(observerTarget);

	if (elements) {
		for (const element of elements) {
			element.classList.add("is-revealed");
			revealedElements.add(element);
		}

		revealObserver?.unobserve(observerTarget);
		if (observerTarget instanceof HTMLElement && observerTarget.hasAttribute("data-media-reveal-sentinel")) {
			observerTarget.remove();
		}
		return;
	}

	revealElement(observerTarget);
};

const clearMediaRevealSentinels = () => {
	for (const sentinel of mediaRevealSentinels) {
		sentinel.remove();
	}

	mediaRevealSentinels = [];

	for (const context of document.querySelectorAll("[data-media-reveal-position-patched]")) {
		context.style.position = context.getAttribute("data-media-reveal-original-position") || "";
		context.removeAttribute("data-media-reveal-original-position");
		context.removeAttribute("data-media-reveal-position-patched");
	}
};

const clearMediaRevealDirections = () => {
	for (const element of document.querySelectorAll("[data-media-reveal-direction]")) {
		element.removeAttribute("data-media-reveal-direction");
	}
};

const getExplicitMediaRevealDirection = (element) => {
	const direction = element.getAttribute("data-media-reveal-origin");

	return direction === "left" || direction === "right" ? direction : undefined;
};

const getLayoutRect = (element) => {
	if (!(element instanceof HTMLElement)) {
		return undefined;
	}

	const width = element.offsetWidth;
	const height = element.offsetHeight;

	if (width <= 0 || height <= 0) {
		return element.getBoundingClientRect();
	}

	let left = 0;
	let top = 0;
	let current = element;

	while (current instanceof HTMLElement) {
		left += current.offsetLeft;
		top += current.offsetTop;
		current = current.offsetParent;
	}

	return {
		left,
		top,
		right: left + width,
		bottom: top + height,
		width,
		height,
	};
};

const getMediaRevealReference = (element, context) => {
	if (!(context instanceof HTMLElement)) {
		return undefined;
	}

	return [...context.children].find((child) => {
		return child instanceof HTMLElement && child !== element && child.matches(mediaRevealReferenceSelector);
	});
};

const setMediaRevealDirection = (element) => {
	if (!(element instanceof HTMLElement) || !element.matches(mediaRevealSelector)) {
		return;
	}

	const explicitDirection = getExplicitMediaRevealDirection(element);

	if (explicitDirection) {
		element.setAttribute("data-media-reveal-direction", explicitDirection);
		return;
	}

	const context = element.closest(mediaRevealContextSelector);
	const elementRect = getLayoutRect(element);
	const contextRect = context instanceof HTMLElement ? getLayoutRect(context) : undefined;

	if (!elementRect || !contextRect || elementRect.width <= 0 || elementRect.height <= 0 || contextRect.width <= 0) {
		return;
	}

	const elementCenter = elementRect.left + elementRect.width / 2;
	const reference = getMediaRevealReference(element, context);
	const referenceRect = reference ? getLayoutRect(reference) : undefined;
	const tolerance = Math.min(24, Math.max(8, contextRect.width * 0.02));

	if (referenceRect && referenceRect.width > 0 && referenceRect.height > 0) {
		const referenceCenter = referenceRect.left + referenceRect.width / 2;

		if (elementRect.right <= referenceRect.left + tolerance || elementCenter < referenceCenter - tolerance) {
			element.setAttribute("data-media-reveal-direction", "left");
			return;
		}

		if (elementRect.left >= referenceRect.right - tolerance || elementCenter > referenceCenter + tolerance) {
			element.setAttribute("data-media-reveal-direction", "right");
			return;
		}
	}

	const contextCenter = contextRect.left + contextRect.width / 2;
	element.setAttribute("data-media-reveal-direction", elementCenter < contextCenter ? "left" : "right");
};

const getRevealObserverTarget = (element) => {
	if (element instanceof HTMLElement && element.matches(mediaRevealSelector)) {
		const context = element.closest(mediaRevealContextSelector);

		if (context instanceof HTMLElement) {
			const elementRect = getLayoutRect(element);
			const contextRect = getLayoutRect(context);

			if (!elementRect || !contextRect || elementRect.width <= 0 || elementRect.height <= 0) {
				return context;
			}

			const contextPosition = window.getComputedStyle(context).position;

			if (contextPosition === "static") {
				context.setAttribute("data-media-reveal-original-position", context.style.position);
				context.setAttribute("data-media-reveal-position-patched", "");
				context.style.position = "relative";
			}

			const sentinel = document.createElement("span");
			sentinel.setAttribute("aria-hidden", "true");
			sentinel.setAttribute("data-media-reveal-sentinel", "");
			sentinel.style.cssText = [
				"position:absolute",
				"left:0",
				`top:${Math.max(0, elementRect.top - contextRect.top)}px`,
				"width:1px",
				`height:${Math.max(1, elementRect.height)}px`,
				"pointer-events:none",
				"visibility:hidden",
			].join(";");

			context.append(sentinel);
			mediaRevealSentinels.push(sentinel);
			return sentinel;
		}
	}

	return element;
};

const shouldRevealObservedTargetImmediately = (target) => {
	if (!(target instanceof Element)) {
		return false;
	}

	const rect = target.getBoundingClientRect();
	const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

	return rect.top <= viewportHeight * 0.92;
};

const clearCardRevealTimers = () => {
	for (const timer of cardRevealTimers) {
		window.clearTimeout(timer);
	}

	cardRevealTimers = [];
};

const clearHeroRevealTimers = () => {
	for (const timer of heroRevealTimers) {
		window.clearTimeout(timer);
	}

	heroRevealTimers = [];
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const isGreenParallaxTarget = (element) => {
	return element.matches(".section--green, .institutions-expanded-access-grid");
};

const getScrollY = () => {
	return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
};

const setGreenWaveOffset = (offset) => {
	document.documentElement.style.setProperty("--green-edge-wave-scroll-x", `${offset.toFixed(2)}px`);
	animationPassState.greenWaveCurrentOffset = offset;
};

const updateGreenWaveScrollTarget = () => {
	const scrollY = getScrollY();

	if (greenWaveLastScrollY === undefined) {
		greenWaveLastScrollY = scrollY;
		return;
	}

	const scrollDelta = Math.abs(scrollY - greenWaveLastScrollY);
	greenWaveLastScrollY = scrollY;

	if (scrollDelta <= 0) {
		return;
	}

	greenWaveTargetOffset += scrollDelta * greenWaveScrollSpeed;
	animationPassState.greenWaveTargetOffset = greenWaveTargetOffset;
};

const updateGreenWaveOffset = () => {
	if (reduceMotionQuery.matches) {
		greenWaveCurrentOffset = 0;
		greenWaveTargetOffset = 0;
		animationPassState.greenWaveTargetOffset = 0;
		setGreenWaveOffset(0);
		return false;
	}

	const distance = greenWaveTargetOffset - greenWaveCurrentOffset;

	if (Math.abs(distance) <= greenWaveSettleDistance) {
		greenWaveCurrentOffset = greenWaveTargetOffset;
		setGreenWaveOffset(greenWaveCurrentOffset);
		return false;
	}

	greenWaveCurrentOffset += distance * greenWaveEase;
	setGreenWaveOffset(greenWaveCurrentOffset);
	return true;
};

const updateBackgroundParallax = () => {
	backgroundParallaxFrame = 0;
	const shouldContinueGreenWave = updateGreenWaveOffset();

	if (reduceMotionQuery.matches) {
		for (const target of backgroundParallaxTargets) {
			target.style.setProperty("--section-bg-parallax-y", "0px");
		}

		return;
	}

	const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
	const maxOffset = Math.min(420, viewportHeight * 0.46);

	for (const target of backgroundParallaxTargets) {
		const rect = target.getBoundingClientRect();

		if (rect.bottom < -viewportHeight * 0.25 || rect.top > viewportHeight * 1.25) {
			continue;
		}

		const rawOffset = (viewportHeight * 0.5 - rect.top) * 0.42;
		const offset = isGreenParallaxTarget(target) ? rawOffset : clamp(rawOffset, -maxOffset, maxOffset);

		target.style.setProperty("--section-bg-parallax-y", `${offset.toFixed(2)}px`);
	}

	if (shouldContinueGreenWave) {
		requestBackgroundParallaxUpdate();
	}
};

const requestBackgroundParallaxUpdate = () => {
	updateGreenWaveScrollTarget();

	if (backgroundParallaxFrame) {
		return;
	}

	backgroundParallaxFrame = window.requestAnimationFrame(updateBackgroundParallax);
};

const setupBackgroundParallax = () => {
	backgroundParallaxTargets = uniqueElements([backgroundParallaxSelector]);
	greenWaveLastScrollY = getScrollY();

	if (!hasBackgroundParallaxListeners) {
		window.addEventListener("scroll", requestBackgroundParallaxUpdate, { passive: true });
		window.addEventListener("resize", requestBackgroundParallaxUpdate);
		hasBackgroundParallaxListeners = true;
	}

	requestBackgroundParallaxUpdate();
};

const getNaturalRect = (element) => {
	return cardNaturalRects.get(element) || element.getBoundingClientRect();
};

const getNextElementSibling = (element) => {
	let next = element.nextElementSibling;

	while (next instanceof HTMLElement && next.matches("script, style")) {
		next = next.nextElementSibling;
	}

	return next;
};

const isLowerGreenRevealCard = (card) => {
	const container = getGreenRevealContainer(card);
	const next = container ? getNextElementSibling(container) : undefined;

	return next instanceof HTMLElement && next.matches(".cta-block");
};

const getGreenRevealContainer = (card) => {
	let current = card.parentElement;

	while (current instanceof HTMLElement) {
		if (current.matches(".section--green, .institutions-expanded-access-grid")) {
			return current;
		}

		current = current.parentElement;
	}

	return undefined;
};

const clearCardRevealSentinels = () => {
	for (const sentinel of cardRevealSentinels) {
		sentinel.remove();
	}

	cardRevealSentinels = [];

	for (const group of document.querySelectorAll("[data-card-reveal-position-patched]")) {
		group.style.position = group.getAttribute("data-card-reveal-original-position") || "";
		group.removeAttribute("data-card-reveal-original-position");
		group.removeAttribute("data-card-reveal-position-patched");
	}
};

const shouldRevealElement = (element) => {
	if (element.matches(".legal-page")) {
		return false;
	}

	if (isGreenParallaxTarget(element)) {
		return false;
	}

	if (element.closest(".hero-section, .network-hero") && element.matches(".hero-media, .image-block, figure, picture")) {
		return false;
	}

	return !element.closest(revealExcludedAreaSelector);
};

const isGraySectionCard = (card) => {
	return card instanceof HTMLElement && Boolean(card.closest(".section--gray"));
};

const isAnimationCard = (card) => {
	if (!(card instanceof HTMLElement)) {
		return false;
	}

	if (isGraySectionCard(card)) {
		return false;
	}

	if (!card.classList.contains("card")) {
		return false;
	}

	const isProtectedBookRevealCard = card.matches(".security-protected-book-card");

	if (card.matches("a, .card--link, .book-card, .footer-cta") && !isProtectedBookRevealCard) {
		return false;
	}

	if (card.closest("a, .book-card-link") && !isProtectedBookRevealCard) {
		return false;
	}

	if (card.closest(cardExcludedAreaSelector)) {
		return false;
	}

	if (!card.classList.contains("card--good") && card.matches(badCardSelector)) {
		return false;
	}

	return true;
};

const isRevealOnlyCard = (card) => {
	return card instanceof HTMLElement && !isGraySectionCard(card) && !card.matches(badCardSelector) && card.matches(".home-problem-grid .card--link");
};

const shouldTreatAsGoodCard = (card) => {
	if (!(card instanceof HTMLElement)) {
		return false;
	}

	if (card.matches(goodCardSelector)) {
		return true;
	}

	if (card.matches(badCardSelector)) {
		return false;
	}

	if (card.matches("a, .card--link, .book-card, .footer-cta") && !card.matches(".security-protected-book-card")) {
		return false;
	}

	return !card.closest(cardExcludedAreaSelector);
};

const directCardsForGroup = (group) => {
	const directCards = [...group.children].filter(
		(child) => child instanceof HTMLElement && child.classList.contains("card"),
	);

	if (directCards.length > 0) {
		return directCards;
	}

	return [...group.querySelectorAll(".card")];
};

const getAnimationCards = (group) => directCardsForGroup(group).filter((card) => isAnimationCard(card) || isRevealOnlyCard(card));

const getCardRevealGroups = () => {
	const groups = new Set(document.querySelectorAll(cardGroupSelector));

	for (const card of document.querySelectorAll("[data-card-reveal]")) {
		const existingGroup = card.closest(cardGroupSelector);

		if (existingGroup instanceof HTMLElement) {
			groups.add(existingGroup);
		} else if (card.parentElement) {
			groups.add(card.parentElement);
		}
	}

	return [...groups].filter((group) => group instanceof HTMLElement && getAnimationCards(group).length > 0);
};

const getCardRevealRows = () => {
	const rows = [];

	for (const group of getCardRevealGroups()) {
		const groupRows = [];
		const cards = getAnimationCards(group);

		for (const card of cards) {
			const rect = getNaturalRect(card);

			if (rect.width <= 0 || rect.height <= 0) {
				continue;
			}

			const rowTop = Math.round(rect.top);
			let row = groupRows.find(({ top }) => Math.abs(top - rowTop) <= cardRowTopTolerance);

			if (!row) {
				row = { top: rowTop, cards: [] };
				groupRows.push(row);
			}

			row.top = Math.min(row.top, rowTop);
			row.cards.push(card);
		}

		const sortedRows = groupRows.sort((a, b) => a.top - b.top).map((row) => ({
			group,
			cards: row.cards.sort((a, b) => getNaturalRect(a).left - getNaturalRect(b).left),
		}));

		setGoodCardRevealDirectionsForRows(sortedRows);
		rows.push(...sortedRows);
	}

	return rows;
};

const isGoodRevealCard = (card) => card instanceof HTMLElement && card.classList.contains("card--good");

const getGreenContainerCardRows = (container) => {
	const cards = [
		...new Set(
			[...container.querySelectorAll(cardGroupSelector)].flatMap((group) =>
				group instanceof HTMLElement ? getAnimationCards(group).filter((card) => isGoodRevealCard(card)) : [],
			),
		),
	];
	const rows = [];

	for (const card of cards) {
		const rect = getNaturalRect(card);

		if (rect.width <= 0 || rect.height <= 0) {
			continue;
		}

		const rowTop = Math.round(rect.top);
		let row = rows.find(({ top }) => Math.abs(top - rowTop) <= cardRowTopTolerance);

		if (!row) {
			row = { top: rowTop, cards: [] };
			rows.push(row);
		}

		row.top = Math.min(row.top, rowTop);
		row.cards.push(card);
	}

	return rows.sort((a, b) => a.top - b.top);
};

const getGreenRevealRowState = (card) => {
	const container = getGreenRevealContainer(card);

	if (!(container instanceof HTMLElement)) {
		return undefined;
	}

	const rows = getGreenContainerCardRows(container);

	if (rows.length < 1) {
		return undefined;
	}

	const cardTop = Math.round(getNaturalRect(card).top);
	const index = rows.findIndex((row) => Math.abs(row.top - cardTop) <= cardRowTopTolerance);

	return index >= 0 ? { index, count: rows.length } : undefined;
};

const shouldRiseAsNonBottomGreenCardRow = (card) => {
	const rowState = getGreenRevealRowState(card);

	return rowState ? rowState.index < rowState.count - 1 : false;
};

const shouldRiseFarAsBottomGreenCardRow = (card) => {
	const rowState = getGreenRevealRowState(card);

	return rowState ? rowState.index === rowState.count - 1 : false;
};

const isPortraitViewport = () => {
	const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1;
	const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
	return viewportHeight >= viewportWidth;
};

const isWhiteBackgroundRevealCard = (card) => card instanceof HTMLElement && !getGreenRevealContainer(card);

const getNonOverflowBottomRevealOffset = (card) => {
	const rect = getNaturalRect(card);
	const page = document.querySelector(".page");
	const pageBottom = page instanceof HTMLElement ? page.getBoundingClientRect().bottom : document.body.getBoundingClientRect().bottom;
	const desiredOffset = (window.innerHeight || document.documentElement.clientHeight || 1) + 48;
	const availableOffset = pageBottom - rect.bottom - 1;

	return Math.max(0, Math.min(desiredOffset, availableOffset));
};

const setGoodCardRevealOffset = (card, direction, riseDistanceMultiplier = 1) => {
	const rect = getNaturalRect(card);
	const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1;
	const gutter = 64;
	const offsetX =
		direction === "bottom" || direction === "fade" || direction === "rise"
			? 0
			: direction === "left"
				? -gutter - rect.right
				: viewportWidth + gutter - rect.left;
	const offsetY =
		direction === "bottom"
			? `${getNonOverflowBottomRevealOffset(card).toFixed(2)}px`
			: direction === "rise"
				? riseDistanceMultiplier === 1
					? "var(--card-good-reveal-offset)"
					: `calc(var(--card-good-reveal-offset) * ${riseDistanceMultiplier})`
				: "0px";

	card.setAttribute("data-card-reveal-direction", direction);
	card.style.setProperty("--card-reveal-start-x", `${offsetX.toFixed(2)}px`);
	card.style.setProperty("--card-reveal-start-y", offsetY);
};

const getDeclaredCardRevealDirection = (card) => {
	const source = card.closest("[data-card-reveal-origin]");
	const direction = source?.getAttribute("data-card-reveal-origin");

	return direction && cardRevealDirections.includes(direction) ? direction : undefined;
};

const getExplicitCardRevealDirection = (card) => {
	if (isWhiteBackgroundRevealCard(card)) {
		return "rise";
	}

	const direction = getDeclaredCardRevealDirection(card);

	if (direction) {
		return direction;
	}

	if (getGreenRevealContainer(card)) {
		return "fade";
	}

	return isLowerGreenRevealCard(card) ? "bottom" : undefined;
};

const getPreferredCardRevealDirection = (card, preferredDirection) => {
	if (isWhiteBackgroundRevealCard(card)) {
		return "rise";
	}

	if (preferredDirection && getGreenRevealContainer(card)) {
		return preferredDirection;
	}

	const declaredDirection = getDeclaredCardRevealDirection(card);

	if (declaredDirection) {
		return declaredDirection;
	}

	return preferredDirection || getExplicitCardRevealDirection(card);
};

const getCardRevealOrderMode = (cards) => {
	const source = cards.find((card) => card instanceof HTMLElement && card.closest("[data-card-reveal-order]"));
	const mode = source?.closest("[data-card-reveal-order]")?.getAttribute("data-card-reveal-order");

	return mode === "inner-first" ? mode : undefined;
};

const setGoodCardRevealDirections = (cards, preferredDirection, riseDistanceMultiplier = 1) => {
	const goodCards = cards.filter((card) => isGoodRevealCard(card));

	if (goodCards.length < 1) {
		return;
	}

	if (goodCards.length === 1) {
		setGoodCardRevealOffset(
			goodCards[0],
			getPreferredCardRevealDirection(goodCards[0], preferredDirection) || "right",
			riseDistanceMultiplier,
		);
		return;
	}

	const rowLeft = Math.min(...goodCards.map((card) => getNaturalRect(card).left));
	const rowRight = Math.max(...goodCards.map((card) => getNaturalRect(card).right));
	const rowCenter = rowLeft + (rowRight - rowLeft) / 2;

	for (const card of goodCards) {
		const rect = getNaturalRect(card);
		const cardCenter = rect.left + rect.width / 2;
		setGoodCardRevealOffset(
			card,
			getPreferredCardRevealDirection(card, preferredDirection) || (cardCenter < rowCenter ? "left" : "right"),
			riseDistanceMultiplier,
		);
	}
};

const shouldAlternateStackedRows = (rows) => {
	const goodRows = rows.filter((row) => row.cards.some((card) => isGoodRevealCard(card)));

	if (!isPortraitViewport() || goodRows.length < 2) {
		return false;
	}

	return goodRows.every((row) => row.cards.filter((card) => isGoodRevealCard(card)).length === 1);
};

const setGoodCardRevealDirectionsForRows = (rows) => {
	if (!shouldAlternateStackedRows(rows)) {
		for (const row of rows) {
			const shouldRiseFarRow = row.cards.some((card) => shouldRiseFarAsBottomGreenCardRow(card));
			setGoodCardRevealDirections(
				row.cards,
				row.cards.some((card) => shouldRiseAsNonBottomGreenCardRow(card)) || shouldRiseFarRow ? "rise" : undefined,
				shouldRiseFarRow ? 3 : 1,
			);
		}

		return;
	}

	let goodCardIndex = 0;

	for (const row of rows) {
		const goodCards = row.cards.filter((card) => isGoodRevealCard(card));
		const shouldRiseRow = row.cards.some((card) => shouldRiseAsNonBottomGreenCardRow(card));
		const shouldRiseFarRow = row.cards.some((card) => shouldRiseFarAsBottomGreenCardRow(card));

		if (goodCards.length !== 1) {
			setGoodCardRevealDirections(row.cards, shouldRiseRow || shouldRiseFarRow ? "rise" : undefined, shouldRiseFarRow ? 3 : 1);
			continue;
		}

		if (shouldRiseRow || shouldRiseFarRow) {
			setGoodCardRevealOffset(
				goodCards[0],
				getPreferredCardRevealDirection(goodCards[0], "rise") || "rise",
				shouldRiseFarRow ? 3 : 1,
			);
			goodCardIndex += 1;
			continue;
		}

		setGoodCardRevealOffset(goodCards[0], goodCardIndex % 2 === 0 ? "left" : "right");
		goodCardIndex += 1;
	}
};

const createCardRowSentinel = (row) => {
	const groupRect = row.group.getBoundingClientRect();
	const rowTop = Math.min(...row.cards.map((card) => getNaturalRect(card).top));
	const rowBottom = Math.max(...row.cards.map((card) => getNaturalRect(card).bottom));
	const rowHeight = Math.max(1, rowBottom - rowTop);
	const groupPosition = window.getComputedStyle(row.group).position;

	if (groupPosition === "static") {
		row.group.setAttribute("data-card-reveal-original-position", row.group.style.position);
		row.group.setAttribute("data-card-reveal-position-patched", "");
		row.group.style.position = "relative";
	}

	const sentinel = document.createElement("span");
	sentinel.setAttribute("aria-hidden", "true");
	sentinel.setAttribute("data-card-row-sentinel", "");
	sentinel.style.cssText = [
		"position:absolute",
		"left:0",
		`top:${Math.max(0, rowTop - groupRect.top)}px`,
		"width:1px",
		`height:${rowHeight}px`,
		"pointer-events:none",
		"visibility:hidden",
	].join(";");

	row.group.append(sentinel);
	cardRevealSentinels.push(sentinel);

	return sentinel;
};

const getTallestCard = (cards) => {
	return cards.reduce((target, card) => {
		const targetRect = getNaturalRect(target);
		const cardRect = getNaturalRect(card);

		return cardRect.height > targetRect.height ? card : target;
	}, cards[0]);
};

const getCardRowTarget = (row) => {
	if (row.cards.some((card) => getGreenRevealContainer(card))) {
		return row.group;
	}

	if (row.cards.length === 1) {
		return createCardRowSentinel(row);
	}

	const stableCards = row.cards.filter((card) => !isGoodRevealCard(card));

	if (stableCards.length > 0) {
		return getTallestCard(stableCards);
	}

	return createCardRowSentinel(row);
};

const shouldRevealCardTargetImmediately = (target) => {
	const rect = target.getBoundingClientRect();
	const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;

	return rect.top <= viewportHeight * 0.92;
};

const getCardCenterX = (card) => {
	const rect = getNaturalRect(card);
	return rect.left + rect.width / 2;
};

const getCardRevealOrder = (cards) => {
	const orderMode = getCardRevealOrderMode(cards);

	if (orderMode === "inner-first") {
		const direction = getExplicitCardRevealDirection(cards.find((card) => card instanceof HTMLElement));

		return [...cards].sort((a, b) => {
			const aCenter = getCardCenterX(a);
			const bCenter = getCardCenterX(b);

			return direction === "left" ? bCenter - aCenter : aCenter - bCenter;
		});
	}

	const rowLeft = Math.min(...cards.map((card) => getNaturalRect(card).left));
	const rowRight = Math.max(...cards.map((card) => getNaturalRect(card).right));
	const rowCenter = rowLeft + (rowRight - rowLeft) / 2;

	return [...cards].sort((a, b) => {
		const aCenter = getCardCenterX(a);
		const bCenter = getCardCenterX(b);
		const distanceDiff = Math.abs(aCenter - rowCenter) - Math.abs(bCenter - rowCenter);

		if (distanceDiff !== 0) {
			return distanceDiff;
		}

		return aCenter - bCenter;
	});
};

const revealCardRow = (cards) => {
	const visibleCards = getCardRevealOrder(cards.filter((card) => card instanceof HTMLElement));

	if (visibleCards.length < 1) {
		return;
	}

	const revealDelay = visibleCards.some((card) => card.getAttribute("data-card-reveal-direction") === "rise")
		? cardRiseRevealDelay
		: cardRevealDelay;

	visibleCards.forEach((card, index) => {
		if (revealedCards.has(card)) {
			card.classList.add("is-card-revealed");
			card.classList.add("is-card-reveal-complete");
			return;
		}

		revealedCards.add(card);

		const revealTimer = window.setTimeout(() => {
			card.classList.add("is-card-revealed");

			const completeTimer = window.setTimeout(() => {
				card.classList.add("is-card-reveal-complete");
			}, cardRevealDuration);

			cardRevealTimers.push(completeTimer);
		}, index * revealDelay);

		cardRevealTimers.push(revealTimer);
	});
};

const revealCardRowsForTarget = (target) => {
	const rowsForTarget = cardRevealRowsByTarget.get(target);

	if (target instanceof HTMLElement && target.hasAttribute("data-card-row-sentinel")) {
		target.remove();
	}

	if (!rowsForTarget) {
		return;
	}

	let revealDelay = 0;

	rowsForTarget.forEach((row) => {
		const timer = window.setTimeout(() => revealCardRow(row.cards), revealDelay);
		cardRevealTimers.push(timer);
		const rowDelay = row.cards.some((card) => card.getAttribute("data-card-reveal-direction") === "rise")
			? cardRiseRevealDelay
			: cardRevealDelay;
		revealDelay += Math.max(1, row.cards.filter((card) => card instanceof HTMLElement).length) * rowDelay;
	});
};

const revealCardRowsForTargetWhenReady = (target) => {
	if (
		document.documentElement.classList.contains("animation-pass-ready") &&
		!document.documentElement.classList.contains("animation-pass-preparing")
	) {
		revealCardRowsForTarget(target);
		return;
	}

	window.requestAnimationFrame(() => {
		window.requestAnimationFrame(() => revealCardRowsForTarget(target));
	});
};

const prepareHeroMedia = () => {
	const targets = uniqueElements(heroMediaSelectors);

	for (const target of document.querySelectorAll("[data-hero-load-reveal]")) {
		if (!targets.includes(target)) {
			target.removeAttribute("data-hero-load-reveal");
			target.classList.remove("is-hero-load-revealed");
		}
	}

	for (const target of targets) {
		target.style.removeProperty("opacity");
		target.style.removeProperty("transform");
		target.style.removeProperty("transition");
		target.setAttribute("data-hero-load-reveal", "");
		target.classList.remove("is-hero-load-revealed");
		setMediaRevealDirection(target);
	}

	return targets;
};

const revealHeroMedia = (target, delay = 0) => {
	setMediaRevealDirection(target);

	const timer = window.setTimeout(() => {
		window.requestAnimationFrame(() => {
			document.documentElement.classList.remove("animation-pass-hold-hero");
			window.requestAnimationFrame(() => {
				target.classList.add("is-hero-load-revealed");
			});
		});
	}, delay);

	heroRevealTimers.push(timer);
};

const setupHeroMedia = ({ delay = 0, targets = prepareHeroMedia() } = {}) => {
	for (const target of targets) {
		if (reduceMotionQuery.matches) {
			document.documentElement.classList.remove("animation-pass-hold-hero");
			target.classList.add("is-hero-load-revealed");
			continue;
		}

		const image = target.matches("img") ? target : target.querySelector("img");

		if (!image || image.complete) {
			revealHeroMedia(target, delay);
			continue;
		}

		image.addEventListener("load", () => revealHeroMedia(target, delay), { once: true });
		image.addEventListener("error", () => revealHeroMedia(target, delay), { once: true });
	}
};

const holdHeroMediaForPageExit = () => {
	document.documentElement.classList.add("animation-pass-hold-hero");

	for (const target of document.querySelectorAll("[data-hero-load-reveal]")) {
		target.classList.remove("is-hero-load-revealed");
		target.style.setProperty("opacity", "0", "important");
		target.style.setProperty("transform", "translate3d(0, var(--card-good-reveal-offset), 0) scale(0.985)", "important");
		target.style.setProperty("transition", "none", "important");
	}

	document.documentElement.getBoundingClientRect();
};

const markCards = () => {
	cardNaturalRects = new WeakMap();

	for (const card of document.querySelectorAll("[data-hover-card], [data-card-reveal]")) {
		card.removeAttribute("data-hover-card");
		card.removeAttribute("data-card-reveal");
		card.removeAttribute("data-card-reveal-direction");
		card.style.removeProperty("--card-reveal-start-x");
		card.style.removeProperty("--card-reveal-start-y");
		card.classList.remove("is-card-revealed");
		card.classList.remove("is-card-reveal-complete");
	}

	for (const card of document.querySelectorAll(".card")) {
		cardNaturalRects.set(card, card.getBoundingClientRect());

		if (shouldTreatAsGoodCard(card)) {
			card.classList.add("card--good");
		}

		if (isAnimationCard(card)) {
			card.setAttribute("data-hover-card", "");
			card.setAttribute("data-card-reveal", "");
		} else if (isRevealOnlyCard(card)) {
			card.setAttribute("data-hover-card", "");
			card.setAttribute("data-card-reveal", "");
		}
	}
};

const setupReveal = () => {
	revealObserver?.disconnect();
	revealObserver = undefined;
	revealElementsByTarget = new WeakMap();
	clearMediaRevealSentinels();

	for (const element of document.querySelectorAll(".section--green[data-reveal], .institutions-expanded-access-grid[data-reveal]")) {
		element.removeAttribute("data-reveal");
		element.classList.remove("is-revealed");
		revealedElements.delete(element);
	}

	const targets = uniqueElements(revealSelectors).filter(shouldRevealElement);

	if (reduceMotionQuery.matches || !supportsIntersectionObserver) {
		for (const element of targets) {
			element.setAttribute("data-reveal", "");
			revealElement(element);
		}

		return;
	}

	revealObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					revealObserverTargetElements(entry.target);
				}
			}
		},
		{
			rootMargin: "0px 0px -8% 0px",
			threshold: 0.12,
		},
	);

	const observerTargets = new Set();

	for (const element of targets) {
		element.setAttribute("data-reveal", "");
		setMediaRevealDirection(element);

		if (revealedElements.has(element)) {
			element.classList.add("is-revealed");
			continue;
		}

		const observerTarget = getRevealObserverTarget(element);
		const elementsForTarget = revealElementsByTarget.get(observerTarget) || [];
		elementsForTarget.push(element);
		revealElementsByTarget.set(observerTarget, elementsForTarget);
		observerTargets.add(observerTarget);
	}

	for (const observerTarget of observerTargets) {
		if (shouldRevealObservedTargetImmediately(observerTarget)) {
			revealObserverTargetElements(observerTarget);
		} else {
			revealObserver.observe(observerTarget);
		}
	}
};

const setupCardReveal = () => {
	cardRevealObserver?.disconnect();
	cardRevealObserver = undefined;
	clearCardRevealSentinels();

	if (reduceMotionQuery.matches || !supportsIntersectionObserver) {
		for (const row of getCardRevealRows()) {
			revealCardRow(row.cards);
		}

		return;
	}

	const rows = getCardRevealRows();
	cardRevealRowsByTarget = new WeakMap();
	const observedTargets = new Set();

	cardRevealObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				const rowsForTarget = cardRevealRowsByTarget.get(entry.target);
				const canRevealOnIntersect =
					rowsForTarget?.some((row) => row.group === entry.target) ||
					(entry.target instanceof HTMLElement && entry.target.hasAttribute("data-card-row-sentinel"));

				if (entry.intersectionRatio >= cardRevealThreshold || (entry.isIntersecting && canRevealOnIntersect)) {
					cardRevealObserver?.unobserve(entry.target);
					revealCardRowsForTarget(entry.target);
				}
			}
		},
		{
			rootMargin: "0px",
			threshold: [0, cardRevealThreshold],
		},
	);

	for (const row of rows) {
		const target = getCardRowTarget(row);

		if (!target) {
			continue;
		}

		if (row.cards.every((card) => revealedCards.has(card))) {
			revealCardRow(row.cards);
			continue;
		}

		const targetRows = cardRevealRowsByTarget.get(target) || [];
		targetRows.push(row);
		cardRevealRowsByTarget.set(target, targetRows);

		if (!observedTargets.has(target)) {
			observedTargets.add(target);

			if (shouldRevealCardTargetImmediately(target)) {
				revealCardRowsForTargetWhenReady(target);
			} else {
				cardRevealObserver.observe(target);
			}
		}
	}
};

const setupAnimationPass = ({ heroDelay = 0 } = {}) => {
	clearHeroRevealTimers();
	clearCardRevealTimers();
	clearMediaRevealDirections();
	document.documentElement.classList.add("animation-pass-preparing");
	const heroTargets = prepareHeroMedia();
	markCards();
	setupReveal();
	if (heroTargets.length > 0 && !reduceMotionQuery.matches) {
		document.documentElement.classList.add("animation-pass-hold-hero");
	} else {
		document.documentElement.classList.remove("animation-pass-hold-hero");
	}
	document.documentElement.classList.add("animation-pass-ready");
	setupCardReveal();
	setupBackgroundParallax();
	window.requestAnimationFrame(() => {
		document.documentElement.classList.remove("animation-pass-preparing");
	});
	setupHeroMedia({ delay: heroDelay, targets: heroTargets });
};

const runInitialSetup = () => {
	if (hasRunInitialSetup) {
		return;
	}

	setHasRunInitialSetup(true);
	setupAnimationPass();
};

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", runInitialSetup, { once: true });
} else {
	runInitialSetup();
}

document.addEventListener("astro:after-swap", () => {
	setClientNavigation(true);
	document.documentElement.classList.remove("animation-pass-ready");
	clearHeroRevealTimers();
	clearMediaRevealDirections();
	prepareHeroMedia();
	document.documentElement.classList.add("animation-pass-hold-hero");
	document.documentElement.classList.add("animation-pass-ready");
});

document.addEventListener("astro:page-load", () => {
	if (!isClientNavigation && hasRunInitialSetup) {
		return;
	}

	setHasRunInitialSetup(true);
	setupAnimationPass({ heroDelay: isClientNavigation ? 420 : 0 });
	setClientNavigation(false);
});

if ("addEventListener" in reduceMotionQuery) {
	reduceMotionQuery.addEventListener("change", setupAnimationPass);
} else {
	reduceMotionQuery.addListener(setupAnimationPass);
}

window.addEventListener("beforeunload", holdHeroMediaForPageExit);
window.addEventListener("pagehide", holdHeroMediaForPageExit);
window.addEventListener("pageshow", (event) => {
	if (event.persisted) {
		setupAnimationPass();
	}
});
