<script lang="ts">
	import { clientWidth, md, sm, xs } from '$lib/stores/basic';
	import Reports from './../Panel/Reports.svelte';
	import { env } from '$env/dynamic/public';
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
			<div class="flex gap-2 sm:gap-5 2xl items-center">
				<button type="button" class="flex md:hidden btn btn-icon" on:click={handleShowMenuClick}>
					{@html menu}
				</button>
				<div class="flex-none">
					<img src="/logo.png" alt="logo" width="40" />
				</div>
				<h3 class="h3">{env.PUBLIC_APP_NAME}</h3>
			</div>
		</svelte:fragment>
		<svelte:fragment slot="trail">
			<button type="button" class="btn hidden md:flex gap-2 items-center" on:click={handleLogout}>
				{@html logout}
				<span>Log out </span>
			</button>
			{#if ($xs || $sm) && !$md}
				<Reports />
			{/if}
		</svelte:fragment>
	</AppBar>
</div>
