import type { IPagination } from '$lib/stores/pagination';
import { getAll, makeParams, type PaginatedResponse } from './Base/BaseService';
import { PROXY_DELETE, PROXY_GET, PROXY_POST, PROXY_PUT } from './Base/ProxyService';
import type { IGroup } from './GroupService';
import type { ISpecificProgram } from './ProgramService';

export interface IRequestCreate {
	id_group: number;
	id_specific_program: number;
	start_date: string | Date;
	tourist_amount: number;
}
export interface IRequest {
	group: IGroup;
	specific_program: ISpecificProgram;
	tourist_amount: number;
	start_date: Date | string;
	id_request: number;
}
export interface IRequestEdit extends IRequestCreate {}

export const getRequests = async (
	pagination: IPagination,
	query?: string
): Promise<PaginatedResponse<IRequest[]>> => {
	const params = { ...pagination };
	query && Object.assign(params, { query });
	return PROXY_GET('/requests', makeParams(params));
};
export const deleteRequest = async (id: number): Promise<void> => {
	return PROXY_DELETE('/requests/' + id);
};
export const createRequest = async (request: IRequestCreate): Promise<IRequest> => {
	return PROXY_POST('/requests', JSON.stringify(request));
};
export const editRequest = async (id: number, request: IRequestEdit): Promise<IRequest> => {
	return PROXY_PUT('/requests/' + id, JSON.stringify(request));
};

export const getAllRequests = async (chunkSize = 200): Promise<IRequest[]> => {
	return getAll<IRequest>(getRequests, chunkSize);
};
