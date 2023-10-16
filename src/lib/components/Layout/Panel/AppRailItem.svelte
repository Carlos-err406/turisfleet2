<script lang="ts">
	import { page } from '$app/stores';
	import { AppRailAnchor } from '@skeletonlabs/skeleton';
	export let href: string;
</script>

<AppRailAnchor
	aspectRatio="aspect-auto"
	spacing="py-3 my-1"
	{href}
	selected={$page.url.pathname === href}
>
	<div class="flex flex-col items-center justify-center gap-2">
		<slot name="icon" />
		<span><slot /></span>
	</div>
</AppRailAnchor>
