import BaseService from './BaseService';

export default class DriverService extends BaseService {
    protected static instance: DriverService;

    private constructor() {
        super();
        this.service = 'drivers';
    }

    public static getInstance(): DriverService {
        if (!DriverService.instance) return new DriverService();
        return DriverService.instance;
    }

}

