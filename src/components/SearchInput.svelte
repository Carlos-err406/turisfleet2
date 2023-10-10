<script lang="ts">
	import { search } from '$lib/icons';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let searchValue = '';
	const handleSearch = () => {
		console.log(searchValue);
		dispatch('search', searchValue);
		searchValue = '';
	};
</script>

<form class="flex gap-0" on:submit={handleSearch}>
	<input
		type="text"
		placeholder="search"
		class="outline-none input rounded-r-none pl-4"
		bind:value={searchValue}
	/>
	<button class="btn variant-filled btn-icon p-2 rounded-l-none">
		{@html search}
	</button>
</form>
