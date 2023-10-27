import type { IPagination } from '$lib/stores/pagination';
import type { ICar, ICarCreate, ICarEdit } from '$lib/types/CarTypes';
import { getAll, makeParams, type PaginatedResponse } from './Base/BaseService';
import { PROXY_DELETE, PROXY_GET, PROXY_POST, PROXY_PUT } from './Base/ProxyService';

export const getCars = async (
	pagination: IPagination,
	query?: string
): Promise<PaginatedResponse<ICar[]>> => {
	const params = { ...pagination };
	query && Object.assign(params, { query });
	return PROXY_GET('/cars', makeParams(params));
};
export const deleteCar = async (id: number): Promise<void> => {
	return PROXY_DELETE('/cars/' + id);
};
export const createCar = async (car: ICarCreate): Promise<ICar> => {
	return PROXY_POST('/cars', JSON.stringify(car));
};
export const editCar = async (id: number, car: ICarEdit): Promise<ICar> => {
	return PROXY_PUT('/cars/' + id, JSON.stringify(car));
};

export const getAllCars = async (chunkSize = 200): Promise<ICar[]> => {
	return getAll<ICar>(getCars, chunkSize);
};

export const isValidPlateNumber = (plate: string) => {
	const plateNumberRegx = new RegExp(/[a-zA-Z][0-9]{6}/g);
	const isValid = plateNumberRegx.test(plate);
	return isValid;
};
