<script lang="ts">
	import { springHeight } from '$lib/utils';

	export let modalW: 'w-modal' | 'w-modal-slim' | 'w-modal-wide' = 'w-modal';
	let wrapper: HTMLDivElement;
	$: heightSpring = springHeight(wrapper);
</script>

<div
	class="overflow-hidden bg-surface-50-900-token {modalW} rounded-container-token shadow-xl"
	style="height: {$heightSpring}px;"
>
	<div bind:this={wrapper} class="overflow-auto h-auto max-h-[95vh] p-4">
		<slot />
	</div>
</div>
