<script context="module" lang="ts">
	export interface ProgramCreate {
		name: string;
	}
</script>

<script lang="ts">
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ModalBase from './../Layout/ModalBase.svelte';
	import BaseForm from './BaseForm.svelte';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: ProgramCreate = {
		name: ''
	};
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const create = () => {
		validate() && console.log(values);
	};
</script>

{#if $modalStore[0]}
	<ModalBase modalW="w-modal-slim">
		<BaseForm footerCols={1} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">Create Program</svelte:fragment>

			<div>
				<label for="program-create-name">Program name</label>
				<input
					placeholder="program name"
					required
					type="text"
					id="program-create-name"
					bind:value={values.name}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
