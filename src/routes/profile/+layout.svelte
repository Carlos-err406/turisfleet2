<script>
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import NavbarProfile from '$lib/components/Layout/Navbar/NavbarProfile.svelte';
	import LangButton from '$lib/components/Layout/Panel/LangButton.svelte';
	import i18n from '$lib/i18n';
	import { AppShell, LightSwitch } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	<title>{i18n.t('title.profile')} | {PUBLIC_APP_NAME}</title>
</svelte:head>
<AppShell>
	<svelte:fragment slot="header">
		<NavbarProfile />
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="footer">
		<div class="flex w-full py-3 gap-2 justify-center flex-col items-start">
			<LangButton />
			<div class="px-5">
				<LightSwitch />
			</div>
		</div>
	</svelte:fragment>
</AppShell>
