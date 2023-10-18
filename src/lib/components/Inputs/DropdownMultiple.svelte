<script context="module" lang="ts">
	export interface DropdownOption {
		label: string;
		value: any;
	}
</script>

<script lang="ts">
	import { v4 } from 'uuid';
	export let options: DropdownOption[];
	export let placeholder = '';
	export let id = v4();
	export let required = false;
	export let selectedOptions: DropdownOption[] = [];
	const handleOptionClick = (e: MouseEvent, option: DropdownOption) => {
		const { ctrlKey, button } = e;
		if (button === 0) {
			e.preventDefault();
			if (ctrlKey) {
				if (
					selectedOptions.some(
						({ value }) => JSON.stringify(value) === JSON.stringify(option.value)
					)
				) {
					selectedOptions = selectedOptions.filter(
						({ value }) => JSON.stringify(value) !== JSON.stringify(option.value)
					);
				} else {
					selectedOptions = [...selectedOptions, option];
				}
			} else {
				selectedOptions = [option];
			}
		}
	};
	$:console.log(selectedOptions)
</script>

<div class="">
	<label for={id} class:required>
		<slot />
	</label>
	<select name="" multiple {id} {required} class="!pr-2">
		{#if placeholder}
			<option value="" disabled selected hidden>{placeholder}</option>
		{/if}
		{#each options as option}
			<option
				selected={selectedOptions.some(
					({ value }) => JSON.stringify(value) === JSON.stringify(option.value)
				)}
				value={option.value}
				on:click={(e) => handleOptionClick(e, option)}
			>
				{option.label}
			</option>
		{/each}
	</select>
</div>
