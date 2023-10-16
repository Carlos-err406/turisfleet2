<script>
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import i18n from '$lib/i18n';
</script>

<svelte:head>
	<title>{i18n.t('title.programs')} | {PUBLIC_APP_NAME}</title>
</svelte:head>

<slot />
