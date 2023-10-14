<script>
	import ProgramsPopup from './ProgramsPopup.svelte';
	import Reports from '../../Popup/Reports.svelte';
	import { page } from '$app/stores';
	import { driver, group, inbox, info, layers, truck, users } from '$lib/icons';
	import { AppRail, AppRailAnchor, AppRailTile, LightSwitch } from '@skeletonlabs/skeleton';
	import { md, sm } from '$lib/stores/basic';
	import SituationsPopup from './SituationsPopup.svelte';
</script>

<AppRail class="shadow-sm">
	<AppRailAnchor href="/app/users" selected={$page.url.pathname === '/app/users'}>
		<div class="flex flex-col items-center justify-center gap-2">
			{@html users}
			<span>Users</span>
		</div>
	</AppRailAnchor><AppRailAnchor
		href="/app/drivers"
		selected={$page.url.pathname === '/app/drivers'}
	>
		<div class="flex flex-col items-center justify-center gap-2">
			{@html driver}
			<span>Drivers</span>
		</div>
	</AppRailAnchor>
	<AppRailAnchor href="/app/cars" selected={$page.url.pathname === '/app/cars'}>
		<div class="flex flex-col items-center justify-center gap-2">
			{@html truck}
			<span>Cars</span>
		</div>
	</AppRailAnchor>
	<AppRailAnchor href="/app/groups" selected={$page.url.pathname === '/app/groups'}>
		<div class="flex flex-col items-center justify-center gap-2">
			{@html group}
			<span>Groups</span>
		</div>
	</AppRailAnchor>
	<AppRailAnchor href="/app/requests" selected={$page.url.pathname === '/app/requests'}>
		<div class="flex flex-col items-center justify-center gap-2">
			{@html inbox}
			<span>Requests</span>
		</div>
	</AppRailAnchor>
	<ProgramsPopup />
	<SituationsPopup />
	<!-- {#if $md} -->
	<div class="hidden md:block">
		<Reports placement="right" />
	</div>
	<!-- {/if} -->
	<svelte:fragment slot="trail">
		<div class="w-full flex justify-center mb-3">
			<LightSwitch />
		</div>
	</svelte:fragment>
</AppRail>
