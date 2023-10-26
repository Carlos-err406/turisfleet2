<script lang="ts">
	import { triggerErrorToast } from '$lib/CustomError';
	import i18n from '$lib/i18n';
	import { fileText } from '$lib/icons';
	import { carService, reportService, requestService } from '$lib/services';
	import type { IRequest } from '$lib/services/RequestService';
	import { isAdmin, isAgent, isDriver, isSupport, loading, loggedUser } from '$lib/stores';
	import { getFlashStore } from '$lib/stores/flashes';
	import type { Placement } from '@floating-ui/dom';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import type { Dayjs } from 'dayjs';
	import dayjs from 'dayjs';
	import { Modals } from '../Modals';
	import type { CarAndDate } from '../Modals/Reports/types';
	import Popup from './Popup.svelte';
	import PopupItem from './PopupItem.svelte';
	export let placement: Placement = 'bottom';
	const modalStore = getModalStore();
	const toastStore = getToastStore();
	const handleDriversList = async () => {
		$loading = true;
		try {
			await reportService.driversListReport(toastStore);
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		$loading = false;
	};
	const handleCarsList = async () => {
		$loading = true;
		try {
			await reportService.carsListReport(toastStore);
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		$loading = false;
	};
	const handleRequestOn = () => {
		new Promise<Dayjs>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.DATE_SELECTION,
				meta: { flashes: getFlashStore() },
				response: (r) => r && resolve(dayjs(r))
			});
		}).then(async (date) => {
			$loading = true;
			try {
				await reportService.requestsOnDateReport(toastStore, date);
			} catch (e) {
				triggerErrorToast(toastStore, e);
			}
			$loading = false;
		});
	};
	const handleCarSituations = async () => {
		$loading = true;
		try {
			await reportService.carSituationsReport(toastStore);
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		$loading = false;
	};
	const handleDriverSituations = async () => {
		$loading = true;
		try {
			await reportService.driverSituationsReport(toastStore);
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		$loading = false;
	};
	const handleCarDriver = async () => {
		$loading = true;
		try {
			await reportService.carDriverRelationReport(toastStore);
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		$loading = false;
	};

	const handleDragsList = async () => {
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
			$loading = true;
			try {
				await reportService.dragsListReport(toastStore, request);
			} catch (e) {
				triggerErrorToast(toastStore, e);
			}
			$loading = false;
		});
	};
	const handleRoutingSheets = async () => {
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
			$loading = true;
			try {
				await reportService.routingSheetsReport(toastStore, data);
			} catch (e) {
				triggerErrorToast(toastStore, e);
			}
			$loading = false;
		});
	};
	const handleRequestModifications = async () => {
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
			$loading = true;
			try {
				await reportService.requestModificationsReport(toastStore, request);
			} catch (e) {
				triggerErrorToast(toastStore, e);
			}
			$loading = false;
		});
	};
</script>

{#if !$isSupport}
	<Popup {placement}>
		<svelte:fragment slot="icon">
			{@html fileText}
		</svelte:fragment>
		<svelte:fragment slot="title">{i18n.t('label.reports.item')}</svelte:fragment>
		{#if $isAdmin || $isAgent}
			<PopupItem on:click={handleDriversList}>{i18n.t('label.reports.driversList')}</PopupItem>
			<PopupItem on:click={handleCarsList}>{i18n.t('label.reports.carsList')}</PopupItem>
			<PopupItem on:click={handleRequestOn}>{i18n.t('label.reports.requestOnDate')}</PopupItem>
			<PopupItem on:click={handleCarSituations}>{i18n.t('label.reports.carSituations')}</PopupItem>
			<PopupItem on:click={handleDriverSituations}
				>{i18n.t('label.reports.driverSituations')}</PopupItem
			>
			<PopupItem on:click={handleCarDriver}>{i18n.t('label.reports.carDriverRelation')}</PopupItem>
			<PopupItem on:click={handleDragsList}>{i18n.t('label.reports.dragsList')}</PopupItem>
			<PopupItem on:click={handleRequestModifications}
				>{i18n.t('label.reports.requestModifications')}</PopupItem
			>
		{:else if $isDriver}
			<PopupItem on:click={handleRoutingSheets}>{i18n.t('label.reports.routingSheets')}</PopupItem>
		{/if}
	</Popup>
{/if}
