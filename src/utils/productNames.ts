export const PRODUCT_NAME_PARTS = {
	ReaderPub: ["Reader", "Pub"],
	WeRead: ["We", "Read"],
	WePub: ["We", "Pub"],
	WeBuzz: ["We", "Buzz"],
	WeTalk: ["We", "Talk"],
	BookTree: ["Book", "Tree"],
} as const;

export type ProductName = keyof typeof PRODUCT_NAME_PARTS;

type ProductTitleToken =
	| { type: "text"; text: string }
	| { type: "product"; name: ProductName };

const PRODUCT_NAME_PATTERN = /(ReaderPub|BookTree|WeBuzz|WeTalk|WeRead|WePub)/g;

export const tokenizeProductTitle = (text: string): ProductTitleToken[] => {
	const tokens: ProductTitleToken[] = [];
	let lastIndex = 0;

	for (const match of text.matchAll(PRODUCT_NAME_PATTERN)) {
		const [name] = match;
		const index = match.index ?? 0;

		if (index > lastIndex) {
			tokens.push({ type: "text", text: text.slice(lastIndex, index) });
		}

		tokens.push({ type: "product", name: name as ProductName });
		lastIndex = index + name.length;
	}

	if (lastIndex < text.length) {
		tokens.push({ type: "text", text: text.slice(lastIndex) });
	}

	return tokens.length > 0 ? tokens : [{ type: "text", text }];
};
