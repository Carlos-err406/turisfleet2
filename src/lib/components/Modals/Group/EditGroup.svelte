<script context="module" lang="ts">
	import Dropdown from '../../Inputs/Dropdown.svelte';
	export interface IGroupEdit {
		country: string;
		tourist_amount: number;
	}
</script>

<script lang="ts">
	import countries from '$data/countries.json';
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: IGroupEdit = $modalStore[0].meta.values;
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const edit = () => {
		validate() && console.log(values);
	};

	function onCountrySelection({ detail }: CustomEvent): void {
		values.country = detail;
	}
	let countryLabel = countries.find(({ value }) => value === values.country)?.label;
</script>

{#if $modalStore[0]}
	<ModalBase modalW="w-modal-slim">
		<BaseForm footerCols={1} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">Edit Group</svelte:fragment>
			<Dropdown
				placeholder="country"
				required
				options={countries}
				on:select={onCountrySelection}
				bind:value={values.country}
				input={countryLabel}
			>
				Country
			</Dropdown>
			<div>
				<label data-required="true" for="group-edit-tourist-amount">Tourist amount</label>
				<input
					placeholder="tourist amount"
					required
					type="number"
					id="group-edit-tourist-amount"
					bind:value={values.tourist_amount}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
