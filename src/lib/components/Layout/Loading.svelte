<script lang="ts">
	import { loading } from '$lib/stores';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	const handleTab = (e: KeyboardEvent) => {
		if (e.key == 'Tab' && $loading) {
			e.preventDefault();
		}
	};
</script>

<svelte:window on:keydown={handleTab} />
{#if $loading}
	<div class="fixed w-full h-full z-50 bg-surface-backdrop-token pointer-events-auto">
		<div class="flex items-center justify-center w-full h-full">
			<ProgressRadial value={undefined} />
		</div>
	</div>
{/if}
