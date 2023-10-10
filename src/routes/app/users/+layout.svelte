<script>
	import { env } from '$env/dynamic/public';
</script>

<svelte:head>
	<title>Users | {env.PUBLIC_APP_NAME}</title>
</svelte:head>

<slot />
