import { CustomHttpError } from '$lib/CustomError';
import { authenticate } from '$lib/server-utils';
import { ErrorCode } from '$lib/types/ErrorCodes';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies, params }) => {
	authenticate(cookies);
	const { id } = params;
	if (id === undefined)
		throw new CustomHttpError(404, ErrorCode.NOT_FOUND, 'entry not found').build();
	return json(null);
};

export const DELETE: RequestHandler = async ({ cookies, params }) => {
	authenticate(cookies);
	const { id } = params;
	if (id === undefined)
		throw new CustomHttpError(404, ErrorCode.NOT_FOUND, 'entry not found').build();
	return json(null);
};

export const PATCH: RequestHandler = async ({ cookies, params, request }) => {
	authenticate(cookies);
	const { id } = params;
	if (id === undefined)
		throw new CustomHttpError(404, ErrorCode.NOT_FOUND, 'entry not found').build();

	const {} = await request.json();
	return json(null);
};
