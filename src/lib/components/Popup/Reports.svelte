<script lang="ts">
	import i18n from '$lib/i18n';
	import { fileText } from '$lib/icons';
	import { isAdmin, isAgent, isDriver, isSupport } from '$lib/stores';
	import type { Placement } from '@floating-ui/dom';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import Popup from './Popup.svelte';
	import PopupItem from './PopupItem.svelte';
	import {
		handleCarDriver,
		handleCarSituations,
		handleCarsList,
		handleDragsList,
		handleDriverSituations,
		handleDriversList,
		handleRequestModifications,
		handleRequestOn,
		handleRoutingSheets
	} from './reports';
	export let placement: Placement = 'bottom';
	const modalStore = getModalStore();
	const toastStore = getToastStore();
</script>

{#if !$isSupport}
	<Popup {placement}>
		<svelte:fragment slot="icon">
			{@html fileText}
		</svelte:fragment>
		<svelte:fragment slot="title">{i18n.t('label.reports.item')}</svelte:fragment>
		{#if $isAdmin || $isAgent}
			<PopupItem on:click={() => handleDriversList(toastStore)}
				>{i18n.t('label.reports.driversList')}</PopupItem
			>
			<PopupItem on:click={() => handleCarsList(toastStore)}
				>{i18n.t('label.reports.carsList')}</PopupItem
			>
			<PopupItem on:click={() => handleRequestOn(toastStore, modalStore)}
				>{i18n.t('label.reports.requestOnDate')}</PopupItem
			>
			<PopupItem on:click={() => handleCarSituations(toastStore)}
				>{i18n.t('label.reports.carSituations')}</PopupItem
			>
			<PopupItem on:click={() => handleDriverSituations(toastStore)}
				>{i18n.t('label.reports.driverSituations')}</PopupItem
			>
			<PopupItem on:click={() => handleCarDriver(toastStore)}
				>{i18n.t('label.reports.carDriverRelation')}</PopupItem
			>
			<PopupItem on:click={() => handleDragsList(toastStore, modalStore)}
				>{i18n.t('label.reports.dragsList')}</PopupItem
			>
			<PopupItem on:click={() => handleRequestModifications(toastStore, modalStore)}
				>{i18n.t('label.reports.requestModifications')}</PopupItem
			>
		{:else if $isDriver}
			<PopupItem on:click={() => handleRoutingSheets(toastStore, modalStore)}
				>{i18n.t('label.reports.routingSheets')}</PopupItem
			>
		{/if}
	</Popup>
{/if}
