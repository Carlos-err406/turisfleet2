import type { IPagination } from '$lib/stores/pagination';
import type { IGroup, IGroupCreate, IGroupEdit } from '$lib/types/GroupService';
import { getAll, makeParams, type PaginatedResponse } from './Base/BaseService';
import { PROXY_DELETE, PROXY_GET, PROXY_POST, PROXY_PUT } from './Base/ProxyService';

export const getGroups = (
	pagination: IPagination,
	query?: string
): Promise<PaginatedResponse<IGroup[]>> => {
	const params = { ...pagination };
	query && Object.assign(params, { query });
	return PROXY_GET('/groups', makeParams(params));
};

export const deleteGroup = (id: number): Promise<void> => {
	return PROXY_DELETE('/groups/' + id);
};

export const createGroup = (group: IGroupCreate): Promise<IGroup> => {
	return PROXY_POST('/groups', JSON.stringify(group));
};

export const editGroup = (id: number, group: IGroupEdit): Promise<IGroup> => {
	return PROXY_PUT('/groups/' + id, JSON.stringify(group));
};

export const getAllGroups = async (): Promise<IGroup[]> => {
	return getAll(getGroups);
};
