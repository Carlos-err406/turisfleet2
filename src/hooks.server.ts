import { LOGGING } from '$env/static/private';
import {
	CSRF_HEADER,
	ENDPOINT_HEADER,
	getCSRFRefreshHeader,
	getCookiesHeader,
	log
} from '$lib/server-utils';
import { redirect, type Cookies, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;
	await handleRedirectionWrapper(pathname, event.fetch, event.cookies);
	const response = await resolve(event);

	if (LOGGING === '1' && (pathname.includes('/proxy') || pathname.includes('/api'))) {
		log(event.request, response.status, pathname);
	}

	return response;
};

const handleRedirectionWrapper = async (pathname: string, fetch: any, cookies: Cookies) => {
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
	if (['/', '/app'].includes(pathname)) {
		await handleRedirection(cookies, fetch, '/app/users');
	} else if (appPageEndpoints.includes(pathname)) {
		await handleRedirection(cookies, fetch);
	}
};

const handleRedirection = async (cookies: Cookies, fetch: any, url?: string) =>
	fetch('/proxy/refresh', {
		method: 'POST',
		body: null,
		headers: {
			Cookie: getCookiesHeader(cookies),
			[CSRF_HEADER]: getCSRFRefreshHeader(cookies),
			[ENDPOINT_HEADER]: '/security/refresh'
		}
	}).then((r: Response) => {
		if ([401, 400].includes(r.status)) {
			throw redirect(302, '/auth/login');
		} else if (url) {
			throw redirect(302, url);
		}
	});
