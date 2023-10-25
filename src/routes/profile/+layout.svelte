<script>
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import LangButton from '$lib/components/Layout/Panel/LangButton.svelte';
	import i18n from '$lib/i18n';
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	<title>{i18n.t('title.profile')} | {PUBLIC_APP_NAME}</title>
</svelte:head>
<slot />
<div class="fixed top-5 w-full right-5">
	<div class="flex w-full justify-end gap-5 items-center">
		<LangButton />
		<LightSwitch />
	</div>
</div>
