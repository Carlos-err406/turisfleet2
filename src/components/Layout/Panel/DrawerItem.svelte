<script lang="ts">
	import { page } from '$app/stores';
	export let icon: string;
	export let href: string;
</script>

<a {href} class="rounded-sm py-2" class:bg-primary-active-token={$page.url.pathname === href}>
	<div class="flex flex-col items-center justify-center gap-1">
		{@html icon}
		<span><slot /></span>
	</div>
</a>
