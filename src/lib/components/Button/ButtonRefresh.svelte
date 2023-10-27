<script>
	import Refresh from '$lib/components/Icons/Refresh.svelte';
</script>

<button class="btn variant-filled gap-2 w-fit p-2" on:click>
	<div class="flex-none">
		<Refresh />
	</div>
</button>

<style>
	button > div:hover {
		animation: rotate 0.5s;
	}
</style>
