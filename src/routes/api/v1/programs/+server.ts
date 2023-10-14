import { authenticate } from '$lib/server-utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies, url }) => {
	authenticate(cookies);
	const { searchParams } = url;
	const limit = searchParams.get('limit') ?? 100;
	const page = searchParams.get('page') ?? 1;
	return json(null);
};

export const POST: RequestHandler = async ({ cookies, request }) => {
	authenticate(cookies);
	const {} = await request.json();
	return json(null);
};
