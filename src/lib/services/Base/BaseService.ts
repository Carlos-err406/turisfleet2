import { authService } from '$lib/services';
import type { IPagination } from '$lib/stores/pagination';
import { error } from '@sveltejs/kit';

export const makeParams = (params: object): string => {
	let searchParams = '?';
	const queryBuilder = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		queryBuilder.append(key, value);
	});
	searchParams += queryBuilder.toString();
	return searchParams;
};

export const fetchWrapper = async (input: RequestInfo, init?: RequestInit): Promise<any> => {
	const response = await fetch(input, init);
	if (response.status === 401) {
		const ref = await authService.refresh();
		if ([400, 401].includes(ref.status)) {
			window.location.replace('/auth/login');
			throw Error('UNAUTHORIZED');
		} else {
			return await fetch(input, init);
		}
	} else return response;
};

export const handleResponse = async <T>(response: Response): Promise<T> => {
	if (response.status >= 400 && response.status <= 500) {
		throw error(response.status, await response.json());
	} else {
		const content = response.headers.get('content-type');
		if (content == 'application/json') return await response.json();
		else return (await response.blob()) as T;
	}
};

/**
 * get all entries of a table part by part according to chunk size
 * @param getter entries getter function that takes the pagination settings
 * @param chunkSize number of entries to get per request
 * @returns all entries of type T
 */
export const getAll = async <T>(
	getter: (pagination: IPagination) => Promise<PaginatedResponse<T[]>>,
	chunkSize = 200
) => {
	let entries: T[] = [];
	let requestPage = 1;
	let page_size = chunkSize;
	while (true) {
		try {
			const { data, total_pages, page } = await getter({ page_size, page: requestPage });
			entries = [...entries, ...data];
			if (page == total_pages || data.length === 0) break;
			requestPage++;
		} catch (error) {
			console.error(`Failed to get entries: ${error}`);
			break;
		}
	}
	return entries;
};

export interface PaginatedResponse<T> {
	page: number;
	page_size: number;
	pagination: {
		next: string;
		previous: string;
	};
	total: number;
	total_pages: number;
	data: T;
}
