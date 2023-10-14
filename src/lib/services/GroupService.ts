import BaseService from './BaseService';

export default class GroupService extends BaseService {
	protected static instance: GroupService;

	private constructor() {
		super();
		this.service = 'groups';
	}

	public static getInstance(): GroupService {
		if (!GroupService.instance) return new GroupService();
		return GroupService.instance;
	}
}
