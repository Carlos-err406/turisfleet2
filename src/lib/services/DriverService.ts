import type { IPagination } from '$lib/stores/pagination';
import type { LicenseCategory } from '$lib/types/LicenseTypes';
import { getAll, makeParams } from './Base/BaseService';
import { PROXY_DELETE, PROXY_GET, PROXY_POST, PROXY_PUT } from './Base/ProxyService';

export interface IDriverCreate {
	id_number: string;
	name: string;
	address: string;
	license_categories: LicenseCategory[];
}
export interface IDriver extends IDriverCreate {
	id_driver: number;
}

export interface IDriverEdit extends IDriverCreate {}

export const getDrivers = (pagination: IPagination): Promise<IDriver[]> => {
	return PROXY_GET('/drivers', makeParams(pagination));
};

export const getDriver = (id: number): Promise<IDriver> => {
	return PROXY_GET(`/drivers/${id}`);
};

export const deleteDriver = (id: number): Promise<void> => {
	return PROXY_DELETE('/drivers/' + id);
};

export const createDriver = (driver: IDriverCreate): Promise<IDriver> => {
	return PROXY_POST('/drivers', JSON.stringify(driver));
};

export const editDriver = (id: number, driver: IDriverEdit): Promise<IDriver> => {
	return PROXY_PUT('/drivers/' + id, JSON.stringify(driver));
};

export const getAllDrivers = async (chunkSize = 200): Promise<IDriver[]> => {
	return getAll<IDriver>(getDrivers, chunkSize);
};
