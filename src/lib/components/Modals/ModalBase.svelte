<script lang="ts">
	import { springDimensions } from '$lib/utils';
	let wrapper: HTMLDivElement;
	let heightSpring, widthSpring;
	export let modalW: 'w-modal' | 'w-modal-slim' | 'w-modal-wide'|'w-full' = 'w-modal';
	$: if (wrapper) {
		[heightSpring, widthSpring] = springDimensions(wrapper);
	}
</script>

<div
	class="overflow-hidden bg-surface-50-900-token {modalW} modal rounded-container-token shadow-xl"
	style="height: {$heightSpring}px; width: {$widthSpring}px;"
>
	<div bind:this={wrapper} class="overflow-auto min-w-max h-auto max-h-[95vh] p-4">
		<slot />
	</div>
</div>
