import { JWT_SIGN_KEY } from "$env/static/private"
import { CustomHttpError } from "$lib/CustomError"
import { Cookie, getCookieSettings } from "$lib/server-utils"
import { ErrorCode } from "$lib/types/ErrorCodes"
import type { RequestHandler } from "@sveltejs/kit"
import jwt from 'jsonwebtoken'
import { json } from "@sveltejs/kit"


export const POST: RequestHandler = async ({ cookies }) => {
    const refresh = cookies.get(Cookie.REFRESH) ?? ''
    if (!refresh) throw new CustomHttpError(401, ErrorCode.UNAUTHORIZED, 'Invalid refresh token').build()
    const decoded = jwt.verify(refresh, JWT_SIGN_KEY)
    if (!decoded) throw new CustomHttpError(401, ErrorCode.UNAUTHORIZED, "Invalid refresh token").build()
    const token = jwt.sign(decoded, JWT_SIGN_KEY)
    cookies.set(Cookie.TOKEN, token, getCookieSettings({ 'maxAge': 60 * 60 * 24 }))
    return json(null)
}