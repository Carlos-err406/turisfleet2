<script lang="ts">
	import type flashStore from '$lib/stores/flashes';
	import Flashes from './../Flash/Flashes.svelte';
	import FormFooter from './FormFooter.svelte';
	export let flashes: typeof flashStore;
	export let footerCols = 1;
</script>

<div class="grid grid-cols gap-y-3">
	<h3 class="text-3xl"><slot name="title" /></h3>
	<Flashes {flashes} />
	<form action="" class="grid gap-y-4 gap-x-3" on:submit|preventDefault>
		<slot />
		<div
			class="flex items-center justify-end w-full mt-2 gap-3 font-semibold col-span-{footerCols} "
		>
			<slot name="footer">
				<FormFooter on:primary on:secondary />
			</slot>
		</div>
	</form>
</div>
