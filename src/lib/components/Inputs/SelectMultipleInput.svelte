<script lang="ts">
	import { scale } from 'svelte/transition';
	import { v4 } from 'uuid';
	import type { DropdownOptions } from './Dropdown.svelte';
	export let required = false;
	export let value: any[] = [];
	export let options: DropdownOptions[] = [];
	export let id = v4();
	const handleItemClick = (item: typeof value) => {
		value = value.filter((i) => item !== i);
	};
</script>

<div class="flex flex-col">
	<label for={id} data-required={required}> <slot /></label>
	<select {id} {required} class="select pr-2" multiple bind:value on:select>
		{#each options as { label, value } (label)}
			<option class="rounded" {value}>{label}</option>
		{/each}
	</select>
	<div class="flex justify-center my-2">
		<div class="grid grid-cols-3 gap-2 w-fit">
			{#each value as i}
				<button
					type="button"
					class="btn py-0 px-2 variant-filled-surface"
					transition:scale
					on:click={() => handleItemClick(i)}
				>
					{i} &Cross;
				</button>
			{/each}
		</div>
	</div>
</div>
<!-- </div> -->
