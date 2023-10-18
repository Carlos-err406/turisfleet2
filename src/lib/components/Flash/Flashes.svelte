<script lang="ts">
	import type { FlashStore, FlashType } from '$lib/stores/flashes';
	import { springHeight } from '$lib/utils';
	import Flash from './Flash.svelte';
	export let flashes: FlashStore;
	const handleFlashClick = ({ detail }: CustomEvent<FlashType>) => {
		flashes.remove(detail.id);
	};
	let wrapper: HTMLDivElement;
	$: heightSpring = springHeight(wrapper);
</script>

{#if $flashes}
	<div class="flex justify-center w-full">
		<div class="overflow-hidden w-full" style="height: {$heightSpring}px;">
			<div class="flex flex-col gap-2" bind:this={wrapper}>
				{#each $flashes as flash (flash.id)}
					<Flash {flash} on:click={handleFlashClick} />
				{/each}
			</div>
		</div>
	</div>
{/if}
