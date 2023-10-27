<script>
	import Reports from '$lib/components/Popup/Reports.svelte';
	import i18n from '$lib/i18n';
	import { handleLogout } from '$lib/utils';
	import { Drawer, LightSwitch } from '@skeletonlabs/skeleton';
	import DrawerItem from './DrawerItem.svelte';
	import ProgramsPopup from './ProgramsPopup.svelte';
	import SituationsPopup from './SituationsPopup.svelte';
	import { isAdmin, isAgent, isSupport, loggedUser } from '$lib/stores';
	import Logout from '$lib/components/Icons/Logout.svelte';
	import Users from '$lib/components/Icons/Users.svelte';
	import Driver from '$lib/components/Icons/Driver.svelte';
	import Truck from '$lib/components/Icons/Truck.svelte';
	import Group from '$lib/components/Icons/Group.svelte';
	import Inbox from '$lib/components/Icons/Inbox.svelte';
</script>

<Drawer class="block md:hidden overflow-x-hidden">
	<div class="pt-5 flex flex-col justify-between h-full">
		<div class="flex flex-col gap-3">
			<div class="flex w-full justify-center my-2">
				<img src="/logo.png" width="40" alt="" />
			</div>
			{#if $isAdmin || $isSupport}
				<DrawerItem href="/app/users">
					<svelte:fragment slot="icon">
						<Users />
					</svelte:fragment>
					{i18n.t('label.users')}</DrawerItem
				>
			{/if}
			{#if $isAdmin || $isAgent}
				<DrawerItem href="/app/drivers">
					<svelte:fragment slot="icon">
						<Driver />
					</svelte:fragment>
					{i18n.t('label.drivers')}</DrawerItem
				>
				<DrawerItem href="/app/cars">
					<svelte:fragment slot="icon">
						<Truck />
					</svelte:fragment>
					{i18n.t('label.cars')}</DrawerItem
				>
				<DrawerItem href="/app/groups">
					<svelte:fragment slot="icon">
						<Group />
					</svelte:fragment>
					{i18n.t('label.groups')}</DrawerItem
				>
				<DrawerItem href="/app/requests">
					<svelte:fragment slot="icon">
						<Inbox />
					</svelte:fragment>
					{i18n.t('label.requests')}
				</DrawerItem>
				<ProgramsPopup />
				<SituationsPopup />
				<Reports placement="right" />
			{/if}
		</div>
		<div class="mt-8 flex flex-col w-full items-start gap-2 pb-2">
			<div class="w-full flex justify-center mb-1">
				<LightSwitch />
			</div>
			<button type="button" class="btn" on:click={handleLogout}>
				<Logout />
				<span class="text-sm font-bold">{i18n.t('button.logout')}</span>
			</button>
		</div>
	</div>
</Drawer>
