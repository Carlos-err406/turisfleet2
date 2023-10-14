import CustomError from '../CustomError';
import BaseService from './BaseService';

export default class AuthService extends BaseService {
	protected static instance: AuthService;

	private constructor() {
		super();
		this.service = 'auth';
	}

	public static getInstance(): AuthService {
		if (!AuthService.instance) return new AuthService();
		return AuthService.instance;
	}

	public async login(auth: LoginDTO): Promise<LoggedUserDTO> {
		return await fetch(this.url('/login'), {
			method: 'POST',
			body: JSON.stringify(auth),
			headers: { 'Content-Type': 'application/json' }
		}).then(async (response) => {
			const json = await response.json();
			if (response.status === 401) {
				const { exceptionID, message } = json;
				throw new CustomError(exceptionID, message);
			}
			return json;
		});
	}

	public async refresh() {
		return await fetch(this.url('/refresh'), {
			method: 'POST',
			body: JSON.stringify({}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	public async logout() {
		await this.refresh();
		return this.delete(this.url('/logout'));
	}

	public async getUser(): Promise<LoggedUserDTO> {
		return await fetch(this.url('/refresh')).then((response) => response.json());
	}
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
