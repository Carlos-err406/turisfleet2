<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const secondary = () => dispatch('secondary');
	const primary = () => dispatch('primary');
</script>

<button type="button" class="btn variant-outline-primary" on:click={secondary}>
	<slot name="secondary">Cancel</slot>
</button>
<button type="submit" class="btn variant-filled-primary" on:click={primary}>
	<slot name="primary">Submit</slot>
</button>
