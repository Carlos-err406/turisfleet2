<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { getDrawerSettings } from '$lib';
	import i18n from '$lib/i18n';
	import { logout, menu } from '$lib/icons';
	import { isDriver, loggedUser, navHeight } from '$lib/stores';
	import { handleLogout } from '$lib/utils';
	import { AppBar, getDrawerStore } from '@skeletonlabs/skeleton';
	import LangButton from '../Panel/LangButton.svelte';
	import { page } from '$app/stores';
	const drawer = getDrawerStore();
	const handleShowMenuClick = () => {
		!$drawer.open && drawer.open(getDrawerSettings());
	};
</script>

<div bind:clientHeight={$navHeight}>
	<AppBar slotDefault="place-self-center" slotTrail="place-content-end" shadow="shadow-sm">
		<svelte:fragment slot="lead">
			<div class="flex gap-2 sm:gap-5 2xl items-center">
				<div class="flex-none">
					<img src="/logo.png" alt="logo" width="40" />
				</div>
				<h3 class="h3">{PUBLIC_APP_NAME}</h3>
			</div>
		</svelte:fragment>
		{#if !$isDriver}
			<a href="/app/users" class="btn font-semibold"> Go to main view</a>
		{/if}
		<svelte:fragment slot="trail">
			{#if $loggedUser}
				<a href="/profile">
					<div
						class="flex flex-col gap-0.5 items-start justify-center w-fit text-primary-500-400-token"
					>
						<span class="text-lg font-semibold">{$loggedUser.username}</span>
						<span class="text-sm text-primary-500-400-token opacity-70"
							>{i18n.t(`label.${$loggedUser.role}`)}</span
						>
					</div>
				</a>
			{/if}
			<button type="button" class="btn gap-2 items-center" on:click={handleLogout}>
				{@html logout}
				<span class="hidden md:block">{i18n.t('button.logout')} </span>
			</button>
		</svelte:fragment>
	</AppBar>
</div>
