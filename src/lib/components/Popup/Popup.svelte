<script lang="ts">
	import { md } from '$lib/stores';
	import type { Placement } from '@floating-ui/dom';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { v4 } from 'uuid';
	export let target = v4();
	export let placement: Placement = 'bottom';
	export let event: 'focus-click' | 'click' | 'hover' | 'focus-blur' = 'click';
	export let active = false;
	let settings: PopupSettings = { event, target, placement };
</script>

<div
	use:popup={settings}
	class="py-1 md:my-1 md:py-3 cursor-pointer app-rail-wrapper w-full flex flex-col justify-center items-stretch text-center aspect-auto bg-primary-hover-token"
	class:bg-primary-active-token={active}
>
	<div class="app-rail-label font-bold text-xs">
		<div
			class="flex {$md
				? 'flex-row md:flex-col'
				: 'flex-col py-1.5'}  items-center justify-center gap-2"
		>
			<span>
				<slot name="icon" />
			</span>
			<span class="text-xs font-bold">
				<slot name="title" />
			</span>
			<div class="card p-4 max-w-sm shadow-lg z-40" data-popup={target}>
				<div class="grid grid-cols-1 gap-2 max-h-[70vh] overflow-auto text-primary-100">
					<slot />
				</div>
				<div class="arrow bg-primary-900-50-token" />
			</div>
		</div>
	</div>
</div>
