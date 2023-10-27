import type { IPagination } from '$lib/stores/pagination';
import type {
	ICarSituation,
	ICarSituationCreate,
	ICarSituationEdit,
	IDriverSituation,
	IDriverSituationCreate,
	IDriverSituationEdit,
	ISituation,
	ISituationCreate,
	ISituationEdit
} from '$lib/types/SituationTypes';
import { getAll, makeParams, type PaginatedResponse } from './Base/BaseService';
import { PROXY_DELETE, PROXY_GET, PROXY_POST, PROXY_PUT } from './Base/ProxyService';

//-------------------------
//START SITUATIONS

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
