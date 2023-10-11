<script lang="ts">
	import CreateCar from '$components/Forms/CreateCar.svelte';
	import CreateDriver from '$components/Forms/CreateDriver.svelte';
	import CreateGroup from '$components/Forms/CreateGroup.svelte';
	import CreateProgram from '$components/Forms/CreateProgram.svelte';
	import CreateSpecificProgram from '$components/Forms/CreateProgramSpecific.svelte';
	import CreateRequest from '$components/Forms/CreateRequest.svelte';
	import CreateSituation from '$components/Forms/CreateSituation.svelte';
	import CreateSituationCar from '$components/Forms/CreateSituationCar.svelte';
	import CreateSituationDriver from '$components/Forms/CreateSituationDriver.svelte';
	import CreateUser from '$components/Forms/CreateUser.svelte';
	import { Modals, authService } from '$lib';
	import { clientWidth, loggedUser } from '$lib/stores/basic';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import {
		Modal,
		Toast,
		getDrawerStore,
		initializeStores,
		storePopup,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import '../app.postcss';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();
	getDrawerStore().close();

	const modals: Record<Modals, ModalComponent> = {
		[Modals.CREATE_USER]: { ref: CreateUser },
		[Modals.CREATE_DRIVER]: { ref: CreateDriver },
		[Modals.CREATE_CAR]: { ref: CreateCar },
		[Modals.CREATE_GROUP]: { ref: CreateGroup },
		[Modals.CREATE_REQUEST]: { ref: CreateRequest },
		[Modals.CREATE_PROGRAM]: { ref: CreateProgram },
		[Modals.CREATE_SITUATION]: { ref: CreateSituation },
		[Modals.CREATE_SITUATION_CAR]: { ref: CreateSituationCar },
		[Modals.CREATE_SITUATION_DRIVER]: { ref: CreateSituationDriver },
		[Modals.CREATE_PROGRAM_SPECIFIC]: { ref: CreateSpecificProgram }
	};
	onMount(() => authService.getUser().then((user) => ($loggedUser = user)));
</script>

<svelte:window bind:innerWidth={$clientWidth} />

<Toast />
<Modal components={modals} transitionIn={scale} transitionOut={scale} />
<slot />
