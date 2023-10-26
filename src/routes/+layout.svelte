<script lang="ts">
	import Loading from '$lib/components/Layout/Loading.svelte';
	import modalRegistry from '$lib/components/Modals';
	import { clientWidth, lang } from '$lib/stores';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import {
		Modal,
		Toast,
		getDrawerStore,
		initializeStores,
		storePopup
	} from '@skeletonlabs/skeleton';
	import { scale } from 'svelte/transition';
	import '../app.postcss';
	import { setContext } from 'svelte';

	if (!$lang) $lang = 'en';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	initializeStores();
	getDrawerStore().close();
	setContext('canEdit', true);
</script>

<svelte:window bind:innerWidth={$clientWidth} />

<Toast />
<Modal components={modalRegistry} transitionIn={scale} transitionOut={scale} />
<Loading />
<slot />
