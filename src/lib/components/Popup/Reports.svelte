<script lang="ts">
	import { fileText } from '$lib/icons';
	import type { Placement } from '@floating-ui/dom';
	import Popup from './Popup.svelte';
	import PopupItem from './PopupItem.svelte';
	import i18n from '$lib/i18n';
	import { reportService } from '$lib/services';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { Modals } from '../Modals';
	import { getFlashStore } from '$lib/stores/flashes';
	import type { Dayjs } from 'dayjs';
	import dayjs from 'dayjs';
	export let placement: Placement = 'bottom';
	const modalStore = getModalStore();
	const toastStore = getToastStore();
	const handleDriversList = () => {
		reportService.driversListReport();
	};
	const handleCarsList = () => {
		reportService.carsListReport();
	};
	const handleRequestOn = () => {
		new Promise<Dayjs>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.DATE_SELECTION,
				meta: { flashes: getFlashStore() },
				response: (r) => r && resolve(dayjs(r))
			});
		}).then((date) => {
			reportService.requestsOnDateReport(date);
		});
	};
	const handleCarSituations = () => {
		reportService.carSituationsReport();
	};
	const handleDriverSituations = () => {
		reportService.driverSituationsReport();
	};
	const handleCarDriver = () => {
		reportService.carDriverRelationReport();
	};
	const handleDragsList = () => {
		reportService.dragsListReport();
	};
	const handleRoutingSheets = () => {
		reportService.routingSheetsReport();
	};
	const handleRequestModifications = () => {
		new Promise<any>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.REQUEST_SELECTION,
				response: (r) => r && resolve(r),
				meta: { flashes: getFlashStore() }
			});
		}).then((request) => {
			reportService.requestModificationsReport(request);
		});
	};
</script>

<Popup {placement}>
	<svelte:fragment slot="icon">
		{@html fileText}
	</svelte:fragment>
	<svelte:fragment slot="title">{i18n.t('label.reports.item')}</svelte:fragment>
	<PopupItem on:click={handleDriversList}>{i18n.t('label.reports.driversList')}</PopupItem>
	<PopupItem on:click={handleCarsList}>{i18n.t('label.reports.carsList')}</PopupItem>
	<PopupItem on:click={handleRequestOn}>{i18n.t('label.reports.requestOnDate')}</PopupItem>
	<PopupItem on:click={handleCarSituations}>{i18n.t('label.reports.carSituations')}</PopupItem>
	<PopupItem on:click={handleDriverSituations}>{i18n.t('label.reports.driverSituations')}</PopupItem
	>
	<PopupItem on:click={handleCarDriver}>{i18n.t('label.reports.carDriverRelation')}</PopupItem>
	<PopupItem on:click={handleDragsList}>{i18n.t('label.reports.dragsList')}</PopupItem>
	<PopupItem on:click={handleRoutingSheets}>{i18n.t('label.reports.routingSheets')}</PopupItem>
	<PopupItem on:click={handleRequestModifications}
		>{i18n.t('label.reports.requestModifications')}</PopupItem
	>
</Popup>
