<script>
	import { drawerSettings } from '$lib';
	import { logout, menu } from '$lib/icons';
	import { navHeight } from '$lib/stores/basic';
	import { handleLogout } from '$lib/utils';
	import { AppBar, getDrawerStore } from '@skeletonlabs/skeleton';
	const drawer = getDrawerStore();
	const handleShowMenuClick = () => {
		!$drawer.open && drawer.open(drawerSettings());
	};
</script>

<div bind:clientHeight={$navHeight}>
	<AppBar slotDefault="place-self-center" slotTrail="place-content-end" shadow="shadow-sm">
		<svelte:fragment slot="lead">
			<div class="flex gap-2 sm:gap-5 items-center">
				<button type="button" class="flex md:hidden btn btn-icon" on:click={handleShowMenuClick}>
					{@html menu}
				</button>
				<div class="flex-none">
					<img src="/logo.png" alt="logo" width="40" />
				</div>
			</div>
		</svelte:fragment>
		<span class="text-xl font-semibold">Turisfleet 2.0</span>
		<svelte:fragment slot="trail">
			<button type="button" class="btn hidden md:flex gap-2 items-center" on:click={handleLogout}>
				{@html logout}
				<span>Log out </span>
			</button>
		</svelte:fragment>
	</AppBar>
</div>
