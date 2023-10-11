import { Cookie, getCookieSettings } from "$lib/server-utils";
import { json, type RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = ({ cookies }) => {
    cookies.set(Cookie.TOKEN, '', getCookieSettings({ 'expires': new Date() }))
    cookies.set(Cookie.REFRESH, '', getCookieSettings({ 'expires': new Date() }))
    return json(null)
}