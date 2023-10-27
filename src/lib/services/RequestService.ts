import type { IPagination } from '$lib/stores/pagination';
import type { IRequest, IRequestCreate, IRequestEdit } from '$lib/types/RequestTypes';
import type { Dayjs } from 'dayjs';
import { getAll, makeParams, type PaginatedResponse } from './Base/BaseService';
import { PROXY_DELETE, PROXY_GET, PROXY_POST, PROXY_PUT } from './Base/ProxyService';

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
export const editRequest = async (
	id: number,
	request: Partial<IRequestEdit>
): Promise<IRequest> => {
	return PROXY_PUT('/requests/' + id, JSON.stringify(request));
};

export const getAllRequests = async (chunkSize = 200): Promise<IRequest[]> => {
	return getAll<IRequest>(getRequests, chunkSize);
};

export const getAllRequestsOnDate = async (date: Dayjs): Promise<IRequest[]> => {
	let requests: IRequest[] = [];
	let requestPage = 1;
	const page_size = 200;
	let gotAll = false;
	while (!gotAll) {
		const { data, total_pages, page } = await getRequests(
			{ page_size, page: requestPage },
			undefined,
			date.format('YYYY-MM-DD')
		);
		requests = [...requests, ...data];
		if (page == total_pages || data.length === 0) gotAll = true;
		requestPage++;
	}
	return requests;
};
