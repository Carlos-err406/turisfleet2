<script>
	import { env } from '$env/dynamic/public';
</script>

<svelte:head>
	<title>Requests | {env.PUBLIC_APP_NAME}</title>
</svelte:head>

<slot />
