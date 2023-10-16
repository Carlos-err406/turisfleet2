<script>
	import Reports from '$lib/components/Popup/Reports.svelte';
	import i18n from '$lib/i18n';
	import { driver, group, inbox, logout, truck, users } from '$lib/icons';
	import { handleLogout } from '$lib/utils';
	import { Drawer, LightSwitch } from '@skeletonlabs/skeleton';
	import DrawerItem from './DrawerItem.svelte';
	import ProgramsPopup from './ProgramsPopup.svelte';
	import SituationsPopup from './SituationsPopup.svelte';
</script>

<Drawer class="block md:hidden overflow-x-hidden">
	<div class="pt-5 flex flex-col justify-between h-full">
		<div class="flex flex-col gap-3">
			<div class="flex w-full justify-center my-2">
				<img src="/logo.png" width="40" alt="" />
			</div>
			<DrawerItem href="/app/users" icon={users}>{i18n.t('label.users')}</DrawerItem>
			<DrawerItem href="/app/drivers" icon={driver}>{i18n.t('label.drivers')}</DrawerItem>
			<DrawerItem href="/app/cars" icon={truck}>{i18n.t('label.cars')}</DrawerItem>
			<DrawerItem href="/app/groups" icon={group}>{i18n.t('label.groups')}</DrawerItem>
			<DrawerItem href="/app/requests" icon={inbox}>{i18n.t('label.requests')}</DrawerItem>
			<ProgramsPopup />
			<SituationsPopup />
			<Reports placement="right" />
		</div>
		<div class="mt-8 flex flex-col w-full items-start gap-2 pb-2">
			<div class="w-full flex justify-center mb-1">
				<LightSwitch />
			</div>
			<button type="button" class="btn" on:click={handleLogout}>
				{@html logout}
				<span class="text-sm font-bold">{i18n.t('button.logout')}</span>
			</button>
		</div>
	</div>
</Drawer>
