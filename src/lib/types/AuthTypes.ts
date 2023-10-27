import type { RoleType } from './UserTypes';

export interface ILogin {
	username: string;
	password: string;
}
export interface ILoggedUser {
	id_user: number;
	role: RoleType;
	username: string;
	email: string;
}
