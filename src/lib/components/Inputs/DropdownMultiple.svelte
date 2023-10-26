<script lang="ts">
	import { v4 } from 'uuid';
	import type { DropdownOption } from './Dropdown.svelte';
	export let options: DropdownOption[];
	export let id = v4();
	export let required = false;
	export let values: any[];
	const handleOptionClick = (e: MouseEvent, option: DropdownOption) => {
		const { ctrlKey, button } = e;
		if (button === 0) {
			e.preventDefault();
			if (ctrlKey) {
				if (values.includes(option.value)) {
					values = values.filter((value) => value != option.value);
				} else {
					values = [...values, option.value];
				}
			} else {
				values = [option.value];
			}
		}
	};
</script>

<div class="">
	<label for={id} class:required>
		<slot />
	</label>
	<select name="" multiple {id} {required} class="!pr-2">
		{#each options as option}
			<option
				selected={values.includes(option.value)}
				value={option.value}
				on:click={(e) => handleOptionClick(e, option)}
			>
				{option.label}
			</option>
		{/each}
	</select>
</div>
