<script lang="ts">
	import { actionsHeight } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';
	import ButtonInsert from '../Button/ButtonInsert.svelte';
	import SearchInput from '$lib/components/Inputs/SearchInput.svelte';
	import TableTitle from './TableTitle.svelte';
	export let disableSearch = false;
	let searchValue: string;
	const dispatch = createEventDispatcher();
	const handleInsertClick = () => dispatch('insert');
</script>

<div
	class="flex flex-col sm:flex-row gap-4 w-full sm:justify-between sm:items-center px-4 py-2"
	bind:offsetHeight={$actionsHeight}
>
	<TableTitle>
		<slot />
	</TableTitle>
	<div class="flex gap-4 justify-between">
		<SearchInput bind:searchValue disabled={disableSearch} />
		<ButtonInsert on:click={handleInsertClick}>
			<slot name="insert" />
		</ButtonInsert>
	</div>
</div>
