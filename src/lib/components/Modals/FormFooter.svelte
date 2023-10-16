<script lang="ts">
	import i18n from '$lib/i18n';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const secondary = () => dispatch('secondary');
	const primary = () => dispatch('primary');
</script>

<button type="button" class="btn variant-outline-primary" on:click={secondary}>
	<slot name="secondary">{i18n.t('button.cancel')}</slot>
</button>
<slot />
<button type="submit" class="btn variant-filled-primary" on:click={primary}>
	<slot name="primary">{i18n.t('button.submit')}</slot>
</button>
