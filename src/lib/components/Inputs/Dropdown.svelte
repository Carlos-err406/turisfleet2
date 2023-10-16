<script context="module" lang="ts">
	export interface DropdownOptions {
		label: string;
		value: any;
	}
</script>

<script lang="ts">
	import i18n from '$lib/i18n';
	import { downSimple } from '$lib/icons';
	import type { Placement } from '@floating-ui/dom';
	import {
		Autocomplete,
		popup,
		type AutocompleteOption,
		type PopupSettings,
		type Transition
	} from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import type { SlideParams } from 'svelte/transition';
	import { v4 } from 'uuid';
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
	export let value: string = '';
	const dispatch = createEventDispatcher();
	const onSelection = ({ detail }: CustomEvent<AutocompleteOption<string>>) => {
		input = detail.label;
		value = detail.value;
		dispatch('select', detail.value);
	};
	let settings: PopupSettings = { event, target, placement };
	let inputElement: HTMLInputElement;
</script>

<div class="">
	<label for={id} data-required={required}>
		<slot />
	</label>
	<div class="input-group flex items-center pr-1">
		<input
			{id}
			{required}
			{placeholder}
			class="input autocomplete"
			type="text"
			name="autocomplete-search"
			bind:value={input}
			use:popup={settings}
			bind:this={inputElement}
		/>
		<button class="btn !p-0" type="button" tabindex="-1" on:click={() => inputElement.click()}>
			{@html downSimple}
		</button>
	</div>
	<div
		class="card w-fit max-w-sm shadow-lg rounded max-h-[290px] overflow-auto"
		data-popup={target}
		tabindex="-1"
	>
		<Autocomplete
			{transitions}
			{transitionInParams}
			{transitionOutParams}
			{transitionIn}
			{transitionOut}
			{options}
			bind:input
			regionEmpty="p-2 w-fit"
			emptyState={i18n.t('misc.noEntriesFound')}
			on:selection={onSelection}
			on:click
		/>
	</div>
</div>
