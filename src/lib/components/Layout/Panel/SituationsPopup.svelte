<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Popup from '$lib/components/Popup/Popup.svelte';
	import PopupItem from '$lib/components/Popup/PopupItem.svelte';
	import i18n from '$lib/i18n';
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
	<svelte:fragment slot="title">{i18n.t('label.situations')}</svelte:fragment>
	<PopupItem active={situationsActive} on:click={handleSituationsClick}>
		{i18n.t('label.situations')}
	</PopupItem>

	<PopupItem active={carSituationsActive} on:click={handleCarSituationsClick}>
		{i18n.t('label.carSituations')}
	</PopupItem>
	<PopupItem active={driverSituationsActive} on:click={handleDriverSituationsClick}>
		{i18n.t('label.driverSituations')}
	</PopupItem>
</Popup>
