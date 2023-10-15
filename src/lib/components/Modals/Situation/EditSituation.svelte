<script context="module" lang="ts">
	export interface ISituationEdit {
		situation_name: string;
		situation_type: 'C' | 'D' | 'CD';
	}
	const situations = [
		{ label: 'Car', value: 'C' },
		{ label: 'Driver', value: 'D' },
		{ label: 'Car and Driver', value: 'CD' }
	];
</script>

<script lang="ts">
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ModalBase from '../ModalBase.svelte';
	import BaseForm from '../BaseForm.svelte';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: ISituationEdit = $modalStore[0].meta.values;
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const edit = () => {
		validate() && console.log(values);
	};
	const onSituationSelection = ({ detail }: CustomEvent) => {
		values.situation_type = detail;
	};
</script>

{#if $modalStore[0]}
	<ModalBase modalW="w-modal-slim">
		<BaseForm footerCols={2} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">Edit Situation</svelte:fragment>
			<div>
				<label data-required="true" for="situation-edit-name">Situation name</label>
				<input
					placeholder="name"
					required
					type="text"
					id="situation-edit-name"
					bind:value={values.situation_name}
				/>
			</div>
			<Dropdown
				placeholder="type"
				input={situations[2].label}
				required
				options={situations}
				on:select={onSituationSelection}
			>
				Situation Type
			</Dropdown>
		</BaseForm>
	</ModalBase>
{/if}
