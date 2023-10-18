import {
	writable,
	type Subscriber,
	type Invalidator,
	type Unsubscriber,
	type Updater
} from 'svelte/store';
import { v4 } from 'uuid';

export interface FlashMessage {
	message: string;
	type: 'error' | 'warning' | 'success';
}
export interface FlashType extends FlashMessage {
	id: string;
}

export interface FlashStore {
	set: (this: void, value: FlashType[]) => void;
	subscribe: (
		this: void,
		run: Subscriber<FlashType[]>,
		invalidate?: Invalidator<FlashType[]> | undefined
	) => Unsubscriber;
	update: (this: void, updater: Updater<FlashType[]>) => void;
	trigger: (flash: FlashMessage) => void;
	remove: (id: string) => void;
	reset: () => void;
}

export const getFlashStore = (): FlashStore => {
	const { update, subscribe, set } = writable<FlashType[]>([]);

	const trigger = (flash: FlashMessage) => {
		const id = v4();
		update((currentState) => [...currentState, { id, ...flash }]);
		setTimeout(() => {
			update((currentState) => currentState.filter((flash) => id !== flash.id));
		}, 5000);
	};

	const remove = (id: string) => {
		update((currentState) => currentState.filter((flash) => flash.id !== id));
	};

	const reset = () => set([]);

	return {
		set,
		subscribe,
		update,
		trigger,
		remove,
		reset
	};
};

const flashStore = getFlashStore();
export default flashStore;
