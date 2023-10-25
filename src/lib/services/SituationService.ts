import type { IPagination } from '$lib/stores/pagination';
import { getAll, makeParams, type PaginatedResponse } from './Base/BaseService';
import { PROXY_DELETE, PROXY_GET, PROXY_POST, PROXY_PUT } from './Base/ProxyService';
import type { ICar } from './CarService';
import type { IDriver } from './DriverService';

//-------------------------
//START SITUATIONS
export type SituationType = 'car' | 'driver' | 'car_driver';

export interface ISituationCreate {
	situation_name: string;
	situation_type: SituationType;
}
export interface ISituation extends ISituationCreate {
	id_situation: number;
}
export interface ISituationEdit extends ISituationCreate {}

export const getSituations = async (
	pagination: IPagination,
	query?: string
): Promise<PaginatedResponse<ISituation[]>> => {
	const params = { ...pagination };
	query && Object.assign(params, { query });
	return PROXY_GET('/situations', makeParams(params));
};
export const deleteSituation = async (id: number): Promise<void> => {
	return PROXY_DELETE(`/situations/${id}`);
};
export const createSituation = async (situation: ISituationCreate): Promise<ISituation> => {
	return PROXY_POST('/situations', JSON.stringify(situation));
};
export const editSituation = async (id: number, situation: ISituationEdit): Promise<ISituation> => {
	return PROXY_PUT(`/situations/${id}`, JSON.stringify(situation));
};

export const getAllSituations = async (chunkSize = 200): Promise<ISituation[]> => {
	return getAll<ISituation>(getSituations, chunkSize);
};

//END SITUATIONS
//-------------------------

//-------------------------
//START DRIVER SITUATIONS
interface IDriverSituationBase {
	date: string | Date;
	return_date?: string | Date;
}
export interface IDriverSituationCreate extends IDriverSituationBase {
	id_situation: number;
}
export interface IDriverSituation extends IDriverSituationBase {
	driver: IDriver;
	situation: ISituation;
}

export interface IDriverSituationEdit extends IDriverSituationCreate {}

export const getDriversSituations = async (
	pagination: IPagination,
	query?: string
): Promise<PaginatedResponse<IDriverSituation[]>> => {
	const params = { ...pagination };
	query && Object.assign(params, { query });
	return PROXY_GET(`/drivers/situations`, makeParams(params));
};

export const getDriverSituations = async (id: number): Promise<IDriverSituation[]> => {
	return PROXY_GET(`/drivers/${id}/situations`);
};

export const deleteDriverSituation = async (
	driverID: number,
	situationID: number,
	date: string
): Promise<void> => {
	return PROXY_DELETE(`/drivers/${driverID}/situations/${situationID}`, makeParams({ date }));
};

export const createDriverSituation = async (
	id: number,
	situation: IDriverSituationCreate
): Promise<IDriverSituation> => {
	return PROXY_POST(`/drivers/${id}/situations`, JSON.stringify(situation));
};
export const editDriverSituation = async (
	driverID: number,
	situationID: number,
	situation: IDriverSituationEdit
): Promise<IDriverSituation> => {
	return PROXY_PUT(`/drivers/${driverID}/situations/${situationID}`, JSON.stringify(situation));
};

export const getAllDriverSituations = async () => {
	return getAll(getDriversSituations);
};

//END DRIVER SITUATIONS
//-------------------------

//-------------------------
//START CAR SITUATIONS
interface ICarSituationBase {
	date: string | Date;
	return_date?: string | Date;
}
export interface ICarSituationCreate extends ICarSituationBase {
	id_situation: number;
}
export interface ICarSituation extends ICarSituationBase {
	car: ICar;
	situation: ISituation;
}

export interface ICarSituationEdit extends ICarSituationCreate {}

export const getCarsSituations = async (
	pagination: IPagination,
	query?: string
): Promise<PaginatedResponse<ICarSituation[]>> => {
	const params = { ...pagination };
	query && Object.assign(params, { query });
	return PROXY_GET(`/cars/situations`, makeParams(params));
};

export const getCarSituations = async (id: number): Promise<ICarSituation[]> => {
	return PROXY_GET(`/cars/${id}/situations`);
};
export const deleteCarSituation = async (
	carID: number,
	situationID: number,
	date: string
): Promise<void> => {
	return PROXY_DELETE(`/cars/${carID}/situations/${situationID}`, makeParams({ date }));
};

export const createCarSituation = async (
	id: number,
	situation: ICarSituationCreate
): Promise<ICarSituation> => {
	return PROXY_POST(`/cars/${id}/situations`, JSON.stringify(situation));
};
export const editCarSituation = async (
	carID: number,
	situationID: number,
	situation: ICarSituationEdit
): Promise<ICarSituation> => {
	return PROXY_PUT(`/cars/${carID}/situations/${situationID}`, JSON.stringify(situation));
};

export const getAllCarSituations = async () => getAll(getCarsSituations);
//END CAR SITUATIONS
//-------------------------
