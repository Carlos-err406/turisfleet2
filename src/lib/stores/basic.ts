import { derived, writable } from "svelte/store";

export const navHeight = writable<number>(0)
export const actionsHeight = writable<number>(0)
export const clientWidth = writable<number>(0)

export const xs = derived(clientWidth, ($clientWidth) => $clientWidth < 640);
export const sm = derived(clientWidth, ($clientWidth) => $clientWidth >= 640);
export const md = derived(clientWidth, ($clientWidth) => $clientWidth >= 768);
export const lg = derived(clientWidth, ($clientWidth) => $clientWidth >= 1024);
export const xl = derived(clientWidth, ($clientWidth) => $clientWidth >= 1280);
export const xxl = derived(clientWidth, ($clientWidth) => $clientWidth >= 1536);