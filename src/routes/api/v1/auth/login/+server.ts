import { JWT_SIGN_KEY } from "$env/static/private";
import { CustomHttpError } from "$lib/CustomError";
import { Cookie, getCookieSettings } from "$lib/server-utils";
import { ErrorCode } from "$lib/types/ErrorCodes";
import { json, type RequestHandler } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';

export const POST: RequestHandler = async ({ request, cookies }) => {
    const { username, password } = await request.json()
    if (username !== 'admin' || password !== 'admin')
        throw new CustomHttpError(401, ErrorCode.INVALID_CREDENTIALS, 'Unauthorized').build()

    const user = {
        id_user: '0001',
        role_name: 'administrator',
        id_role: 0,
        username: 'admin',
    }
    const token = jwt.sign(user, JWT_SIGN_KEY)
    const refreshToken = jwt.sign(token, JWT_SIGN_KEY)
    cookies.set(Cookie.TOKEN, token, getCookieSettings({ maxAge: 60 * 60 * 24 }))
    cookies.set(Cookie.REFRESH, refreshToken, getCookieSettings())
    return json(user)
}
