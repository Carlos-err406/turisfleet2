import CustomError from '../CustomError';
import * as proxy from './Base/ProxyService';
import { GET } from './Base/LocalService'
export const login = async (auth: LoginDTO): Promise<LoggedUserDTO> => {
	//TODO change endpoint when api is ready
	//   const response = await fetch('/proxy', {
	const response = await fetch('/api/auth/login', {
		method: 'POST',
		body: JSON.stringify(auth),
		headers: {
			'Content-Type': 'application/json',
			[proxy.ENDPOINT_HEADER]: '/login',
		},
	});

	const json = await response.json();
	if (response.status === 401) {
		const { exceptionID, message } = json;
		throw new CustomError(exceptionID, message);
	}

	return json;
};

export const refresh = async () => {
	//TODO change endpoint when api is ready
	const proxyEndpoint = "/api/auth/refresh";
	// const proxyEndpoint = "/proxy";
	const refreshEndpoint = "/refresh";
	const headers = { "Content-Type": "application/json", [proxy.ENDPOINT_HEADER]: refreshEndpoint };

	const response = await fetch(proxyEndpoint, {
		method: "POST",
		body: null,
		headers: headers
	});

	return response;
}

export const logout = async () => {
	await refresh();
	return proxy.PROXY_DELETE('/logout');
}

export const getUser = async (): Promise<LoggedUserDTO> => {
	return await GET("/auth/refresh")
}


export interface LoginDTO {
	username: string;
	password: string;
	// captcha: string;
}
export interface LoggedUserDTO {
	id_user: number;
	role_name: 'administrator' | 'driver' | 'agent' | 'support' | '';
	id_role: number;
	username: string;
}
