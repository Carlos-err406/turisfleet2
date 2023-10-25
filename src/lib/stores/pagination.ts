import {
	writable,
	type Invalidator,
	type Subscriber,
	type Unsubscriber,
	type Updater
} from 'svelte/store';

export interface IPagination {
	page: number;
	page_size: number;
}
export interface PaginationStore {
	gotoPage: (page: number) => void;
	setLimit: (limit: number) => void;
	reset: () => void;
	set: (this: void, value: IPagination) => void;
	subscribe: (
		this: void,
		run: Subscriber<IPagination>,
		invalidate?: Invalidator<IPagination> | undefined
	) => Unsubscriber;
	update: (this: void, updater: Updater<IPagination>) => void;
}
export const getPaginationStore = (): PaginationStore => {
	const { set, subscribe, update } = writable<IPagination>({ page: 1, page_size: 10 });

	const gotoPage = (page: number) => {
		update((updater) => {
			return {
				...updater,
				page
			};
		});
	};
	const setLimit = (limit: number) => {
		reset();
		update((updater) => {
			return {
				...updater,
				page_size: limit
			};
		});
	};
	const reset = () => {
		set({ page: 1, page_size: 10 });
	};
	return {
		gotoPage,
		reset,
		setLimit,
		set,
		subscribe,
		update
	};
};

const paginationStore = getPaginationStore();
export default paginationStore;

export const getTotalElementsStore = () => writable<number>(0);
export const getQueryStringStore = () => writable<string | undefined>(undefined);
