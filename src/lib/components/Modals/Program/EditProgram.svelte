<script context="module" lang="ts">
	export interface IProgramEdit {
		name: string;
	}
</script>

<script lang="ts">
	import ModalBase from '$lib/components/Modals/ModalBase.svelte';
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: IProgramEdit = $modalStore[0].meta.values;
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const edit = () => {
		validate() && console.log(values);
	};
</script>

{#if $modalStore[0]}
	<ModalBase modalW="w-modal-slim">
		<BaseForm footerCols={1} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">Edit Program</svelte:fragment>
			<div>
				<label data-required="true" for="program-edit-name">Program name</label>
				<input
					placeholder="program name"
					required
					type="text"
					id="program-edit-name"
					bind:value={values.name}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
