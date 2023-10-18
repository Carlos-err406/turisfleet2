import {
	CSRF_HEADER,
	buildURL,
	getCSRFRefreshHeader,
	getCookiesHeader,
	ENDPOINT_HEADER
} from '$lib/server-utils';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies, request }) => {
	const { headers } = request;
	const endpoint = headers.get(ENDPOINT_HEADER) || '';
	const response = await fetch(buildURL(endpoint), {
		headers: {
			Cookie: getCookiesHeader(cookies),
			[CSRF_HEADER]: getCSRFRefreshHeader(cookies)
		},
		body: null,
		method: 'POST'
	});
	return response;
};
