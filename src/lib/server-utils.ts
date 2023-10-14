import { JWT_SIGN_KEY } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';
import type { CookieSerializeOptions } from 'cookie';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import { CustomHttpError } from './CustomError';
import { ErrorCode } from './types/ErrorCodes';
export enum Cookie {
	TOKEN = 'Turisfleet-Token',
	REFRESH = 'Turisfleet-RefreshToken'
}

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

export const getTokenHeader = (cookies: Cookies) => cookies.get(Cookie.TOKEN) ?? '';

export const authenticate = (cookies: Cookies) => {
	const token = cookies.get(Cookie.TOKEN) ?? '';
	const verified = jwt.verify(token, JWT_SIGN_KEY);
	if (!verified) throw new CustomHttpError(401, ErrorCode.UNAUTHORIZED, 'Invalid token').build();
};

export const CYAN_BOLD = (content: string | number) => `\x1b[1;36m${content}\x1b[0m`;
export const YELLOW_BOLD = (content: string | number) => `\x1b[1;33m${content}\x1b[0m`;
export const YELLOW = (content: string | number) => `\x1b[0;33m${content}\x1b[0m`;
export const GREEN_BOLD = (content: string | number) => `\x1b[1;32m${content}\x1b[0m`;
export const RED_BOLD = (content: string | number) => `\x1b[1;31m${content}\x1b[0m`;

export const log = (method: string, status: number, pathname: string) => {
	const date = dayjs().format('YYYY/MM/DD hh:mm:ss A ');
	pathname = decodeURIComponent(pathname);
	process.stdout.write(YELLOW(date));
	if (status >= 400) {
		process.stdout.write(RED_BOLD(`${method} ${pathname} ${status}`));
	} else {
		process.stdout.write(`${CYAN_BOLD(method)} ${GREEN_BOLD(pathname)} ${YELLOW_BOLD(status)}`);
	}
	console.log();
};
