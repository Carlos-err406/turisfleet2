import { env } from '$env/dynamic/private';
import { getCookiesHeader, log } from '$lib/server-utils';
import { redirect, type Cookies, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const { pathname } = event.url;
    await handleRedirectionWrapper(pathname, event.fetch, event.cookies);
    const response = await resolve(event);
    pathname.includes('/api') &&
        env.LOGGING == '1' &&
        log(event.request.method, response.status, pathname);
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
        '/app/situations/driver',
    ];
    if (['/', '/app'].includes(pathname)) {
        await handleRedirection(cookies, fetch, '/app/users');
    } else if (appPageEndpoints.includes(pathname)) {
        await handleRedirection(cookies, fetch);
    }
};

const handleRedirection = async (cookies: Cookies, fetch: any, url?: string) =>
    fetch('/api/v1/auth/refresh', {
        method: 'POST',
        headers: {
            Cookie: getCookiesHeader(cookies),
        }
    }).then((r: Response) => {
        if ([401, 400].includes(r.status)) {
            throw redirect(302, '/auth/login');
        } else if (url) {
            throw redirect(302, url);
        }
    });
