import { writable } from 'svelte/store';
import { v4 } from 'uuid';

export interface FlashMessage {
	message: string;
	type: 'error' | 'warning' | 'success';
}
export interface FlashType extends FlashMessage {
	id: string;
}
export const getFlashStore = () => {
	const { update, subscribe, set } = writable<FlashType[]>();

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
