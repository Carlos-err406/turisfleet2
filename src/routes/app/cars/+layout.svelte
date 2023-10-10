<script>
	import { env } from '$env/dynamic/public';
</script>

<svelte:head>
	<title>Cars | {env.PUBLIC_APP_NAME}</title>
</svelte:head>

<slot />
