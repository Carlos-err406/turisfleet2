<script lang="ts">
	import { authService } from '$lib';
	import modalRegistry from '$lib/components/Modals';
	import { clientWidth, loggedUser } from '$lib/stores/basic';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import {
		Modal,
		Toast,
		getDrawerStore,
		initializeStores,
		storePopup
	} from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import '../app.postcss';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();
	getDrawerStore().close();

	onMount(() => authService.getUser().then((user) => ($loggedUser = user)));
</script>

<svelte:window bind:innerWidth={$clientWidth} />

<Toast />
<Modal components={modalRegistry} transitionIn={scale} transitionOut={scale} />
<slot />
