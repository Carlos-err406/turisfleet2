<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { FlashType } from '$lib/stores/flashes';
	import { fly, scale, slide } from 'svelte/transition';
	export let flash: FlashType;
	const dispatch = createEventDispatcher();
	const handleClick = () => {
		dispatch('click', flash);
	};
</script>

<button
	tabindex="-1"
	class="btn flash outline-none {flash.type}"
	type="button"
	on:click={handleClick}
	in:scale={{ duration: 200 }}
	out:slide={{ duration: 200 }}
>
	<span>{flash.message}</span>
</button>
