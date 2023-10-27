<script lang="ts">
	import i18n from '$lib/i18n';
	import Plus from '$lib/components/Icons/Plus.svelte';
</script>

<button type="button" class="btn variant-filled gap-2" on:click>
	<div class="flex-none">
		<Plus />
	</div>
	<span>{i18n.t('button.insert')} <slot /></span>
</button>
