import type { IPagination } from '$lib/stores/pagination';
import type { IDriver, IDriverCreate, IDriverEdit } from '$lib/types/DriverTypes';
import dayjs from 'dayjs';
import { getAll, makeParams, type PaginatedResponse } from './Base/BaseService';
import { PROXY_DELETE, PROXY_GET, PROXY_POST, PROXY_PUT } from './Base/ProxyService';

export const getDrivers = (
	pagination: IPagination,
	query?: string
): Promise<PaginatedResponse<IDriver[]>> => {
	const params = { ...pagination };
	query && Object.assign(params, { query });
	return PROXY_GET('/drivers', makeParams(params));
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

export const validateIDNumber = (idNumber: string) => {
	if (idNumber.length !== 11) {
		return false;
	}

	const [year, month, day] = [
		parseInt(idNumber.slice(0, 2)),
		parseInt(idNumber.slice(2, 4)),
		parseInt(idNumber.slice(4, 6))
	];

	const date = dayjs(`${month}-${day}-${year}`);
	let isValid = true;
	if (month < 1 || month > 12) isValid = false;
	else if (day > 31 || day < 1) isValid = false;
	else if (month == 2 && day > 29) isValid = false;
	else if ([1, 3, 5, 7, 9, 10, 12].includes(month) && day > 31) isValid = false;
	else if ([4, 6, 8, 11].includes(month) && day > 30) isValid = false;

	return isValid && date.isValid();
};
