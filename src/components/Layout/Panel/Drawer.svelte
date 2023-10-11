<script>
	import { driver, group, inbox, info, layers, logout, truck, users } from '$lib/icons';
	import { handleLogout } from '$lib/utils';
	import { Drawer, LightSwitch } from '@skeletonlabs/skeleton';
	import DrawerItem from './DrawerItem.svelte';
	import ProgramsPopup from './ProgramsPopup.svelte';
	import SituationsPopup from './SituationsPopup.svelte';
</script>

<Drawer class="block md:hidden">
	<div class="pt-2 flex flex-col justify-between h-full">
		<div class="flex flex-col gap-3">
			<div class="flex w-full justify-center">
				<img src="/logo.png" width="40" alt="" />
			</div>
			<DrawerItem href="/app/users" icon={users}>Users</DrawerItem>
			<DrawerItem href="/app/drivers" icon={driver}>Drivers</DrawerItem>
			<DrawerItem href="/app/cars" icon={truck}>Cars</DrawerItem>
			<DrawerItem href="/app/groups" icon={group}>Groups</DrawerItem>
			<DrawerItem href="/app/requests" icon={inbox}>Requests</DrawerItem>
			<ProgramsPopup />
			<SituationsPopup />
		</div>
		<div class="flex flex-col w-full items-start gap-2 pb-2">
			<div class="w-full flex justify-center mb-1">
				<LightSwitch />
			</div>
			<button type="button" class="btn" on:click={handleLogout}>
				{@html logout}
				<span>Log out </span>
			</button>
		</div>
	</div>
</Drawer>
