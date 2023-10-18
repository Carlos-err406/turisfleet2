<script lang="ts">
	import { springDimensions } from '$lib/utils';
	let wrapper: HTMLDivElement;
	let heightSpring, widthSpring;

	$: if (wrapper) {
		[heightSpring, widthSpring] = springDimensions(wrapper);
	}
</script>

<div
	class="overflow-hidden bg-surface-50-900-token w-modal rounded-container-token shadow-xl"
	style="height: {$heightSpring}px; width: {$widthSpring}px;"
>
	<div bind:this={wrapper} class="overflow-auto min-w-max h-auto max-h-[95vh] p-4">
		<slot />
	</div>
</div>
