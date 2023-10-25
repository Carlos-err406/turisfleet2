import { loggedUser } from '$lib/stores';
import type { IPagination } from '$lib/stores/pagination';
import { get } from 'svelte/store';
import { makeParams, type PaginatedResponse } from './Base/BaseService';
import { PROXY_DELETE, PROXY_GET, PROXY_POST, PROXY_PUT } from './Base/ProxyService';
import CustomError from '$lib/CustomError';

export type RoleType = 'administrator' | 'support' | 'agent' | 'driver';

interface IUserBase {
	username: string;
	role: RoleType;
}
export interface IUserCreate extends IUserBase {
	password: string;
}
export interface IUser extends IUserBase {
	id_user: number;
}

export interface IUserEdit extends IUserBase {}
export interface IUserChangePassword {
	old_password: string;
	new_password: string;
}

export const getUsers = (
	pagination: IPagination,
	query?: string
): Promise<PaginatedResponse<IUser[]>> => {
	const params = { ...pagination };
	query && Object.assign(params, { query });
	return PROXY_GET('/users', makeParams(params));
};

export const getUser = (id: number): Promise<IUser> => {
	return PROXY_GET(`/users/${id}`);
};

export const deleteUser = (id: number): Promise<void> => {
	if (id === get(loggedUser)?.id_user) {
		throw new CustomError('99999', 'tried to delete logged user');
	}
	return PROXY_DELETE('/users/' + id);
};

export const createUser = (user: IUserCreate): Promise<IUser> => {
	return PROXY_POST('/users', JSON.stringify(user));
};

export const editUser = (id: number, user: IUserEdit): Promise<IUser> => {
	return PROXY_PUT('/users/' + id, JSON.stringify(user));
};

export const changePassword = (id: number, passwordInput: IUserChangePassword): Promise<void> => {
	return PROXY_PUT(`/users/${id}/password`, JSON.stringify(passwordInput));
};
