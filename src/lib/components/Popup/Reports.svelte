<script lang="ts">
	import { fileText } from '$lib/icons';
	import type { Placement } from '@floating-ui/dom';
	import Popup from './Popup.svelte';
	import PopupItem from './PopupItem.svelte';
	import i18n from '$lib/i18n';
	export let placement: Placement = 'bottom';
	const handleDriversList = () => {};
	const handleCarsList = () => {};
	const handleRequeston = () => {};
	const handleCarSituations = () => {};
	const handleDriverSituations = () => {};
	const handleCarDriver = () => {};
	const handleDragsList = () => {};
	const handleRoutingSheets = () => {};
	const handleRequestModifications = () => {};
</script>

<Popup {placement}>
	<svelte:fragment slot="icon">
		{@html fileText}
	</svelte:fragment>
	<svelte:fragment slot="title">{i18n.t('label.reports.item')}</svelte:fragment>
	<PopupItem on:click={handleDriversList}>{i18n.t('label.reports.driversList')}</PopupItem>
	<PopupItem on:click={handleCarsList}>{i18n.t('label.reports.carsList')}</PopupItem>
	<PopupItem on:click={handleRequeston}>{i18n.t('label.reports.requestOnDate')}</PopupItem>
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
