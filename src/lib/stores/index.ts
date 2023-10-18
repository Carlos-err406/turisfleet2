import type { LanguageTypes } from '$lib/components/Modals/Lang/langTypes';
import type { ILoggedUser } from '$lib/services/AuthService';
import {
	createLocalStorage,
	createSessionStorage,
	disableWarnings,
	persist
} from '@macfja/svelte-persistent-store';
import { derived, writable } from 'svelte/store';
disableWarnings();
export const navHeight = writable<number>(0);
export const actionsHeight = writable<number>(0);
export const clientWidth = writable<number>(0);

export const xs = derived(clientWidth, ($clientWidth) => $clientWidth < 640);
export const sm = derived(clientWidth, ($clientWidth) => $clientWidth >= 640);
export const md = derived(clientWidth, ($clientWidth) => $clientWidth >= 768);
export const lg = derived(clientWidth, ($clientWidth) => $clientWidth >= 1024);
export const xl = derived(clientWidth, ($clientWidth) => $clientWidth >= 1280);
export const xxl = derived(clientWidth, ($clientWidth) => $clientWidth >= 1536);

export const lang = persist(writable<LanguageTypes>('en'), createLocalStorage(false), 'tf-lang');

export const loading = writable<boolean>(false);

export const loggedUser = persist(
	writable<ILoggedUser | null>(),
	createSessionStorage(false),
	'tf-user'
);
