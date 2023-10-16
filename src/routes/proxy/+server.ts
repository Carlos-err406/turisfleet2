import { API_URL } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
const ENDPOINT_HEADER = 'X-Endpoint';
const buildURL = (endpoint: string, search = '') => API_URL + '/' + endpoint + search;
export const GET: RequestHandler = async ({ url, request }) => {
	const { headers } = request;
	const { search } = url;
	let endpoint = headers.get(ENDPOINT_HEADER) || '';
	return await fetch(buildURL(endpoint, search), {
		method: 'GET'
	});
};
export const DELETE: RequestHandler = async ({ url, request }) => {
	const { search } = url;
	const { headers } = request;
	const endpoint = headers.get(ENDPOINT_HEADER) || '';
	return await fetch(buildURL(endpoint, search), {
		method: 'DELETE'
	});
};

export const POST: RequestHandler = async ({ url, request }) => {
	const { search } = url;
	const { headers } = request;
	const endpoint = headers.get(ENDPOINT_HEADER) || '';
	const body = await request.json();
	return await fetch(buildURL(endpoint, search), {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
export const PUT: RequestHandler = async ({ url, request }) => {
	const { search } = url;
	const { headers } = request;
	const endpoint = headers.get(ENDPOINT_HEADER) || '';
	const body = await request.json();
	return await fetch(buildURL(endpoint, search), {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
export const PATCH: RequestHandler = async ({ url, request }) => {
	const { search } = url;
	const { headers } = request;
	const endpoint = headers.get(ENDPOINT_HEADER) || '';
	const body = await request.json();
	return await fetch(buildURL(endpoint, search), {
		method: 'PATCH',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
