import CustomError from '$lib/CustomError';
import type { ILoggedUser, ILogin } from '$lib/types/AuthTypes';
import { ENDPOINT_HEADER, PROXY_DELETE, URL, buildUrl } from './Base/ProxyService';

export const login = async (auth: ILogin): Promise<ILoggedUser> => {
	const response = await fetch(URL, {
		method: 'POST',
		body: JSON.stringify(auth),
		headers: {
			[ENDPOINT_HEADER]: '/security/login',
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (response.status === 401) throw new CustomError('00040', 'invalid credentials');
		return response.json();
	});
	return response;
};

export const refresh = async () => {
	return fetch(buildUrl('', '/refresh'), {
		body: null,
		method: 'POST',
		headers: { [ENDPOINT_HEADER]: '/security/refresh' }
	});
};

export const logout = async () => {
	await refresh();
	return PROXY_DELETE('/security/logout');
};
