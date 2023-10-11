<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Popup from '$components/Popup.svelte';
	import PopupItem from '$components/PopupItem.svelte';
	import { layers } from '$lib/icons';
	const routes = {
		programs: '/app/programs',
		specificPrograms: '/app/programs/specific'
	};
	const handleProgramsClick = () => {
		goto(routes.programs);
	};
	const handleSpecificProgramsClick = () => {
		goto(routes.specificPrograms);
	};
	$: programsActive = $page.url.pathname === routes.programs;
	$: specificProgramsActive = $page.url.pathname === routes.specificPrograms;
	$: active = programsActive || specificProgramsActive;
</script>

<Popup placement="right" {active}>
	<svelte:fragment slot="icon">
		{@html layers}
	</svelte:fragment>
	<svelte:fragment slot="title">Programs</svelte:fragment>
	<PopupItem active={programsActive} on:click={handleProgramsClick}>Programs</PopupItem>
	<PopupItem active={specificProgramsActive} on:click={handleSpecificProgramsClick}>
		Specific Programs
	</PopupItem>
</Popup>
