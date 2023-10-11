import { goto } from '$app/navigation';
import type { ToastStore } from '@skeletonlabs/skeleton';
import dayjs from 'dayjs';
import { spring } from 'svelte/motion';
import { writable } from 'svelte/store';

export const handleLogout = () => {
	goto('/auth/login');
};

export const toastInvalidCredentials = (toastStore: ToastStore, onClose?: () => void) =>
	toastStore.trigger({
		message: 'Invalid credentials',
		background: 'variant-ghost-error',
		timeout: 3000,
		callback: ({ status }) => {
			if (status === 'closed') {
				onClose?.();
			}
		}
	});

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
