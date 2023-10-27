<script>
	import Driver from '$lib/components/Icons/Driver.svelte';
	import Group from '$lib/components/Icons/Group.svelte';
	import Inbox from '$lib/components/Icons/Inbox.svelte';
	import Truck from '$lib/components/Icons/Truck.svelte';
	import i18n from '$lib/i18n';

	import User from '$lib/components/Icons/User.svelte';
	import { isAdmin, isAgent, isSupport } from '$lib/stores';
	import { AppRail, LightSwitch } from '@skeletonlabs/skeleton';
	import Reports from '../../Popup/Reports.svelte';
	import AppRailItem from './AppRailItem.svelte';
	import LangButton from './LangButton.svelte';
	import ProgramsPopup from './ProgramsPopup.svelte';
	import SituationsPopup from './SituationsPopup.svelte';
</script>

<AppRail class="shadow-sm w-fit overflow-y-auto">
	{#if $isAdmin || $isSupport}
		<AppRailItem href="/app/users">
			<svelte:fragment slot="icon">
				<User />
			</svelte:fragment>
			{i18n.t('label.users')}
		</AppRailItem>
	{/if}
	{#if $isAdmin || $isAgent}
		<AppRailItem href="/app/drivers">
			<svelte:fragment slot="icon">
				<Driver />
			</svelte:fragment>
			{i18n.t('label.drivers')}
		</AppRailItem>
		<AppRailItem href="/app/cars">
			<svelte:fragment slot="icon">
				<Truck />
			</svelte:fragment>
			{i18n.t('label.cars')}
		</AppRailItem>
		<AppRailItem href="/app/groups">
			<svelte:fragment slot="icon">
				<Group />
			</svelte:fragment>
			{i18n.t('label.groups')}
		</AppRailItem>
		<AppRailItem href="/app/requests">
			<svelte:fragment slot="icon">
				<Inbox />
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
