import i18n from '$lib/i18n';
import { carService, reportService, requestService } from '$lib/services';
import type { ModalStore, ToastStore } from '@skeletonlabs/skeleton';
import type { CarAndDate } from '../Modals/Reports/types';
import { Modals } from '../Modals';
import { getFlashStore } from '$lib/stores/flashes';
import { triggerErrorToast } from '$lib/CustomError';
import { loading } from '$lib/stores';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { IRequest } from '$lib/types/RequestTypes';

export const handleRoutingSheets = async (toastStore: ToastStore, modalStore: ModalStore) => {
	const cars = await carService.getAllCars();
	if (cars.length === 0) {
		reportService.triggerNoDataForReport(toastStore, i18n.t('flashes.noCarsForReport'));
		return;
	}
	new Promise<CarAndDate>((resolve) => {
		modalStore.trigger({
			type: 'component',
			component: Modals.CAR_AND_DATE_SELECT,
			response: (r) => r && resolve(r),
			meta: { flashes: getFlashStore(), cars }
		});
	}).then(async (data: CarAndDate) => {
		loading.update(() => true);
		try {
			await reportService.routingSheetsReport(toastStore, data);
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}

		loading.update(() => false);
	});
};

export const handleRequestModifications = async (
	toastStore: ToastStore,
	modalStore: ModalStore
) => {
	const requests: IRequest[] = await requestService.getAllRequests();
	if (requests.length === 0) {
		reportService.triggerNoDataForReport(toastStore, i18n.t('flashes.noDataForThisReport'));
		return;
	}
	new Promise<IRequest>((resolve) => {
		modalStore.trigger({
			type: 'component',
			component: Modals.REQUEST_SELECTION,
			response: (r) => r && resolve(r),
			meta: { flashes: getFlashStore(), requests }
		});
	}).then(async (request: IRequest) => {
		loading.update(() => true);
		try {
			await reportService.requestModificationsReport(toastStore, request);
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		loading.update(() => false);
	});
};

export const handleDriverSituations = async (toastStore: ToastStore) => {
	loading.update(() => true);
	try {
		await reportService.driverSituationsReport(toastStore);
	} catch (e) {
		triggerErrorToast(toastStore, e);
	}
	loading.update(() => false);
};
export const handleCarDriver = async (toastStore: ToastStore) => {
	loading.update(() => true);

	try {
		await reportService.carDriverRelationReport(toastStore);
	} catch (e) {
		triggerErrorToast(toastStore, e);
	}
	loading.update(() => false);
};

export const handleDragsList = async (toastStore: ToastStore, modalStore: ModalStore) => {
	const requests: IRequest[] = await requestService.getAllRequests();
	if (requests.length === 0) {
		reportService.triggerNoDataForReport(toastStore, i18n.t('flashes.noDataForThisReport'));
		return;
	}
	new Promise<IRequest>((resolve) => {
		modalStore.trigger({
			type: 'component',
			component: Modals.REQUEST_SELECTION,
			response: (r) => r && resolve(r),
			meta: { flashes: getFlashStore(), requests }
		});
	}).then(async (request: IRequest) => {
		loading.update(() => true);

		try {
			await reportService.dragsListReport(toastStore, request);
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		loading.update(() => false);
	});
};

export const handleDriversList = async (toastStore: ToastStore) => {
	loading.update(() => true);

	try {
		await reportService.driversListReport(toastStore);
	} catch (e) {
		triggerErrorToast(toastStore, e);
	}
	loading.update(() => false);
};
export const handleCarsList = async (toastStore: ToastStore) => {
	loading.update(() => true);

	try {
		await reportService.carsListReport(toastStore);
	} catch (e) {
		triggerErrorToast(toastStore, e);
	}
	loading.update(() => false);
};
export const handleRequestOn = (toastStore: ToastStore, modalStore: ModalStore) => {
	new Promise<Dayjs>((resolve) => {
		modalStore.trigger({
			type: 'component',
			component: Modals.DATE_SELECTION,
			meta: { flashes: getFlashStore() },
			response: (r) => r && resolve(dayjs(r))
		});
	}).then(async (date) => {
		loading.update(() => true);

		try {
			await reportService.requestsOnDateReport(toastStore, date);
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		loading.update(() => false);
	});
};
export const handleCarSituations = async (toastStore: ToastStore) => {
	loading.update(() => true);

	try {
		await reportService.carSituationsReport(toastStore);
	} catch (e) {
		triggerErrorToast(toastStore, e);
	}
	loading.update(() => false);
};
