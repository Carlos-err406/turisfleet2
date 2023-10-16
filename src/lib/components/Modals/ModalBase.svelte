<script lang="ts">
	import { springHeight } from '$lib/utils';
	let wrapper: HTMLDivElement;
	$: heightSpring = springHeight(wrapper);
</script>

<div
	class="overflow-hidden bg-surface-50-900-token min-w-fit rounded-container-token shadow-xl"
	style="height: {$heightSpring}px;"
>
	<div bind:this={wrapper} class="overflow-auto h-auto max-h-[95vh] p-4">
		<slot />
	</div>
</div>
