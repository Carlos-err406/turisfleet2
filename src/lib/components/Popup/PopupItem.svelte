<script lang="ts">
	import { v4 } from 'uuid';
	export let id = v4();
	export let active = false;
</script>

<button
	{id}
	class="font-semibold btn variant-outline-surface"
	class:bg-primary-active-token={active}
	class:text-surface-900-50-token={!active}
	class:text-primary-900-50-token={active}
	on:click
>
	<slot />
</button>
