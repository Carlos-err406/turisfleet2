import { goto } from '$app/navigation';
import { authService } from '$lib/services';
import dayjs from 'dayjs';
import { spring } from 'svelte/motion';
import { writable } from 'svelte/store';

export const handleLogout = () => {
	authService.logout();
	goto('/auth/login');
};

export interface HeightSpringOptions {
	stiffness: number;
	damping: number;
}
export const tomorrow = () => dayjs().add(1, 'day').format('YYYY-MM-DD');
export const today = () => dayjs().format('YYYY-MM-DD');

export function springHeight(
	element: HTMLElement,
	options: HeightSpringOptions = { stiffness: 0.1, damping: 0.4 }
) {
	if (!element) return;
	const internalStore = writable<number | null>(null, (set) => {
		const obeserver = new ResizeObserver(() => element && set(element.offsetHeight));
		obeserver.observe(element);
		return () => obeserver.disconnect();
	});
	const springStore = spring(0, options);
	internalStore.subscribe((value) => {
		value !== null && springStore.set(value);
	});
	return springStore;
}

export const validateID = (id: string, onInvalid: () => void) => {
	if (id.length !== 11) {
		onInvalid();
		return false;
	}

	const [year, month, day] = [
		parseInt(id.slice(0, 2)),
		parseInt(id.slice(2, 4)),
		parseInt(id.slice(4, 6))
	];

	const date = dayjs(`${month}-${day}-${year}`);
	let isValid = true;
	if (day > 31) isValid = false;
	else if (month == 2 && day > 29) isValid = false;
	else if ([1, 3, 5, 7, 9, 10, 12].includes(month) && day > 31) isValid = false;
	else if ([4, 6, 8, 11].includes(month) && day > 30) isValid = false;
	if (!isValid || !date.isValid()) {
		onInvalid();
		return false;
	}
	return true;
};
