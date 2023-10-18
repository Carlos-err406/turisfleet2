import { API_URL } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';
import type { CookieSerializeOptions } from 'cookie';
import dayjs from 'dayjs';

export const buildURL = (endpoint: string, search = '') => API_URL + endpoint + search;
export const ENDPOINT_HEADER = 'X-Endpoint';
export const CSRF_HEADER = 'X-CSRF-Token';

export const getCookieSettings = (
	opts?: Partial<CookieSerializeOptions>
): CookieSerializeOptions => ({
	httpOnly: true,
	path: '/',
	sameSite: true,
	secure: true,
	...opts
});

export const getCookiesHeader = (cookies: Cookies) =>
	cookies
		.getAll()
		.map((cookie) => `${cookie.name}=${cookie.value}`)
		.join('; ');
export const getCSRFAccessHeader = (cookies: Cookies) => cookies.get('csrf_access_token') ?? '';
export const getCSRFRefreshHeader = (cookies: Cookies) => cookies.get('csrf_refresh_token') ?? '';

export const CYAN_BOLD = (content: string | number) => `\x1b[1;36m${content}\x1b[0m`;
export const YELLOW_BOLD = (content: string | number) => `\x1b[1;33m${content}\x1b[0m`;
export const YELLOW = (content: string | number) => `\x1b[0;33m${content}\x1b[0m`;
export const GREEN_BOLD = (content: string | number) => `\x1b[1;32m${content}\x1b[0m`;
export const RED_BOLD = (content: string | number) => `\x1b[1;31m${content}\x1b[0m`;

export const log = (request: Request, status: number, pathname: string) => {
	const date = dayjs().format('YYYY/MM/DD hh:mm:ss A ');
	const { method, headers } = request;
	const proxyEndpoint = headers.get(ENDPOINT_HEADER) || 'no proxy endpoint';
	pathname = decodeURIComponent(pathname);
	process.stdout.write(YELLOW(date));
	if (status >= 400) {
		process.stdout.write(RED_BOLD(`${method} ${pathname} [${proxyEndpoint}] ${status}`));
	} else {
		process.stdout.write(
			`${CYAN_BOLD(method)} ${GREEN_BOLD(pathname)} [${GREEN_BOLD(proxyEndpoint)}] ${YELLOW_BOLD(
				status
			)}`
		);
	}
	console.log();
};
