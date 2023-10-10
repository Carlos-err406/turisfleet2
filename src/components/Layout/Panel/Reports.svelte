<script lang="ts">
	import { fileText } from '$lib/icons';
	import { clientWidth } from '$lib/stores/basic';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	$: dropdown = {
		target: 'reports-dropdown',
		event: 'click',
		placement: 'right'
	} satisfies PopupSettings;
</script>

<div
	use:popup={dropdown}
	class="px-3 py-1 cursor-pointer app-rail-wrapper md:w-full flex flex-col justify-center items-stretch text-center space-y-1 md:aspect-square bg-primary-hover-token"
>
	<div class="md:app-rail-label font-bold text-xs">
		<div class="flex flex-row md:flex-col items-center justify-center gap-2">
			<span>
				{@html fileText}
			</span>
			<span class="text-xs font-bold"> Reports </span>
			<div class="card p-4 max-w-sm shadow-lg" data-popup="reports-dropdown">
				<div class="grid grid-cols-1 gap-2">
					<button id="drivers-list" class="font-normal btn variant-outline-surface"
						>Drivers List</button
					>
					<button id="cars-list" class="font-normal btn variant-outline-surface">Cars List</button>
					<button id="request-on-date" class="font-normal btn variant-outline-surface"
						>Request on date</button
					>
					<button id="car-situations" class="font-normal btn variant-outline-surface"
						>Car situations</button
					>
					<button id="driver-situations" class="font-normal btn variant-outline-surface"
						>Driver situations</button
					>
					<button id="car-driver-relation-list" class="font-normal btn variant-outline-surface"
						>Car-Driver relation list</button
					>
					<button id="drags-list" class="font-normal btn variant-outline-surface">Drags list</button
					>
					<button id="routing-sheets" class="font-normal btn variant-outline-surface"
						>Routing sheets</button
					>
					<button id="request-modifications" class="font-normal btn variant-outline-surface"
						>Request modifications</button
					>
				</div>
				<div class="arrow bg-surface-100-800-token" />
			</div>
		</div>
	</div>
</div>
