<script lang="ts">
	import { clientWidth } from '$lib/stores/basic';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { Toast, getDrawerStore, initializeStores, storePopup } from '@skeletonlabs/skeleton';
	import '../app.postcss';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();
	getDrawerStore().close();
</script>

<svelte:window bind:innerWidth={$clientWidth} />

<Toast />
<slot />
