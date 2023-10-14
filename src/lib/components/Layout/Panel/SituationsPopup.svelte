<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Popup from '$lib/components/Popup/Popup.svelte';
	import PopupItem from '$lib/components/Popup/PopupItem.svelte';
	import { info } from '$lib/icons';
	const routes = {
		situations: '/app/situations',
		carSituations: '/app/situations/car',
		driverSituations: '/app/situations/driver'
	};
	const handleSituationsClick = () => {
		goto(routes.situations);
	};
	const handleCarSituationsClick = () => {
		goto(routes.carSituations);
	};
	const handleDriverSituationsClick = () => {
		goto(routes.driverSituations);
	};
	$: situationsActive = $page.url.pathname === routes.situations;
	$: carSituationsActive = $page.url.pathname === routes.carSituations;
	$: driverSituationsActive = $page.url.pathname === routes.driverSituations;
	$: active = situationsActive || carSituationsActive || driverSituationsActive;
</script>

<Popup placement="right" {active}>
	<svelte:fragment slot="icon">
		{@html info}
	</svelte:fragment>
	<svelte:fragment slot="title">Situations</svelte:fragment>
	<PopupItem active={situationsActive} on:click={handleSituationsClick}>Situations</PopupItem>

	<PopupItem active={carSituationsActive} on:click={handleCarSituationsClick}>
		Car Situations
	</PopupItem>
	<PopupItem active={driverSituationsActive} on:click={handleDriverSituationsClick}>
		Driver Situations
	</PopupItem>
</Popup>
