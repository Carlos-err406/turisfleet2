<script context="module" lang="ts">
	export interface DropdownOptions {
		label: string;
		value: any;
	}
</script>

<script lang="ts">
	import { v4 } from 'uuid';
	import { createEventDispatcher } from 'svelte';
	import {
		popup,
		type AutocompleteOption,
		type PopupSettings,
		Autocomplete,
		type Transition
	} from '@skeletonlabs/skeleton';
	import type { Placement } from '@floating-ui/dom';
	import type { SlideParams } from 'svelte/transition';
	export let options: DropdownOptions[];
	export let placeholder = '';
	export let target = v4();
	export let id = v4();
	export let placement: Placement = 'bottom';
	export let transitions = false;
	export let transitionInParams: SlideParams | undefined = undefined;
	export let transitionOutParams: SlideParams | undefined = undefined;
	export let transitionIn: Transition | undefined = undefined;
	export let transitionOut: Transition | undefined = undefined;
	export let event: 'focus-click' | 'click' | 'hover' | 'focus-blur' = 'click';
	export let required = false;
	export let input = '';

	const dispatch = createEventDispatcher();
	const onSelection = ({ detail }: CustomEvent<AutocompleteOption<string>>) => {
		input = detail.label;
		dispatch('select', detail.value);
	};
	let settings: PopupSettings = { event, target, placement };
</script>

<div>
	<label for={id}>
		<slot />
	</label>
	<input
		{required}
		{id}
		class="input autocomplete"
		type="search"
		name="autocomplete-search"
		bind:value={input}
		{placeholder}
		use:popup={settings}
	/>
	<div class="card shadow-lg rounded max-h-[290px] overflow-auto" data-popup={target}>
		<Autocomplete
			regionEmpty="p-2"
			{transitions}
			{transitionInParams}
			{transitionOutParams}
			{transitionIn}
			{transitionOut}
			bind:input
			{options}
			on:selection={onSelection}
		/>
	</div>
</div>
