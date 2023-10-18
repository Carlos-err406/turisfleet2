import {
	writable,
	type Invalidator,
	type Subscriber,
	type Unsubscriber,
	type Updater
} from 'svelte/store';

export interface IPagination {
	limit: number;
	skip: number;
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
	const { set, subscribe, update } = writable<IPagination>({ limit: 10, skip: 0 });

	const gotoPage = (page: number) => {
		update((updater) => {
			return {
				...updater,
				skip: updater.limit * page
			};
		});
	};
	const setLimit = (limit: number) => {
		reset();
		update((updater) => {
			return {
				...updater,
				limit
			};
		});
	};
	const reset = () => {
		set({ limit: 100, skip: 0 });
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
