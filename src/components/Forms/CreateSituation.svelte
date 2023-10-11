<script context="module" lang="ts">
	export interface SituationCreate {
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
	import Dropdown from '$components/Dropdown.svelte';
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ModalBase from './../Layout/ModalBase.svelte';
	import BaseForm from './BaseForm.svelte';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: SituationCreate = {
		situation_name: '',
		situation_type: 'CD'
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
	const onSituationSelection = ({ detail }: CustomEvent) => {
		values.situation_type = detail;
	};
</script>

{#if $modalStore[0]}
	<ModalBase modalW="w-modal-slim">
		<BaseForm footerCols={2} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">Create Situation</svelte:fragment>
			<div>
				<label for="situation-create-name">Situation name</label>
				<input
					placeholder="name"
					required
					type="text"
					id="situation-create-name"
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
