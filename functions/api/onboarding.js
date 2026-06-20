const SOURCE_ONBOARDING_ENDPOINT = "https://reader.pub/api/onboarding";

export async function onRequest({ request }) {
	if (request.method !== "POST") {
		return Response.json(
			{ ok: false, error: "Method not allowed" },
			{
				status: 405,
				headers: {
					allow: "POST",
					"cache-control": "no-store",
				},
			}
		);
	}

	try {
		const requestBody = await request.arrayBuffer();
		const requestContentType = request.headers.get("content-type");
		const response = await fetch(SOURCE_ONBOARDING_ENDPOINT, {
			method: "POST",
			body: requestBody,
			headers: {
				Accept: "application/json",
				...(requestContentType ? { "content-type": requestContentType } : {}),
			},
		});
		const contentType = response.headers.get("content-type") || "application/json; charset=utf-8";
		const responseBody = await response.text();

		return new Response(responseBody, {
			status: response.status,
			headers: {
				"content-type": contentType,
				"cache-control": "no-store",
			},
		});
	} catch {
		return Response.json(
			{ ok: false, error: "We could not submit your request. Please try again." },
			{
				status: 502,
				headers: {
					"cache-control": "no-store",
				},
			}
		);
	}
}
