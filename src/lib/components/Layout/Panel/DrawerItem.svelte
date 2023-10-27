<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;
</script>

<a
	{href}
	class="rounded-sm py-3 bg-primary-hover-token"
	class:bg-primary-active-token={$page.url.pathname === href}
>
	<div class="flex flex-col items-center justify-center gap-1 font-semibold text-xs aspect-auto">
		<slot name="icon" />
		<span><slot /></span>
	</div>
</a>
