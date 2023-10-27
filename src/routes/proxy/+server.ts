import {
	CSRF_HEADER,
	ENDPOINT_HEADER,
	buildURL,
	getCSRFAccessHeader,
	getCookiesHeader
} from '$lib/server-utils';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, request, cookies }) => {
	const { headers } = request;
	const { search } = url;
	const endpoint = headers.get(ENDPOINT_HEADER) || '';
	return await fetch(buildURL(endpoint, search), {
		method: 'GET',
		headers: {
			Cookie: getCookiesHeader(cookies),
			[CSRF_HEADER]: getCSRFAccessHeader(cookies)
		}
	});
};
export const DELETE: RequestHandler = async ({ url, request, cookies }) => {
	const { search } = url;
	const { headers } = request;
	const endpoint = headers.get(ENDPOINT_HEADER) || '';
	return await fetch(buildURL(endpoint, search), {
		method: 'DELETE',
		headers: {
			Cookie: getCookiesHeader(cookies),
			[CSRF_HEADER]: getCSRFAccessHeader(cookies)
		}
	});
};

export const POST: RequestHandler = async ({ url, request, cookies }) => {
	const { search } = url;
	const { headers } = request;
	const endpoint = headers.get(ENDPOINT_HEADER) || '';
	const body = await request.json();
	return await fetch(buildURL(endpoint, search), {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Cookie: getCookiesHeader(cookies),
			[CSRF_HEADER]: getCSRFAccessHeader(cookies)
		}
	});
};
export const PUT: RequestHandler = async ({ url, request, cookies }) => {
	const { search } = url;
	const { headers } = request;
	const endpoint = headers.get(ENDPOINT_HEADER) || '';
	const body = await request.json();
	return await fetch(buildURL(endpoint, search), {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Cookie: getCookiesHeader(cookies),
			[CSRF_HEADER]: getCSRFAccessHeader(cookies)
		}
	});
};
export const PATCH: RequestHandler = async ({ url, request, cookies }) => {
	const { search } = url;
	const { headers } = request;
	const endpoint = headers.get(ENDPOINT_HEADER) || '';
	const body = await request.json();
	return await fetch(buildURL(endpoint, search), {
		method: 'PATCH',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Cookie: getCookiesHeader(cookies),
			[CSRF_HEADER]: getCSRFAccessHeader(cookies)
		}
	});
};
