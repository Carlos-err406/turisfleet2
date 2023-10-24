import type { ToastStore } from '@skeletonlabs/skeleton';
import i18n from './i18n';
import type { ErrorCode } from './types/ErrorCodes';
import type { FlashStore } from './stores/flashes';

export default class CustomError extends Error {
	public body: { detail: { exception_id: ErrorCode; message: string } };

	public constructor(exception_id: ErrorCode, message: string) {
		super(message);
		this.body = {
			detail: {
				exception_id: exception_id,
				message: message
			}
		};
	}
}

export const getErrorMessage = (e: any) => {
	let code = '';
	if (e.body?.detail.exception_id) code = e.body.detail.exception_id;
	const errorMessage = i18n.t(`error.${code}`) ?? e.message;
	return errorMessage;
};

export const triggerErrorToast = (toastStore: ToastStore, e: any) => {
	console.error(e);
	toastStore.trigger({
		timeout: 2000,
		message: getErrorMessage(e),
		classes: 'variant-filled-error'
	});
};

export const triggerErrorFlash = (flashStore: FlashStore, e: any) => {
	flashStore.trigger({
		type: 'error',
		message: getErrorMessage(e)
	});
};
