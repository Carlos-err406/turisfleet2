<script>
	import { refresh } from '$lib/icons';
</script>

<button class="btn variant-filled gap-2 w-fit p-2" on:click>
	<div class="flex-none">
		{@html refresh}
	</div>
</button>

<style>
	button > div:hover {
		animation: rotate 0.5s;
	}
</style>
