<script context="module" lang="ts">
	import Dropdown from './../Dropdown.svelte';
	export interface GroupCreate {
		country: string;
		tourist_amount: number;
	}
</script>

<script lang="ts">
	import countries from '$data/countries.json';
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore, type AutocompleteOption } from '@skeletonlabs/skeleton';
	import ModalBase from './../Layout/ModalBase.svelte';
	import BaseForm from './BaseForm.svelte';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: GroupCreate = {
		country: countries[0].value,
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

	function onCountrySelection({ detail }: CustomEvent): void {
		values.country = detail;
	}
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">Create Group</svelte:fragment>
			<Dropdown placeholder="country" required options={countries} on:select={onCountrySelection}
				>Country</Dropdown
			>
			<div>
				<label for="group-create-tourist-amount">Tourist amount</label>
				<input
					placeholder="tourist amount"
					required
					type="number"
					id="group-create-tourist-amount"
					bind:value={values.tourist_amount}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
