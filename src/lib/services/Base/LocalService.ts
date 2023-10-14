import { fetchWrapper, handleResponse } from "./BaseService";
const buildURL = (endpoint: string, search = '') => '/api' + endpoint + search

export async function GET<T>(url: string, searchParams = '') {
    const options: RequestInit = { method: 'GET' };
    const response = await fetchWrapper(buildURL(url, searchParams), options);
    return await handleResponse<T>(response);
}
export async function DELETE<T>(url: string, searchParams = '') {
    const options: RequestInit = { method: 'DELETE' };
    const response = await fetchWrapper(buildURL(url, searchParams), options);
    return await handleResponse<T>(response);
}
export async function POST<T>(
    url: string,
    body: BodyInit | null | undefined,
    searchParams = '',
) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json');

    const options: RequestInit = { headers, method: 'POST', body };
    const response = await fetchWrapper(buildURL(url, searchParams), options);
    return await handleResponse<T>(response);
}
export async function PUT<T>(
    url: string,
    body: BodyInit | null | undefined,
    searchParams = '',
) {
    const headers = new Headers()

    headers.append('Content-Type', 'application/json');
    const options: RequestInit = { headers, method: 'PUT', body };
    const response = await fetchWrapper(buildURL(url, searchParams), options);
    return await handleResponse<T>(response);
}
export async function PATCH<T>(
    url: string,
    body: BodyInit | null | undefined,
    searchParams = '',
) {
    const headers = new Headers()

    headers.append('Content-Type', 'application/json');
    const options: RequestInit = { headers, method: 'PATCH', body };
    const response = await fetchWrapper(buildURL(url, searchParams), options);
    return await handleResponse<T>(response);
}

