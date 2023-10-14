<script context="module" lang="ts">
	export interface RequestCreate {
		id_group: number;
		id_specific_program: number;
		start_date: Date | string;
		tourist_amount: number;
	}
</script>

<script lang="ts">
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import type flashStore from '$lib/stores/flashes';
	import { tomorrow } from '$lib/utils';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: RequestCreate = {
		id_group: NaN,
		id_specific_program: NaN,
		start_date: tomorrow(),
		tourist_amount: 1
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
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">Create Request</svelte:fragment>
			<Dropdown placeholder="group" required options={[]} on:select>Group</Dropdown>
			<Dropdown placeholder="specific program" options={[]} on:select>Specific program</Dropdown>
			<div>
				<label for="request-create-start-date">Start date</label>
				<input
					placeholder="start date"
					required
					type="date"
					id="request-create-start-date"
					bind:value={values.start_date}
					min={tomorrow()}
				/>
			</div>
			<div>
				<label for="request-create-tourist-amount">Tourist amount</label>
				<input
					placeholder="tourist amount"
					required
					type="number"
					min="1"
					max="100"
					id="request-create-tourist-amount"
					bind:value={values.tourist_amount}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
