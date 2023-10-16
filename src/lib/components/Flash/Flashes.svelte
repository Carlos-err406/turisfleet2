<script lang="ts">
	import type { FlashType } from '$lib/stores/flashes';
	import type flashStore from '$lib/stores/flashes';
	import { onMount } from 'svelte';
	import Flash from './Flash.svelte';
	import { springHeight } from '$lib/utils';
	export let flashes: typeof flashStore;
	const handleFlashClick = ({ detail }: CustomEvent<FlashType>) => {
		flashes.remove(detail.id);
	};
	let wrapper: HTMLDivElement;
	$: heightSpring = springHeight(wrapper);
</script>

{#if $flashes}
	<div class="overflow-hidden" style="height: {$heightSpring}px;">
		<div class="flex flex-col gap-2" bind:this={wrapper}>
			{#each $flashes as flash (flash.id)}
				<Flash {flash} on:click={handleFlashClick} />
			{/each}
		</div>
	</div>
{/if}
