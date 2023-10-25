<script lang="ts">
	import { actionsHeight } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';
	import ButtonInsert from '../Button/ButtonInsert.svelte';
	import SearchInput from '$lib/components/Inputs/SearchInput.svelte';
	import TableTitle from './TableTitle.svelte';
	export let disableSearch = false;
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
		<SearchInput disabled={disableSearch} on:search />
		<ButtonInsert on:click={handleInsertClick}>
			<slot name="insert" />
		</ButtonInsert>
	</div>
</div>
