<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { getDrawerSettings } from '$lib';
	import Logout from '$lib/components/Icons/Logout.svelte';
	import Menu from '$lib/components/Icons/Menu.svelte';
	import i18n from '$lib/i18n';
	import { isDriver, loggedUser, navHeight } from '$lib/stores';
	import { handleLogout } from '$lib/utils';
	import { AppBar, getDrawerStore } from '@skeletonlabs/skeleton';
	import LangButton from '../Panel/LangButton.svelte';
	const drawer = getDrawerStore();
	const handleShowMenuClick = () => {
		!$drawer.open && drawer.open(getDrawerSettings());
	};
</script>

<div bind:clientHeight={$navHeight}>
	<AppBar slotDefault="place-self-center" slotTrail="place-content-end" shadow="shadow-sm">
		<svelte:fragment slot="lead">
			<div class="flex gap-2 sm:gap-5 2xl items-center">
				<button type="button" class="flex md:hidden btn btn-icon" on:click={handleShowMenuClick}>
					<Menu />
				</button>
				<div class="flex-none">
					<img src="/logo.png" alt="logo" width="40" />
				</div>
				<h3 class="h3">{PUBLIC_APP_NAME}</h3>
			</div>
		</svelte:fragment>
		{#if !$isDriver && $page.url.pathname === '/profile'}
			<a href="/app/users" class="btn"> Go to main view</a>
		{/if}
		<svelte:fragment slot="trail">
			<div class="block md:hidden">
				<LangButton />
			</div>
			<a href="/profile">
				<div class="flex flex-col gap-0.5 items-start justify-center w-fit">
					{#if $loggedUser}
						<span class="text-lg font-semibold">{$loggedUser.username}</span>
						<span class="text-sm text-surface-500-400-token"
							>{i18n.t(`label.${$loggedUser.role}`)}</span
						>
					{/if}
				</div>
			</a>
			<button type="button" class="btn hidden md:flex gap-2 items-center" on:click={handleLogout}>
				<Logout />
				<span>{i18n.t('button.logout')} </span>
			</button>
		</svelte:fragment>
	</AppBar>
</div>
