// place files you want to import through the `$lib` alias in this folder.
import type { DrawerSettings, ModalStore, ToastStore } from '@skeletonlabs/skeleton';
import type { Modals } from './components/Modals';
import i18n from './i18n';
import { getFlashStore } from './stores/flashes';

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

interface CreateOneFromToastConfig {
	stores: { toast: ToastStore; modal: ModalStore };
	toastMessage: string;
	creationModal: Modals;
	modalToReopen?: Modals;
	onResolve: (r: any) => void;
	meta?: any;
}
/**triggers a toast with an action button to trigger another modal */
export const createOneFromToast = (config: CreateOneFromToastConfig) => {
	const {
		stores: { toast, modal },
		toastMessage,
		modalToReopen,
		creationModal,
		onResolve,
		meta
	} = config;
	toast.trigger({
		message: toastMessage,
		background: 'variant-filled-surface',
		hideDismiss: true,
		hoverable: true,
		action: {
			label: i18n.t('label.createOne'),
			response: () => {
				modal.update((updater) => [
					{
						type: 'component',
						component: creationModal,
						meta: { flashes: getFlashStore() },
						response: (r1) => {
							if (modalToReopen) {
								if (r1) {
									modal.trigger({
										type: 'component',
										component: modalToReopen,
										meta: { flashes: getFlashStore(), ...meta, onResolve },
										response: (r2) => {
											if (r2) {
												onResolve(r2);
											}
										}
									});
								}
							} else {
								onResolve(r1);
							}
						}
					},
					...updater
				]);
			}
		}
	});
};

export const deepCopy = <T>(obj: T): T => {
	const isFunction = (value: any): value is (...args: any[]) => any => {
		return typeof value === 'function';
	};

	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	const result: any = Array.isArray(obj) ? [] : {};

	for (const key in obj) {
		if (key in obj) {
			if (typeof obj[key] === 'object') {
				if (obj[key] instanceof RegExp) {
					result[key] = new RegExp((obj[key] as RegExp).source, (obj[key] as RegExp).flags);
				} else result[key] = deepCopy(obj[key]);
			} else if (isFunction(obj[key])) {
				result[key] = (obj[key] as (...args: any[]) => any).bind(result);
			} else {
				result[key] = obj[key];
			}
		}
	}

	return result;
};
