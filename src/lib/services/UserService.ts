import { loggedUser } from '$lib/stores';
import type { IPagination } from '$lib/stores/pagination';
import { get } from 'svelte/store';
import { makeParams, type PaginatedResponse } from './Base/BaseService';
import { PROXY_DELETE, PROXY_GET, PROXY_POST, PROXY_PUT } from './Base/ProxyService';
import CustomError from '$lib/CustomError';
import type { IUser, IUserCreate, IUserEdit, IUserChangePassword } from '$lib/types/UserTypes';

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

const emailRegex = new RegExp(
	/^[a-z0-9]+([._+-][a-z0-9]+)*@[a-z0-9-_]+(\.[a-z0-9-_]+)*\.[a-z0-9]{2,}$/
);

export const validateEmail = (email: string) => !emailRegex.test(email);
