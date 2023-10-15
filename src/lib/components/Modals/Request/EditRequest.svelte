<script context="module" lang="ts">
	export interface IRequestEdit {
		id_car: number;
		id_copilot: number;
		date: Date | string;
		id_specific_program: number;
		tourist_amount: number;
	}
</script>

<script lang="ts">
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import type flashStore from '$lib/stores/flashes';
	import { today, tomorrow } from '$lib/utils';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: IRequestEdit = $modalStore[0].meta.values;
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
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">Edit Request</svelte:fragment>
			<Dropdown placeholder="copilot" required options={[]} on:select>Copilot</Dropdown>
			<Dropdown placeholder="car" required options={[]} on:select>Car</Dropdown>
			<div>
				<label data-required="true" for="request-edit-start-date">Date</label>
				<input
					placeholder="start date"
					required
					type="date"
					id="request-edit-start-date"
					bind:value={values.date}
					min={today()}
				/>
			</div>
			<div>
				<label data-required="true" for="request-edit-tourist-amount">Tourist amount</label>
				<input
					placeholder="tourist amount"
					required
					type="number"
					min="1"
					max="100"
					id="request-edit-tourist-amount"
					bind:value={values.tourist_amount}
				/>
			</div>
			<div class="col-span-2">
				<Dropdown placeholder="specific program" required options={[]} on:select>
					Specific program
				</Dropdown>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
