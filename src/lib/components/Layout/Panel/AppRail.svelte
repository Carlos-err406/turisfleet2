<script>
	import i18n from '$lib/i18n';
	import { driver, group, inbox, truck, users } from '$lib/icons';
	import { AppRail, LightSwitch } from '@skeletonlabs/skeleton';
	import Reports from '../../Popup/Reports.svelte';
	import AppRailItem from './AppRailItem.svelte';
	import LangButton from './LangButton.svelte';
	import ProgramsPopup from './ProgramsPopup.svelte';
	import SituationsPopup from './SituationsPopup.svelte';
	import { isAdmin, isAgent, isSupport } from '$lib/stores';
</script>

<AppRail class="shadow-sm w-fit overflow-y-auto">
	{#if $isAdmin || $isSupport}
		<AppRailItem href="/app/users">
			<svelte:fragment slot="icon">
				{@html users}
			</svelte:fragment>
			{i18n.t('label.users')}
		</AppRailItem>
	{/if}
	{#if $isAdmin || $isAgent}
		<AppRailItem href="/app/drivers">
			<svelte:fragment slot="icon">
				{@html driver}
			</svelte:fragment>
			{i18n.t('label.drivers')}
		</AppRailItem>
		<AppRailItem href="/app/cars">
			<svelte:fragment slot="icon">
				{@html truck}
			</svelte:fragment>
			{i18n.t('label.cars')}
		</AppRailItem>
		<AppRailItem href="/app/groups">
			<svelte:fragment slot="icon">
				{@html group}
			</svelte:fragment>
			{i18n.t('label.groups')}
		</AppRailItem>
		<AppRailItem href="/app/requests">
			<svelte:fragment slot="icon">
				{@html inbox}
			</svelte:fragment>
			{i18n.t('label.requests')}
		</AppRailItem>
		<ProgramsPopup />
		<SituationsPopup />
		<Reports placement="right" />
	{/if}
	<svelte:fragment slot="trail">
		<div class="w-full flex flex-col items-center justify-end mb-3 gap-3">
			<LangButton />
			<LightSwitch />
		</div>
	</svelte:fragment>
</AppRail>
