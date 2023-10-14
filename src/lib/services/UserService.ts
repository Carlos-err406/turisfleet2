import BaseService from './BaseService';

export default class UserService extends BaseService {
	protected static instance: UserService;

	private constructor() {
		super();
		this.service = 'users';
	}

	public static getInstance(): UserService {
		if (!UserService.instance) return new UserService();
		return UserService.instance;
	}
}
