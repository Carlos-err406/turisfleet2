import type { IPagination } from '$lib/stores/pagination';
import { makeParams } from './Base/BaseService';
import { PROXY_DELETE, PROXY_GET, PROXY_POST, PROXY_PUT } from './Base/ProxyService';

export type RoleType = 'administrator' | 'support' | 'agent' | 'driver';
export interface IUserCreate {
	username: string;
	password: string;
	role: RoleType;
}
export interface IUser {
	id_user: number;
	role: RoleType;
	username: string;
}

export interface IUserEdit {
	username: string;
}
export interface IUserChangePassword {
	password: string;
}

export const getUsers = (pagination: IPagination): Promise<IUser[]> => {
	return PROXY_GET('/users', makeParams(pagination));
};

export const deleteUser = (id: number): Promise<void> => {
	return PROXY_DELETE('/users/' + id);
};

export const createUser = (user: IUserCreate): Promise<IUser> => {
	return PROXY_POST('/users', JSON.stringify(user));
};

export const editUser = (id: number, user: IUserEdit): Promise<IUser> => {
	return PROXY_PUT('/users/' + id, JSON.stringify(user));
};

export const changePassword = () => {};
