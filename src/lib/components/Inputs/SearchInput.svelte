<script lang="ts">
	import i18n from '$lib/i18n';
	import { search } from '$lib/icons';
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	const dispatch = createEventDispatcher();
	export let disabled = false;
	const handleSearch = () => {
		dispatch('search');
	};
	const query: Writable<string | undefined> = getContext('query');
</script>

<form class="flex gap-0" on:submit|preventDefault={handleSearch}>
	<input
		{disabled}
		type="search"
		placeholder={i18n.t('placeholder.search')}
		class="outline-none input rounded-r-none pl-4"
		bind:value={$query}
	/>
	<button {disabled} class="btn variant-filled p-2 rounded-l-none">
		{@html search}
	</button>
</form>
