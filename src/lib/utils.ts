import { goto } from '$app/navigation';
import { authService } from '$lib';
import type { ToastStore } from '@skeletonlabs/skeleton';
import dayjs from 'dayjs';
import { spring } from 'svelte/motion';
import { writable } from 'svelte/store';

export const handleLogout = () => {
	authService.logout()
	goto('/auth/login');
};

export interface HeightSpringOptions {
	stiffness: number;
	damping: number;
}
export const tomorrow = () => dayjs().add(1, 'day').format('YYYY-MM-DD');

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
