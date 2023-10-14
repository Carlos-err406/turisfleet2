import BaseService from './BaseService';

export default class SituationService extends BaseService {
	protected static instance: SituationService;

	private constructor() {
		super();
		this.service = 'situations';
	}

	public static getInstance(): SituationService {
		if (!SituationService.instance) return new SituationService();
		return SituationService.instance;
	}
}
