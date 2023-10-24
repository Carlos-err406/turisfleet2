import { LOGGING } from '$env/static/private';
import {
	CSRF_HEADER,
	ENDPOINT_HEADER,
	getCSRFRefreshHeader,
	getCookiesHeader,
	log
} from '$lib/server-utils';
import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;
	await handleRedirectionWrapper(event);
	const response = await resolve(event);
	if (LOGGING === '1' && pathname.includes("/proxy")) log(event.request, response.status, pathname);
	return response;
};

const handleRedirectionWrapper = async (event: RequestEvent) => {
	const { pathname } = event.url;
	const appPageEndpoints = [
		'/app/users',
		'/app/drivers',
		'/app/groups',
		'/app/cars',
		'/app/programs',
		'/app/programs/specific',
		'/app/situations',
		'/app/situations/car',
		'/app/situations/driver'
	];
	try {
		if (['/', '/app'].includes(pathname)) {
			await handleRedirection(event, '/app/users');
		} else if (appPageEndpoints.includes(pathname)) {
			await handleRedirection(event);
		}
	} catch (e: any) {
		throw redirect(302, e);
	}
};

const handleRedirection = async (event: RequestEvent, url?: string) => {
	const { cookies, fetch } = event;
	return new Promise(async (resolve, reject) => {
		const { status } = await fetch('/proxy/refresh', {
			method: 'POST',
			body: null,
			headers: {
				Cookie: getCookiesHeader(cookies),
				[CSRF_HEADER]: getCSRFRefreshHeader(cookies),
				[ENDPOINT_HEADER]: '/security/refresh'
			}
		});
		if ([401, 400].includes(status)) {
			reject('/auth/login');
		} else if (url) {
			reject(url);
		}
		resolve(null);
	});
};
