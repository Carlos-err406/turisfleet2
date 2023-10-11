<script>
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	<title>Login | {PUBLIC_APP_NAME}</title>
</svelte:head>
<div class="flex h-full items-center justify-center">
	<slot />
</div>
<div class="fixed left-5 top-5">
	<LightSwitch />
</div>
