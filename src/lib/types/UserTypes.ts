export type RoleType = 'administrator' | 'support' | 'agent' | 'driver';

interface IUserBase {
	username: string;
	role: RoleType;
	email: string;
}
export interface IUserCreate extends IUserBase {
	password: string;
	id_driver?: number;
}
export interface IUser extends IUserBase {
	id_user: number;
}

export interface IUserEdit extends IUserBase {}
export interface IUserChangePassword {
	old_password: string;
	new_password: string;
}
