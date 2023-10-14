<script lang="ts">
	import { plus } from '$lib/icons';
</script>

<button type="button" class="btn variant-filled gap-2" on:click>
	<div class="flex-none">
		{@html plus}
	</div>
	<span>Insert <slot /></span>
</button>
