import type { IPagination } from '$lib/stores/pagination';
import type { Dayjs } from 'dayjs';
import { getAll, makeParams, type PaginatedResponse } from './Base/BaseService';
import { PROXY_DELETE, PROXY_GET, PROXY_POST, PROXY_PUT } from './Base/ProxyService';
import type { ICar } from './CarService';
import type { IDriver } from './DriverService';
import type { IGroup } from './GroupService';
import type { ISpecificProgram } from './ProgramService';

interface IRequestBase {
	date: string | Date;
	tourist_amount: number;
}
export interface IRequestCreate extends IRequestBase {
	id_group: number;
	id_specific_program: number;
}
export interface IRequest extends IRequestBase {
	id_request: number;
	specific_program: ISpecificProgram;
	group: IGroup;
	car: ICar;
	copilot?: IDriver;
	driver: IDriver;
	return_date: string | Date;
}
export interface IRequestEdit extends IRequestBase {}

export const getRequests = async (
	pagination: IPagination,
	query?: string,
	date?: string | Date
): Promise<PaginatedResponse<IRequest[]>> => {
	const params = { ...pagination };
	query && Object.assign(params, { query });
	date && Object.assign(params, { date: date.toString() });
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

export const getAllRequestsOnDate = async (date: Dayjs): Promise<IRequest[]> => {
	let requests: IRequest[] = [];
	let requestPage = 1;
	let page_size = 200;
	while (true) {
		const { data, total_pages, page } = await getRequests(
			{ page_size, page: requestPage },
			undefined,
			date.format('YYYY-MM-DD')
		);
		requests = [...requests, ...data];
		if (page == total_pages || data.length === 0) break;
		requestPage++;
	}
	return requests;
};
