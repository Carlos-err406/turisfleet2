import CustomError from '$lib/CustomError';
import * as proxy from './Base/ProxyService';
import type { RoleType } from './UserService';

export const login = async (auth: ILogin): Promise<ILoggedUser> => {
	const response = await fetch(proxy.URL, {
		method: 'POST',
		body: JSON.stringify(auth),
		headers: {
			[proxy.ENDPOINT_HEADER]: '/security/login',
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (response.status === 401) throw new CustomError('00040', 'invalid credentials');
		else return response.json();
	});
	return response;
};

export const refresh = async () => {
	return fetch(proxy.buildUrl('', '/refresh'), {
		body: null,
		method: 'POST',
		headers: { [proxy.ENDPOINT_HEADER]: '/security/refresh' }
	});
};

export const logout = async () => {
	await refresh();
	return proxy.PROXY_DELETE('/security/logout');
};

export interface ILogin {
	username: string;
	password: string;
}
export interface ILoggedUser {
	id_user: number;
	role: RoleType;
	username: string;
}
