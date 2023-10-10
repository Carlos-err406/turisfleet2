<script lang="ts">
	import { actionsHeight } from '$lib/stores/basic';
	import { createEventDispatcher } from 'svelte';
	import ButtonInsert from '../Button/ButtonInsert.svelte';
	import ButtonRefresh from '../Button/ButtonRefresh.svelte';
	import SearchInput from '../SearchInput.svelte';
	import TableTitle from './TableTitle.svelte';
	let searchValue: string;
	const dispatch = createEventDispatcher();
	const handleInsertClick = () => dispatch('insert-click');
</script>

<div
	class="flex gap-4 w-full justify-between items-center px-4 py-2"
	bind:offsetHeight={$actionsHeight}
>
	<TableTitle>
		<slot />
	</TableTitle>
	<div class="flex gap-4">
		<SearchInput bind:searchValue />
		<!-- <ButtonRefresh /> -->
		<ButtonInsert on:click={handleInsertClick}>
			<slot name="insert" />
		</ButtonInsert>
	</div>
</div>
