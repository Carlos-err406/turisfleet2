// place files you want to import through the `$lib` alias in this folder.
import type { DrawerSettings, ToastStore } from '@skeletonlabs/skeleton';
import i18n from './i18n';

export const getDrawerSettings = (settings?: Partial<DrawerSettings>): DrawerSettings => ({
	id: 'drawer-1',
	width: 'w-fit',
	...settings
});

export const toastSuccessfullyCreated = (toastStore: ToastStore) => {
	toastStore.trigger({
		message: i18n.t('flashes.created'),
		autohide: true,
		timeout: 3000,
		background: 'variant-filled-success',
		hideDismiss: true
	});
};
export const toastSuccessfullyEdited = (toastStore: ToastStore) => {
	toastStore.trigger({
		message: i18n.t('flashes.updated'),
		autohide: true,
		timeout: 3000,
		background: 'variant-filled-success',
		hideDismiss: true
	});
};

export const toastSuccessfullyDeleted = (toastStore: ToastStore) => {
	toastStore.trigger({
		message: i18n.t('flashes.deleted'),
		autohide: true,
		timeout: 3000,
		background: 'variant-filled-success',
		hideDismiss: true
	});
};
