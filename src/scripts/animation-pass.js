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
const revealExcludedAreaSelector = ".nav, .nav-overlay, .site-footer, .modal-content";
const cardExcludedAreaSelector = ".nav, .nav-overlay, .site-footer, .hero-section, .network-hero, .cta-block, form, .modal-content";
const interactiveChildSelector =
	"button, input, textarea, select, summary, [role='button'], .button, [tabindex]:not([tabindex='-1'])";
const cardRevealDuration = 1240;
const cardRevealDelay = 360;

const revealedElements = new WeakSet();
const revealedCardGroups = new WeakSet();
let revealObserver;
let cardRevealObserver;
let cardRevealTimers = [];
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

const revealElement = (element) => {
	element.classList.add("is-revealed");
	revealedElements.add(element);
	revealObserver?.unobserve(element);
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

const shouldRevealElement = (element) => {
	if (element.matches(".legal-page")) {
		return false;
	}

	if (element.closest(".hero-section, .network-hero") && element.matches(".hero-media, .image-block, figure, picture")) {
		return false;
	}

	return !element.closest(revealExcludedAreaSelector);
};

const isAnimationCard = (card) => {
	if (!(card instanceof HTMLElement)) {
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

	return !card.querySelector(interactiveChildSelector);
};

const isRevealOnlyCard = (card) => {
	return card instanceof HTMLElement && card.matches(".home-problem-grid .card--link");
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

const revealCardGroup = (group) => {
	const cards = getAnimationCards(group);

	if (cards.length < 1) {
		return;
	}

	revealedCardGroups.add(group);

	cards.forEach((card, index) => {
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

const setupHeroMedia = ({ delay = 0 } = {}) => {
	const targets = prepareHeroMedia();

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
		card.classList.remove("is-card-revealed");
		card.classList.remove("is-card-reveal-complete");
	}

	for (const card of document.querySelectorAll(".card")) {
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
					revealElement(entry.target);
				}
			}
		},
		{
			rootMargin: "0px 0px -8% 0px",
			threshold: 0.12,
		},
	);

	for (const element of targets) {
		element.setAttribute("data-reveal", "");

		if (revealedElements.has(element)) {
			element.classList.add("is-revealed");
			continue;
		}

		revealObserver.observe(element);
	}
};

const setupCardReveal = () => {
	cardRevealObserver?.disconnect();
	cardRevealObserver = undefined;

	if (reduceMotionQuery.matches || !supportsIntersectionObserver) {
		for (const group of getCardRevealGroups()) {
			revealCardGroup(group);
		}

		return;
	}

	const groups = getCardRevealGroups();

	cardRevealObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					cardRevealObserver?.unobserve(entry.target);
					revealCardGroup(entry.target);
				}
			}
		},
		{
			rootMargin: "0px 0px -18% 0px",
			threshold: 0.35,
		},
	);

	for (const group of groups) {
		if (revealedCardGroups.has(group)) {
			revealCardGroup(group);
			continue;
		}

		cardRevealObserver.observe(group);
	}
};

const setupAnimationPass = ({ heroDelay = 0 } = {}) => {
	document.documentElement.classList.add("animation-pass-ready");
	if (heroDelay === 0) {
		document.documentElement.classList.remove("animation-pass-hold-hero");
	}
	clearHeroRevealTimers();
	clearCardRevealTimers();
	setupHeroMedia({ delay: heroDelay });
	markCards();
	setupReveal();
	setupCardReveal();
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
	document.documentElement.classList.add("animation-pass-ready");
	document.documentElement.classList.add("animation-pass-hold-hero");
	clearHeroRevealTimers();
	prepareHeroMedia();
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
