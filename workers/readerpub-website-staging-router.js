const WEBSITE_ORIGIN = "https://readerpub-website-staging.pages.dev";
const BOOKS_ORIGIN = "https://readerpub-books-staging.pages.dev";

export default {
	async fetch(request) {
		const sourceUrl = new URL(request.url);
		let upstreamOrigin = WEBSITE_ORIGIN;
		let upstreamPath = sourceUrl.pathname;

		if (sourceUrl.pathname === "/scribe") {
			return Response.redirect(`${sourceUrl.origin}/scribe/${sourceUrl.search}`, 308);
		}
		if (sourceUrl.pathname === "/scribe!") {
			return Response.redirect(`${sourceUrl.origin}/scribe!/${sourceUrl.search}`, 308);
		}
		if (sourceUrl.pathname === "/scribe/") {
			upstreamOrigin = BOOKS_ORIGIN;
			upstreamPath = "/books/scribe/";
		} else if (sourceUrl.pathname === "/scribe!/") {
			upstreamOrigin = WEBSITE_ORIGIN;
			upstreamPath = "/scribe!/";
		}

		const upstreamUrl = new URL(upstreamPath, upstreamOrigin);
		upstreamUrl.search = sourceUrl.search;
		const headers = new Headers(request.headers);
		headers.set("x-reader-router-proxy", "1");
		headers.set("x-reader-canonical-origin", sourceUrl.origin);

		const response = await fetch(new Request(upstreamUrl, {
			method: request.method,
			headers,
			body: request.body,
			redirect: "manual",
		}));
		const responseHeaders = new Headers(response.headers);
		responseHeaders.set("x-readerpub-website-staging-router", "1");

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: responseHeaders,
		});
	},
};
