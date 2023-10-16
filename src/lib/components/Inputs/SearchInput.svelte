<script lang="ts">
	import i18n from '$lib/i18n';
	import { search } from '$lib/icons';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let searchValue = '';
	export let disabled = false;
	const handleSearch = () => {
		console.log(searchValue);
		dispatch('search', searchValue);
		searchValue = '';
	};
</script>

<form class="flex gap-0" on:submit={handleSearch}>
	<input
		{disabled}
		type="text"
		placeholder={i18n.t('placeholder.search')}
		class="outline-none input rounded-r-none pl-4"
		bind:value={searchValue}
	/>
	<button {disabled} class="btn variant-filled p-2 rounded-l-none">
		{@html search}
	</button>
</form>
