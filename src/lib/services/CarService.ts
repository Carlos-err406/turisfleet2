import BaseService from './BaseService';

export default class CarService extends BaseService {
	protected static instance: CarService;

	private constructor() {
		super();
		this.service = 'cars';
	}

	public static getInstance(): CarService {
		if (!CarService.instance) return new CarService();
		return CarService.instance;
	}
}
