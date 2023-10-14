import BaseService from './BaseService';

export default class RequestService extends BaseService {
	protected static instance: RequestService;

	private constructor() {
		super();
		this.service = 'requests';
	}

	public static getInstance(): RequestService {
		if (!RequestService.instance) return new RequestService();
		return RequestService.instance;
	}
}
