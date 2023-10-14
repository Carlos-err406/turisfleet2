<script lang="ts">
	import { fileText } from '$lib/icons';
	import type { Placement } from '@floating-ui/dom';
	import Popup from './Popup.svelte';
	import PopupItem from './PopupItem.svelte';
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
	<svelte:fragment slot="title">Reports</svelte:fragment>
	<PopupItem on:click={handleDriversList}>Drivers List</PopupItem>
	<PopupItem on:click={handleCarsList}>Cars List</PopupItem>
	<PopupItem on:click={handleRequeston}>Request on date</PopupItem>
	<PopupItem on:click={handleCarSituations}>Car situations</PopupItem>
	<PopupItem on:click={handleDriverSituations}>Driver situations</PopupItem>
	<PopupItem on:click={handleCarDriver}>Car-Driver relation list</PopupItem>
	<PopupItem on:click={handleDragsList}>Drags list</PopupItem>
	<PopupItem on:click={handleRoutingSheets}>Routing sheets</PopupItem>
	<PopupItem on:click={handleRequestModifications}>Request modifications</PopupItem>
</Popup>
