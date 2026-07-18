import { SITE_NAME } from "../consts";

export type SectionTone = "white" | "gray" | "green" | "dark";
export type ActionVariant = "primary" | "secondary" | "tertiary";
export type CardVariant = "default" | "accent" | "compact" | "metric";

export type IconName =
	| "publisher"
	| "library"
	| "university"
	| "government"
	| "public"
	| "reader"
	| "webReader"
	| "epubFile"
	| "readerBook"
	| "author"
	| "research"
	| "program"
	| "sale"
	| "rental"
	| "charity"
	| "coins"
	| "dollars"
	| "fan"
	| "security"
	| "access"
	| "noAds";

export interface PageAction {
	label: string;
	href: string;
	variant?: ActionVariant;
	external?: boolean;
	modalTarget?: string;
	class?: string;
	iconSrc?: string;
	iconAlt?: string;
	externalIconSrc?: string;
	externalIconAlt?: string;
	externalIconClass?: string;
	externalIconStyle?: string;
}

export interface PageCard {
	title: string;
	body: string;
	icon?: IconName;
	href?: string;
	variant?: CardVariant;
}

export interface PageSection {
	tone?: SectionTone;
	kicker?: string;
	title: string;
	body?: string;
	cards?: PageCard[];
	columns?: "2" | "3" | "4";
	actions?: PageAction[];
}

export interface PageBlueprint {
	metaTitle: string;
	description: string;
	eyebrow?: string;
	heroTitle: string;
	heroLead: string;
	heroBody?: string;
	heroTagline?: string;
	heroSpacerBackgroundPositionY?: string;
	image?: string;
	imageAlt?: string;
	actions?: PageAction[];
	sections: PageSection[];
	cta?: {
		title: string;
		body: string;
		actions: PageAction[];
	};
}

export const pages = {
	contact: {
		metaTitle: `Contact ${SITE_NAME} | Publishing, Pilots & Support`,
		description:
			"Contact ReaderPub about publishing, live pilots, institutional collections, catalog migration, EPUB, analytics, Scribe, security, pricing, or support.",
		ogTitle: "Contact ReaderPub",
		ogDescription:
			"Contact ReaderPub about publishing, pilots, institutional collections, catalog migration, analytics, Scribe, security, pricing, or support.",
		eyebrow: "Get started",
		heroTitle: "Tell us what you’re publishing.",
		heroLead:
			"ReaderPub supports books, catalogs, institutional collections and community publishing programs.",
		heroBody:
			"Our knowledge base outlines the ReaderPub's way of reading, distributing, discussing, and selling books. Ask our team for additional info or simply request a live Pilot.",
		heroSpacerBackgroundPositionY: "90%",
		image: "/images/contact.webp",
		imageAlt: "ReaderPub contact and project-request illustration",
		actions: [
			{
				label: "Partner inquiry",
				href: "#partnership-request-modal",
				variant: "secondary",
				modalTarget: "#partnership-request-modal",
			},
			{
				label: "Ask us a question",
				href: "#kb-help-modal",
				variant: "secondary",
				modalTarget: "#kb-help-modal",
			},
			{
				label: "Request live Pilot",
				href: "#request-onboarding-modal",
				modalTarget: "#request-onboarding-modal",
			},
		],
		sections: [],
		cta: {
			title: "Not ready for a live pilot yet?",
			body: "Send the ReaderPub team a short note about your publishing needs.",
			actions: [
				{
					label: "Ask us a question",
					href: "#kb-help-modal",
					modalTarget: "#kb-help-modal",
				},
			],
		},
	},
	kb: {
		metaTitle: `${SITE_NAME} Knowledge Base: Products, Publishing & Support`,
		description:
			"Find answers about ReaderPub, WeRead, WePub, WeBuzz, WeTalk, BookTree, Scribe, security, pricing, institutional publishing, and support.",
		ogTitle: "ReaderPub Knowledge Base",
		ogDescription:
			"ReaderPub knowledge base for web-native publishing, reading, distribution, security, pricing, communities, AI, and support.",
		eyebrow: "Knowledge base",
		heroTitle: "Short answers about ReaderPub.",
		heroLead: "",
		heroSpacerBackgroundPositionY: "50%",
		image: "/images/kb.webp",
		imageAlt: "ReaderPub knowledge base and product support illustration",
		actions: [
			{
				label: "Ask us a question",
				href: "#kb-help-modal",
				modalTarget: "#kb-help-modal",
			},
			{
				label: "Ask Scribe",
				href: "/scribe/",
				variant: "secondary",
				class: "button--scribe-demo",
				iconSrc: "/images/scribe.svg",
				iconAlt: "",
			},
			{
				label: "Request ReaderPub Pilot",
				href: "/contact/",
				variant: "secondary",
			},
		],
		sections: [
			{
				tone: "white",
				kicker: "Core questions",
				title: "What this base should answer next.",
				body:
					"The route is in place, with a consistent FAQ-ready card layout for the next content pass.",
				columns: "3",
				cards: [
					{
						title: "What is ReaderPub?",
						body: "A web-native publishing network for reading, publishing and discussion.",
						icon: "publisher",
					},
					{
						title: "What is WeRead?",
						body: "The browser reading layer of ReaderPub.",
						icon: "webReader",
					},
					{
						title: "What is WePub?",
						body: "The publishing layer for web-native books and catalogs.",
						icon: "author",
					},
					{
						title: "What is WeBuzz?",
						body: "The social and discovery layer around books.",
						icon: "fan",
					},
					{
						title: "What is BookTree?",
						body: "The structure layer for notes, excerpts and research.",
						icon: "research",
					},
					{
						title: "Who is ReaderPub for?",
						body: "Readers, authors, publishers, libraries, universities and public organizations.",
						icon: "public",
					},
				],
			},
		],
		cta: {
			title: "Need a direct answer?",
			body: "If you haven’t found the answer you need here, ask our team.",
			actions: [
				{
					label: "Ask us a question",
					href: "#kb-help-modal",
					modalTarget: "#kb-help-modal",
				},
				{
					label: "Ask Scribe",
					href: "/scribe/",
					variant: "secondary",
					class: "button--scribe-demo",
					externalIconSrc: "/images/scribe-action-dark.svg",
					externalIconAlt: "",
					externalIconClass: "kb-faq-scribe-icon",
				},
			],
		},
	},
} satisfies Record<string, PageBlueprint>;
