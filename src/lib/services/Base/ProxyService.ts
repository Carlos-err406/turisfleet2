import { fetchWrapper, handleResponse } from './BaseService';
export const ENDPOINT_HEADER = 'X-Endpoint';
export const URL = '/proxy';
export const buildUrl = (params = '', route = '') => URL + route + params;

export async function PROXY_GET<T>(endpoint: string, searchParams = '', route = '') {
	const headers = new Headers();
	headers.append(ENDPOINT_HEADER, endpoint);
	const options: RequestInit = { method: 'GET', headers };
	const url = buildUrl(searchParams, route);
	let response: Response;
	response = await fetchWrapper(url, options);
	return await handleResponse<T>(response);
}

export async function PROXY_DELETE<T>(endpoint: string, searchParams = '', route = '') {
	const headers = new Headers();
	headers.append(ENDPOINT_HEADER, endpoint);
	const options: RequestInit = { method: 'DELETE', headers };
	const url = buildUrl(searchParams, route);
	let response: Response;
	response = await fetchWrapper(url, options);
	return await handleResponse<T>(response);
}
export async function PROXY_POST<T>(
	endpoint: string,
	body: BodyInit | null | undefined,
	searchParams = '',
	route = ''
) {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append(ENDPOINT_HEADER, endpoint);
	const options: RequestInit = { headers, method: 'POST', body };
	const url = buildUrl(searchParams, route);
	let response: Response;
	response = await fetchWrapper(url, options);
	return await handleResponse<T>(response);
}
export async function PROXY_PUT<T>(
	endpoint: string,
	body: BodyInit | null | undefined,
	searchParams = '',
	route = ''
) {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append(ENDPOINT_HEADER, endpoint);
	const options: RequestInit = { headers, method: 'PUT', body };
	const url = buildUrl(searchParams, route);
	let response: Response;
	response = await fetchWrapper(url, options);
	return await handleResponse<T>(response);
}
export async function PROXY_PATCH<T>(
	endpoint: string,
	body: BodyInit | null | undefined,
	searchParams = '',
	route = ''
) {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append(ENDPOINT_HEADER, endpoint);
	const options: RequestInit = { headers, method: 'PUT', body };
	const url = buildUrl(searchParams, route);
	let response: Response;
	response = await fetchWrapper(url, options);
	return await handleResponse<T>(response);
}
