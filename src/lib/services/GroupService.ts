import type { IPagination } from '$lib/stores/pagination';
import { makeParams } from './Base/BaseService';
import { PROXY_DELETE, PROXY_GET, PROXY_POST, PROXY_PUT } from './Base/ProxyService';

export interface IGroupCreate {
	country: string;
	tourist_amount: number;
}
export interface IGroup extends IGroupCreate {
	id_group: number;
}
export interface IGroupEdit extends IGroupCreate {}

export const getGroups = (pagination: IPagination): Promise<IGroup[]> => {
	return PROXY_GET('/groups', makeParams(pagination));
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
