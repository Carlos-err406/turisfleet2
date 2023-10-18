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
	export let value: DropdownOption['value'];
</script>

<div class="">
	<label for={id} class:required>
		<slot />
	</label>
	<select name="" {id} bind:value {placeholder} {required} on:change>
		{#each options as option}
			<option value={option.value}>
				{option.label}
			</option>
		{/each}
	</select>
</div>
