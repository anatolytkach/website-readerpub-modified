import { BOOKS_URL, HERO_TAGLINE, PUBLISH_URL, SITE_NAME } from "../consts";

export type SectionTone = "white" | "gray" | "green" | "dark";
export type ActionVariant = "primary" | "secondary";

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
}

export interface PageCard {
	title: string;
	body: string;
	icon?: IconName;
	href?: string;
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

const readAction: PageAction = {
	label: "Start reading",
	href: BOOKS_URL,
	external: true,
};

const publishAction: PageAction = {
	label: "Publish with ReaderPub",
	href: PUBLISH_URL,
	external: true,
};

export const pages = {
	home: {
		metaTitle: `${SITE_NAME} - Web-Native Publishing Network`,
		description:
			"ReaderPub turns books into connected web assets for reading, publishing, discussion and strategic distribution.",
		heroTitle: "Transforming the world of books.",
		heroTagline: HERO_TAGLINE,
		heroLead:
			"ReaderPub turns books into web-native assets that can be read instantly, published securely and distributed strategically.",
		heroBody:
			"This modified base keeps the current ReaderPub architecture while establishing a cleaner shared visual system for the next content pass.",
		heroSpacerBackgroundPositionY: "0%",
		image: "/images/chain1.webp",
		imageAlt: "ReaderPub connected publishing network",
		actions: [
			{ label: "Start reading", href: BOOKS_URL, external: true, variant: "secondary" },
			{ label: "Explore the platform", href: "/platform" },
		],
		sections: [
			{
				tone: "gray",
				kicker: "Audiences",
				title: "One network for the people around books.",
				body:
					"The current routing structure is preserved, but the page composition now starts from reusable cards and sections.",
				columns: "4",
				cards: [
					{
						title: "For Readers",
						body: "Books open instantly in the browser and stay connected to notes, discovery and community.",
						href: "/weread",
					},
					{
						title: "For Authors & Publishers",
						body: "Publishing becomes a direct web presence with lower marketplace dependency.",
						href: "/authors",
					},
					{
						title: "For Institutions",
						body: "Libraries, universities and public organizations can publish readable web collections.",
						href: "/institutions",
					},
					{
						title: "For Discussion",
						body: "Reader communities stay attached to books, authors, fragments and ideas.",
						href: "/webuzz",
					},
				],
			},
			{
				tone: "white",
				kicker: "Visual system",
				title: "Four section backgrounds, one card language.",
				body:
					"Sections can be white, gray, green or dark. Any section with imagery, diagrams, screenshots or illustrations uses white.",
				columns: "4",
				cards: [
					{
						title: "White",
						body: "Default for media, screenshots, diagrams and illustrated sections.",
						icon: "readerBook",
					},
					{ title: "Gray", body: "Quiet explanatory sections and card groups.", icon: "research" },
					{
						title: "Green",
						body: "Strategic emphasis without overpowering the content.",
						icon: "publisher",
					},
					{ title: "Dark", body: "Focused CTA and high-contrast positioning moments.", icon: "security" },
				],
			},
			{
				tone: "green",
				kicker: "Reusable base",
				title: "Prepared for the next homepage pass.",
				body:
					"The homepage tagline is available now, and the base components are ready for a deeper homepage rewrite without changing the architecture.",
				actions: [
					{ label: "Read in WeRead", href: BOOKS_URL, external: true },
					{ label: "Publish securely", href: PUBLISH_URL, external: true, variant: "secondary" },
				],
			},
		],
		cta: {
			title: "Read instantly. Publish securely. Distribute strategically.",
			body: "ReaderPub connects the full lifecycle of web-native books.",
			actions: [
				{ label: "Explore ReaderPub", href: "/platform" },
				{ label: "Contact us", href: "/contact", variant: "secondary" },
			],
		},
	},
	weread: {
		metaTitle: `WeRead | ${SITE_NAME}`,
		description: "WeRead reconnects browser-native reading with discovery, notes and discussion.",
		eyebrow: "Readers",
		heroTitle: "WeRead: genuine eReader in your browser.",
		heroLead:
			"Books should open from a link, keep reader context alive and connect reading to the wider web.",
		heroBody:
			"WeRead is the ReaderPub reading layer for instant browser access, notes, discussion and long-form focus.",
		heroSpacerBackgroundPositionY: "9%",
		image: "/images/readers2.webp",
		imageAlt: "ReaderPub browser reading and book discovery",
		actions: [readAction, { label: "Explore WeBuzz", href: "/webuzz", variant: "secondary" }],
		sections: [
			{
				tone: "gray",
				kicker: "Reader problem",
				title: "Access is abundant. Reading is still isolated.",
				body:
					"ReaderPub treats reading as a connected web activity, not a file trapped in one store or app.",
				columns: "4",
				cards: [
					{ title: "Open instantly", body: "Start from a browser link without installing another reader.", icon: "webReader" },
					{ title: "Keep context", body: "Notes and discussion stay connected to the book and passage.", icon: "research" },
					{ title: "Discover through people", body: "Find books through communities, readers and authors.", icon: "fan" },
					{ title: "Return easily", body: "A web-native book remains searchable and linkable.", icon: "readerBook" },
				],
			},
			{
				tone: "white",
				kicker: "ReaderPub answer",
				title: "A reading environment built for the web.",
				body:
					"WeRead gives ReaderPub a fast, browser-native surface for public books, protected books and future paid access.",
			},
		],
		cta: {
			title: "Read without setup.",
			body: "Open the catalog and start reading in the browser.",
			actions: [readAction],
		},
	},
	wepub: {
		metaTitle: `WePub | ${SITE_NAME}`,
		description: "WePub gives authors and publishers web-native distribution without losing reader relationships.",
		eyebrow: "Publish",
		heroTitle: "WePub: publish to readers, keep the relationship.",
		heroLead:
			"WePub turns books into web-native assets that can be read, searched, discussed and sold directly.",
		heroBody:
			"Authors and publishers can use ReaderPub as a direct web presence instead of handing the audience to a marketplace.",
		heroSpacerBackgroundPositionY: "18%",
		image: "/images/publish.webp",
		imageAlt: "Publishing a book as a web-native ReaderPub asset",
		actions: [publishAction, { label: "Why authors switch", href: "/authors", variant: "secondary" }],
		sections: [
			{
				tone: "gray",
				kicker: "Publishing problem",
				title: "The old model sells files and loses readers.",
				body:
					"ReaderPub starts from the opposite premise: the book should remain active as a connected web asset.",
				columns: "3",
				cards: [
					{ title: "Direct publishing", body: "Publish a browser-readable edition and keep a direct route to readers.", icon: "publisher" },
					{ title: "Author presence", body: "Keep books connected to author pages, updates and future work.", icon: "author" },
					{ title: "Lower friction", body: "Support direct sales with a platform fee designed for creators.", icon: "dollars" },
				],
			},
			{
				tone: "green",
				kicker: "Publishing system",
				title: "Web editions first, file output when useful.",
				body:
					"The new base keeps WePub ready for web-native publication, optional EPUB workflows and strategic distribution.",
			},
		],
		cta: {
			title: "Publish without losing the audience.",
			body: "Use ReaderPub as a direct publishing surface for books and long-form materials.",
			actions: [publishAction, { label: "See pricing", href: "/pricing", variant: "secondary" }],
		},
	},
	webuzz: {
		metaTitle: `WeBuzz | ${SITE_NAME}`,
		description: "WeBuzz is the ReaderPub social layer for books, authors, fragments and reading communities.",
		eyebrow: "Discuss",
		heroTitle: "WeBuzz keeps book discussion attached to books.",
		heroLead:
			"Book conversations should not disappear into generic social feeds and disconnected comment threads.",
		heroBody:
			"WeBuzz gives ReaderPub a community layer for readers, authors, publishers and institutions.",
		heroSpacerBackgroundPositionY: "27%",
		image: "/images/webuzz.webp",
		imageAlt: "Readers discussing books through WeBuzz",
		actions: [{ label: "Explore readers", href: "/weread" }, { label: "Contact us", href: "/contact", variant: "secondary" }],
		sections: [
			{
				tone: "gray",
				kicker: "Community layer",
				title: "Conversation becomes part of the publication.",
				body:
					"WeBuzz connects comments, recommendations and community activity to the work that started the discussion.",
				columns: "4",
				cards: [
					{ title: "Readers", body: "Discuss books and passages with people who read them.", icon: "reader" },
					{ title: "Authors", body: "Meet readers around the actual work, not just reviews.", icon: "author" },
					{ title: "Publishers", body: "Keep books visible after launch through active communities.", icon: "publisher" },
					{ title: "Institutions", body: "Support public reading programs and classroom discussion.", icon: "library" },
				],
			},
			{
				tone: "dark",
				kicker: "Strategic distribution",
				title: "Discovery improves when discussion has structure.",
				body:
					"ReaderPub can turn book activity into navigation, recommendations and durable context.",
			},
		],
		cta: {
			title: "Build community around reading.",
			body: "Connect publishing, reading and discussion in one web-native network.",
			actions: [{ label: "Talk to ReaderPub", href: "/contact" }],
		},
	},
	booktree: {
		metaTitle: `BookTree | ${SITE_NAME}`,
		description: "BookTree helps readers connect books, excerpts, notes and research projects.",
		eyebrow: "Structure",
		heroTitle: "BookTree keeps track of what you are trying to learn.",
		heroLead:
			"Serious reading creates notes, sources and projects that need structure across more than one book.",
		heroBody:
			"BookTree is the ReaderPub knowledge-mapping layer for long-form reading, study and research.",
		heroSpacerBackgroundPositionY: "36%",
		image: "/images/booktree.webp",
		imageAlt: "BookTree interface showing books, excerpts and notes connected in a tree",
		actions: [{ label: "Try BookTree", href: BOOKS_URL, external: true }],
		sections: [
			{
				tone: "gray",
				kicker: "Knowledge problem",
				title: "Books are organized. Knowledge often is not.",
				body:
					"BookTree gives readers a way to keep sources, notes and projects connected over time.",
				columns: "3",
				cards: [
					{ title: "Sources", body: "Keep books and excerpts attached to their context.", icon: "readerBook" },
					{ title: "Notes", body: "Preserve the reason a passage mattered.", icon: "research" },
					{ title: "Projects", body: "Connect reading to writing, study and long-term work.", icon: "program" },
				],
			},
			{
				tone: "green",
				kicker: "BookTree flow",
				title: "From book to excerpt to project.",
				body:
					"The new base keeps BookTree ready for structured diagrams and screenshots on white media sections.",
			},
		],
		cta: {
			title: "Make reading cumulative.",
			body: "Use BookTree when reading turns into research, writing or study.",
			actions: [{ label: "Open the catalog", href: BOOKS_URL, external: true }],
		},
	},
	platform: {
		metaTitle: `Platform | ${SITE_NAME}`,
		description: "ReaderPub combines reading, publishing, discussion, commerce and control in one web-native platform.",
		eyebrow: "Platform",
		heroTitle: "ReaderPub is a web-native publishing network.",
		heroLead:
			"The platform connects WeRead, WePub, WeBuzz and BookTree into one strategic distribution system.",
		heroBody:
			"Books become readable, searchable, discussable, sellable and connected to the people and institutions behind them.",
		heroSpacerBackgroundPositionY: "45%",
		image: "/images/home2.webp",
		imageAlt: "ReaderPub platform overview",
		actions: [{ label: "Explore ReaderPub", href: "/weread" }, { label: "Contact us", href: "/contact", variant: "secondary" }],
		sections: [
			{
				tone: "gray",
				kicker: "Platform layers",
				title: "One architecture, four product surfaces.",
				body:
					"The source site already separates routes by audience and product. This base keeps that routing while consolidating presentation.",
				columns: "4",
				cards: [
					{ title: "WeRead", body: "Browser-native reading and book access.", icon: "webReader", href: "/weread" },
					{ title: "WePub", body: "Web-native publishing and direct distribution.", icon: "publisher", href: "/wepub" },
					{ title: "WeBuzz", body: "Discussion, discovery and community.", icon: "fan", href: "/webuzz" },
					{ title: "BookTree", body: "Structured notes and knowledge mapping.", icon: "research", href: "/booktree" },
				],
			},
			{
				tone: "dark",
				kicker: "Control",
				title: "Publishing needs strategy, not just hosting.",
				body:
					"ReaderPub keeps access control, commerce, reader context and distribution strategy in the same system.",
			},
		],
		cta: {
			title: "Build on the ReaderPub platform.",
			body: "Use the platform pages as the base for the next content pass.",
			actions: [{ label: "Get started", href: "/contact" }],
		},
	},
	authors: {
		metaTitle: `${SITE_NAME} for Authors`,
		description: "ReaderPub helps authors move from marketplace dependency to direct reader relationships.",
		eyebrow: "Authors",
		heroTitle: "Your readers should belong to you.",
		heroLead:
			"ReaderPub gives authors a web-native path to publish, sell and stay connected to readers.",
		heroBody:
			"The new base keeps the author story focused on audience ownership, direct sales and long-term book lifecycle.",
		heroSpacerBackgroundPositionY: "54%",
		image: "/images/author1.webp",
		imageAlt: "Author publishing on the web and staying connected to readers",
		actions: [{ label: "Start publishing", href: "/wepub" }, { label: "See pricing", href: "/pricing", variant: "secondary" }],
		sections: [
			{
				tone: "gray",
				kicker: "Author economics",
				title: "Move from platform dependency to direct relationships.",
				body:
					"Authors need publishing tools that preserve the reader relationship after the sale.",
				columns: "3",
				cards: [
					{ title: "Audience ownership", body: "Build durable reader relationships around your work.", icon: "fan" },
					{ title: "Direct sales", body: "Use low-friction commerce without surrendering the customer.", icon: "sale" },
					{ title: "Living catalog", body: "Keep each book searchable, discussable and connected.", icon: "author" },
				],
			},
			{
				tone: "green",
				kicker: "Author system",
				title: "Books become long-term web assets.",
				body:
					"Future author pages can expand this base without changing the shared component system.",
			},
		],
		cta: {
			title: "Publish on your terms.",
			body: "Use WePub to build a direct publishing presence on ReaderPub.",
			actions: [{ label: "Start publishing", href: "/wepub" }],
		},
	},
	institutions: {
		metaTitle: `${SITE_NAME} for Institutions`,
		description: "ReaderPub helps libraries, universities and public organizations publish collections on the web.",
		eyebrow: "Institutions",
		heroTitle: "Institutions publish knowledge. ReaderPub makes it readable.",
		heroLead:
			"Libraries, universities and public organizations need collections that are searchable, readable and useful online.",
		heroBody:
			"ReaderPub turns archives, textbooks, reports and public materials into connected web libraries.",
		heroSpacerBackgroundPositionY: "63%",
		image: "/images/institutions.webp",
		imageAlt: "Institutional publishing and web library access",
		actions: [{ label: "Build a library", href: "/contact?topic=institution" }, { label: "See pricing", href: "/pricing", variant: "secondary" }],
		sections: [
			{
				tone: "gray",
				kicker: "Institutional publishing",
				title: "Collections need more than storage.",
				body:
					"ReaderPub gives institutional materials a public reading surface and a path to community use.",
				columns: "4",
				cards: [
					{ title: "Libraries", body: "Publish readable public collections.", icon: "library" },
					{ title: "Universities", body: "Support courses, research and open materials.", icon: "university" },
					{ title: "Public bodies", body: "Make reports and civic knowledge easier to access.", icon: "government" },
					{ title: "Communities", body: "Connect collections to discussion and reading programs.", icon: "public" },
				],
			},
			{
				tone: "dark",
				kicker: "Public value",
				title: "Knowledge should be findable, readable and discussable.",
				body:
					"The new base keeps institutional pages ready for collection diagrams and screenshots on white sections.",
			},
		],
		cta: {
			title: "Bring collections back to the web.",
			body: "Talk to ReaderPub about institutional publishing.",
			actions: [{ label: "Contact us", href: "/contact?topic=institution" }],
		},
	},
	security: {
		metaTitle: `Security | ${SITE_NAME}`,
		description: "ReaderPub protects access, copying and distribution for web-native publications.",
		eyebrow: "Security",
		heroTitle: "Publish securely without turning books back into files.",
		heroLead:
			"ReaderPub is designed for controlled browser access, protected reading and strategic distribution.",
		heroBody:
			"The security page base keeps access control, theft prevention and reader access in one visual system.",
		heroSpacerBackgroundPositionY: "72%",
		image: "/images/security.webp",
		imageAlt: "Protected web reading and publishing security",
		actions: [{ label: "Control who reads", href: "/security#access-control" }, { label: "Contact us", href: "/contact", variant: "secondary" }],
		sections: [
			{
				tone: "gray",
				kicker: "Protection",
				title: "Security is part of the publishing model.",
				body:
					"ReaderPub separates reader access from raw file distribution and keeps protection visible in the product story.",
				columns: "3",
				cards: [
					{ title: "Protected reading", body: "Keep books in a controlled browser reader.", icon: "security" },
					{ title: "Access rules", body: "Support private, paid and public access patterns.", icon: "access" },
					{ title: "Strategic distribution", body: "Share links and access without exposing source files.", icon: "publisher" },
				],
			},
			{
				tone: "green",
				kicker: "Secure publishing",
				title: "Protection should not break the reading experience.",
				body:
					"The reusable media rule keeps future screenshots and protection diagrams on white sections.",
			},
		],
		cta: {
			title: "Distribute with control.",
			body: "Use ReaderPub when access and protection matter.",
			actions: [{ label: "Talk to ReaderPub", href: "/contact" }],
		},
	},
	pricing: {
		metaTitle: `Pricing | ${SITE_NAME}`,
		description: "ReaderPub pricing supports readers, authors, publishers and institutions.",
		eyebrow: "Pricing",
		heroTitle: "Free for readers and fair for publishers.",
		heroLead:
			"ReaderPub pricing should support public reading, creator economics and institutional publishing.",
		heroBody:
			"This base keeps pricing content structured in reusable cards instead of page-specific one-off layouts.",
		heroSpacerBackgroundPositionY: "81%",
		image: "/images/pricing.webp",
		imageAlt: "ReaderPub pricing and publishing plans",
		actions: [{ label: "Contact us", href: "/contact" }, { label: "Open catalog", href: BOOKS_URL, external: true, variant: "secondary" }],
		sections: [
			{
				tone: "gray",
				kicker: "Pricing model",
				title: "Two paths: creators and institutions.",
				body:
					"Pricing can evolve, but the page now has a consistent card system for plans, terms and notes.",
				columns: "2",
				cards: [
					{ title: "Creators", body: "Start free, sell directly and scale with catalog needs.", icon: "author" },
					{ title: "Institutions", body: "Use plans based on collection scale, access and support.", icon: "library" },
				],
			},
			{
				tone: "green",
				kicker: "Economics",
				title: "The model rewards direct relationships.",
				body:
					"Future pricing tables can inherit the same card padding, headings and body text.",
			},
		],
		cta: {
			title: "Choose a publishing path.",
			body: "Contact ReaderPub for creator, publisher and institutional plans.",
			actions: [{ label: "Contact us", href: "/contact" }],
		},
	},
	contact: {
		metaTitle: `${SITE_NAME} Contact`,
		description: "Contact ReaderPub about web-native publishing for authors, publishers and institutions.",
		eyebrow: "Get started",
		heroTitle: "Tell us what you want to publish.",
		heroLead:
			"ReaderPub supports books, catalogs, institutional collections and community publishing programs.",
		heroBody:
			"The publishing process, as well as our approach to reading, distributing, discussing, and selling books is detailed in our knowledge base.",
		heroSpacerBackgroundPositionY: "90%",
		image: "/images/contact.webp",
		imageAlt: "ReaderPub onboarding",
		actions: [
			{ label: "Knowledge base", href: "/kb", variant: "secondary" },
			{ label: "See pricing", href: "/pricing", variant: "secondary" },
			{ label: "Request live Pilot", href: "#request-onboarding-modal", modalTarget: "#request-onboarding-modal" },
		],
		sections: [],
		cta: {
			title: "Not ready for a live pilot yet?",
			body: "Send the ReaderPub team a short note about your publishing needs.",
			actions: [{ label: "Ask us a question", href: "#kb-help-modal", modalTarget: "#kb-help-modal" }],
		},
	},
	kb: {
		metaTitle: `${SITE_NAME} Knowledge Base`,
		description: "ReaderPub knowledge base for web-native publishing, reading and distribution.",
		eyebrow: "Knowledge base",
		heroTitle: "Short answers about ReaderPub.",
		heroLead: "",
		heroSpacerBackgroundPositionY: "50%",
		image: "/images/kb.webp",
		imageAlt: "ReaderPub knowledge base",
		actions: [
			{ label: "Ask us a question", href: "#kb-help-modal", modalTarget: "#kb-help-modal" },
			{
				label: "Ask Scribe",
				href: "/scribe",
				variant: "secondary",
				class: "button--scribe-demo",
				iconSrc: "/images/scribe.svg",
				iconAlt: "",
			},
			{ label: "Request ReaderPub Pilot", href: "/contact", variant: "secondary" },
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
					{ title: "What is ReaderPub?", body: "A web-native publishing network for reading, publishing and discussion.", icon: "publisher" },
					{ title: "What is WeRead?", body: "The browser reading layer of ReaderPub.", icon: "webReader" },
					{ title: "What is WePub?", body: "The publishing layer for web-native books and catalogs.", icon: "author" },
					{ title: "What is WeBuzz?", body: "The social and discovery layer around books.", icon: "fan" },
					{ title: "What is BookTree?", body: "The structure layer for notes, excerpts and research.", icon: "research" },
					{ title: "Who is ReaderPub for?", body: "Readers, authors, publishers, libraries, universities and public organizations.", icon: "public" },
				],
			},
		],
		cta: {
			title: "Need a direct answer?",
			body: "If you haven't found a suitable answer here, ask our team.",
			actions: [
				{ label: "Ask us a question", href: "#kb-help-modal", modalTarget: "#kb-help-modal" },
				{
					label: "Ask Scribe",
					href: "/scribe",
					variant: "secondary",
					class: "button--scribe-demo",
					iconSrc: "/images/scribe.svg",
					iconAlt: "",
				},
			],
		},
	},
} satisfies Record<string, PageBlueprint>;
