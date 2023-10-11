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
    const valid = jwt.verify(refresh, JWT_SIGN_KEY)
    if (!valid) throw new CustomHttpError(401, ErrorCode.UNAUTHORIZED, "Invalid refresh token").build()
    const token = jwt.decode(refresh) as any
    const data = jwt.decode(token) as any
    const newToken = jwt.sign(data, JWT_SIGN_KEY)
    cookies.set(Cookie.TOKEN, newToken, getCookieSettings({ 'maxAge': 60 * 60 * 24 }))
    return json(null)
}

export const GET: RequestHandler = ({ cookies }) => {
    const token = cookies.get(Cookie.TOKEN)
    if (!token) throw new CustomHttpError(401, ErrorCode.UNAUTHORIZED, 'Invalid token').build()
    const valid = jwt.verify(token, JWT_SIGN_KEY)
    if (!valid) throw new CustomHttpError(401, ErrorCode.UNAUTHORIZED, 'Invalid token').build()
    let user = jwt.decode(token)
    return json(user)
}