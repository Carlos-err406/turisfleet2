<script lang="ts">
	import i18n from '$lib/i18n';
	import { plus } from '$lib/icons';
</script>

<button type="button" class="btn variant-filled gap-2" on:click>
	<div class="flex-none">
		{@html plus}
	</div>
	<span>{i18n.t('button.insert')} <slot /></span>
</button>
