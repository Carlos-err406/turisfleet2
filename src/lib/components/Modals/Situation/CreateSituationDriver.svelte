<script context="module" lang="ts">
	export interface DriverSituationCreate {
		driver_id_driver: number;
		situation_id_situation: number;
		date: Date | string;
		return_date: Date | null;
	}
</script>

<script lang="ts">
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import ModalBase from '$lib/components/Modals/ModalBase.svelte';
	import type flashStore from '$lib/stores/flashes';
	import { tomorrow } from '$lib/utils';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: DriverSituationCreate = {
		driver_id_driver: 0,
		situation_id_situation: 0,
		date: '',
		return_date: null
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
		values.situation_id_situation = detail;
	};
	const onDriverSelection = ({ detail }: CustomEvent) => {
		values.driver_id_driver = detail;
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">Create Driver situation</svelte:fragment>

			<Dropdown placeholder="driver" input={''} required options={[]} on:select={onDriverSelection}>
				CreateCar
			</Dropdown>
			<Dropdown
				placeholder="situation"
				input={''}
				required
				options={[]}
				on:select={onSituationSelection}>Situation</Dropdown
			>
			<div>
				<label for="car-situation-date">Date</label>
				<input
					placeholder="date"
					required
					type="date"
					min={tomorrow()}
					max={values.return_date?.toString() ?? undefined}
					id="car-situation-date"
					bind:value={values.date}
				/>
			</div>
			<div>
				<label for="car-situation-date">Return Date</label>
				<input
					placeholder="date"
					required
					type="date"
					class=""
					min={values.date ? values.date.toString() : tomorrow()}
					id="car-situation-date"
					bind:value={values.return_date}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
