const animationPassState = (window.readerPubAnimationPassState ||= {
	hasRunInitialSetup: false,
	isClientNavigation: false,
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
	".platform-flow",
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

const cardGroupSelector = ".card-grid, .model-grid, .platform-commerce-cards, .webuzz-overview-card-grid";
const heroMediaSelectors = [".hero-section .hero-media", ".network-hero .institutions-network-media", ".network-hero > .image-block"];
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
const revealExcludedAreaSelector = ".nav, .nav-overlay, .site-footer, .modal-content";
const cardExcludedAreaSelector = ".nav, .nav-overlay, .site-footer, .hero-section, .network-hero, .cta-block, form, .modal-content";
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
const cardRevealThreshold = 0.65;
const cardRowTopTolerance = 8;

const revealedElements = new WeakSet();
const revealedCards = new WeakSet();
let revealObserver;
let revealElementsByTarget = new WeakMap();
let cardRevealObserver;
let cardRevealRowsByTarget = new WeakMap();
let cardRevealTimers = [];
let cardRevealSentinels = [];
let heroRevealTimers = [];
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
		return;
	}

	revealElement(observerTarget);
};

const clearMediaRevealDirections = () => {
	for (const element of document.querySelectorAll("[data-media-reveal-direction]")) {
		element.removeAttribute("data-media-reveal-direction");
	}
};

const setMediaRevealDirection = (element) => {
	if (!(element instanceof HTMLElement) || !element.matches(mediaRevealSelector)) {
		return;
	}

	const context = element.closest(mediaRevealContextSelector);
	const elementRect = element.getBoundingClientRect();
	const contextRect = context?.getBoundingClientRect();

	if (!contextRect || elementRect.width <= 0 || elementRect.height <= 0 || contextRect.width <= 0) {
		return;
	}

	const elementCenter = elementRect.left + elementRect.width / 2;
	const contextCenter = contextRect.left + contextRect.width / 2;
	element.setAttribute("data-media-reveal-direction", elementCenter < contextCenter ? "left" : "right");
};

const getRevealObserverTarget = (element) => {
	if (element instanceof HTMLElement && element.matches(mediaRevealSelector)) {
		const context = element.closest(mediaRevealContextSelector);

		if (context instanceof HTMLElement) {
			return context;
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

	if (card.matches("a, .card--link, .book-card, .footer-cta")) {
		return false;
	}

	if (card.closest("a, .book-card-link")) {
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

	if (card.matches("a, .card--link, .book-card, .footer-cta")) {
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
		if (card.parentElement) {
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
			const rect = card.getBoundingClientRect();

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

		rows.push(
			...groupRows
				.sort((a, b) => a.top - b.top)
				.map((row) => ({
					group,
					cards: row.cards.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left),
				}))
				.map((row) => {
					setGoodCardRevealDirections(row.cards);
					return row;
				}),
		);
	}

	return rows;
};

const isGoodRevealCard = (card) => card instanceof HTMLElement && card.classList.contains("card--good");

const setGoodCardRevealDirections = (cards) => {
	const goodCards = cards.filter((card) => isGoodRevealCard(card));

	if (goodCards.length < 1) {
		return;
	}

	if (goodCards.length === 1) {
		goodCards[0].setAttribute("data-card-reveal-direction", "right");
		return;
	}

	const rowLeft = Math.min(...goodCards.map((card) => card.getBoundingClientRect().left));
	const rowRight = Math.max(...goodCards.map((card) => card.getBoundingClientRect().right));
	const rowCenter = rowLeft + (rowRight - rowLeft) / 2;

	for (const card of goodCards) {
		const rect = card.getBoundingClientRect();
		const cardCenter = rect.left + rect.width / 2;
		card.setAttribute("data-card-reveal-direction", cardCenter < rowCenter ? "left" : "right");
	}
};

const createCardRowSentinel = (row) => {
	const groupRect = row.group.getBoundingClientRect();
	const rowTop = Math.min(...row.cards.map((card) => card.getBoundingClientRect().top));
	const rowBottom = Math.max(...row.cards.map((card) => card.getBoundingClientRect().bottom));
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
		const targetRect = target.getBoundingClientRect();
		const cardRect = card.getBoundingClientRect();

		return cardRect.height > targetRect.height ? card : target;
	}, cards[0]);
};

const getCardRowTarget = (row) => {
	const stableCards = row.cards.filter((card) => !isGoodRevealCard(card));

	if (stableCards.length > 0) {
		return getTallestCard(stableCards);
	}

	return createCardRowSentinel(row);
};

const getCardCenterX = (card) => {
	const rect = card.getBoundingClientRect();
	return rect.left + rect.width / 2;
};

const getCardRevealOrder = (cards) => {
	const rowLeft = Math.min(...cards.map((card) => card.getBoundingClientRect().left));
	const rowRight = Math.max(...cards.map((card) => card.getBoundingClientRect().right));
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
		}, index * cardRevealDelay);

		cardRevealTimers.push(revealTimer);
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
		target.setAttribute("data-hero-load-reveal", "");
		target.classList.remove("is-hero-load-revealed");
		setMediaRevealDirection(target);
	}

	return targets;
};

const revealHeroMedia = (target, delay = 0) => {
	const timer = window.setTimeout(() => {
		window.requestAnimationFrame(() => {
			window.requestAnimationFrame(() => {
				document.documentElement.classList.remove("animation-pass-hold-hero");
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

const markCards = () => {
	for (const card of document.querySelectorAll("[data-hover-card], [data-card-reveal]")) {
		card.removeAttribute("data-hover-card");
		card.removeAttribute("data-card-reveal");
		card.removeAttribute("data-card-reveal-direction");
		card.classList.remove("is-card-revealed");
		card.classList.remove("is-card-reveal-complete");
	}

	for (const card of document.querySelectorAll(".card")) {
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
					if (entry.target instanceof HTMLElement && entry.target.hasAttribute("data-card-row-sentinel")) {
						entry.target.remove();
					}

					if (rowsForTarget) {
						rowsForTarget.forEach((row, rowIndex) => {
							const timer = window.setTimeout(() => revealCardRow(row.cards), rowIndex * cardRevealDelay);
							cardRevealTimers.push(timer);
						});
					}
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
			cardRevealObserver.observe(target);
		}
	}
};

const setupAnimationPass = ({ heroDelay = 0 } = {}) => {
	clearHeroRevealTimers();
	clearCardRevealTimers();
	clearMediaRevealDirections();
	const heroTargets = prepareHeroMedia();
	markCards();
	setupReveal();
	setupCardReveal();
	if (heroDelay === 0) {
		document.documentElement.classList.remove("animation-pass-hold-hero");
	} else {
		document.documentElement.classList.add("animation-pass-hold-hero");
	}
	document.documentElement.classList.add("animation-pass-ready");
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
