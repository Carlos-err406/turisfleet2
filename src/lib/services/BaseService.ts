import { authService } from '$lib';
import { error } from '@sveltejs/kit';

export default abstract class BaseService {
	protected static instance: BaseService;

	protected service = '';
	protected constructor() {
		this.service = '';
	}

	protected static getInstance(): BaseService {
		throw Error('cant get instance of abstract class');
	}

	protected url(extra = '', apiVersion = 'v1') {
		return `/api/${apiVersion}/${this.service}${extra}`;
	}

	/**
	 * builds the query parameters ready to use in the this.url() method
	 */
	protected makeParams(params: object): string {
		let searchParams = '?';
		const queryBuilder = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			queryBuilder.append(key, value);
		});
		searchParams += queryBuilder.toString();
		return searchParams;
	}

	private async fetchWrapper(input: RequestInfo, init?: RequestInit) {
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

	protected async get<T>(url = this.url(), searchParams = '', headers = new Headers()) {
		const options: RequestInit = { headers, method: 'GET' };
		const response = await this.fetchWrapper(url + searchParams, options);
		return await this.handleResponse<T>(response);
	}
	protected async delete<T>(url = this.url(), searchParams = '', headers = new Headers()) {
		const options: RequestInit = { headers, method: 'DELETE' };
		const response = await this.fetchWrapper(url + searchParams, options);
		return await this.handleResponse<T>(response);
	}
	protected async post<T>(
		url = this.url(),
		body: BodyInit | null | undefined,
		searchParams = '',
		headers = new Headers()
	) {
		headers.append('Content-Type', 'application/json');

		const options: RequestInit = { headers, method: 'POST', body };
		const response = await this.fetchWrapper(url + searchParams, options);
		return await this.handleResponse<T>(response);
	}
	protected async put<T>(
		url = this.url(),
		body: BodyInit | null | undefined,
		searchParams = '',
		headers = new Headers()
	) {
		headers.append('Content-Type', 'application/json');
		const options: RequestInit = { headers, method: 'PUT', body };
		const response = await this.fetchWrapper(url + searchParams, options);
		return await this.handleResponse<T>(response);
	}
	protected async handleResponse<T>(response: Response): Promise<T> {
		if (response.status >= 400 && response.status <= 500) {
			throw error(response.status, await response.json());
		} else {
			const content = response.headers.get('content-type');
			if (content == 'application/json') return await response.json();
			else return (await response.blob()) as T;
		}
	}
}
