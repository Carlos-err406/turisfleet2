import { authService } from '$lib/services';
import { error } from '@sveltejs/kit';

export function makeParams(params: object): string {
    let searchParams = '?';
    const queryBuilder = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        queryBuilder.append(key, value);
    });
    searchParams += queryBuilder.toString();
    return searchParams;
}

export async function fetchWrapper(input: RequestInfo, init?: RequestInit): Promise<any> {
    const response = await fetch(input, init);
    if (response.status === 401) {
        const ref = await authService.refresh();
        if ([400, 401].includes(ref.status)) {
            window.location.replace('/auth');
            throw Error('UNAUTHORIZED');
        } else {
            return await fetch(input, init);
        }
    } else return response;
}

export async function handleResponse<T>(response: Response): Promise<T> {
    if (response.status >= 400 && response.status <= 500) {
        throw error(response.status, await response.json());
    } else {
        const content = response.headers.get('content-type');
        if (content == 'application/json') return await response.json();
        else return (await response.blob()) as T;
    }
}