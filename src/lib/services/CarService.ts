import type { IPagination } from '$lib/stores/pagination';
import type { LicenseCategory } from '$lib/types/LicenseTypes';
import { getAll, makeParams } from './Base/BaseService';
import { PROXY_DELETE, PROXY_GET, PROXY_POST, PROXY_PUT } from './Base/ProxyService';

export interface ICarCreate {
	plate_number: string;
	brand: string;
	seat_amount: number;
	available_km?: number;
	id_driver?: number;
	category: LicenseCategory;
}
export interface ICar extends ICarCreate {
	id_car: number;
}
export interface ICarEdit extends ICarCreate {}

export const getCars = async (pagination: IPagination): Promise<ICar[]> => {
	return PROXY_GET('/cars', makeParams(pagination));
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
