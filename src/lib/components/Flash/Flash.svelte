<script lang="ts">
	import type { FlashType } from '$lib/stores/flashes';
	import { createEventDispatcher } from 'svelte';
	import { scale, slide } from 'svelte/transition';
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
	<span class="whitespace-break-spaces">{flash.message}</span>
</button>
