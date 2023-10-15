<script context="module" lang="ts">
	export interface IDriverEdit {
		id_number: string;
		name: string;
		address: string;
		id_categories: LicenseCategory[];
	}
</script>

<script lang="ts">
	import IdNumberInput from '$lib/components/Inputs/IDNumberInput.svelte';
	import SelectMultipleInput from '$lib/components/Inputs/SelectMultipleInput.svelte';
	import type flashStore from '$lib/stores/flashes';
	import { LicenseCategory } from '$lib/types/LicenceTypes';
	import { validateID } from '$lib/utils';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	const values: IDriverEdit = $modalStore[0].meta.values;
	const categories = Object.entries(LicenseCategory).map(([key, value]) => ({ label: key, value }));

	const close = () => {
		modalStore.close();
	};

	const triggerInvalidID = () => {
		flashes.trigger({
			message: 'Invalid Id number',
			type: 'error'
		});
	};
	const validate = () => {
		return validateID(values.id_number, triggerInvalidID);
	};
	const edit = () => {
		validate() && console.log(values);
	};
</script>

{#if $modalStore[0]}
	<ModalBase modalW="w-modal">
		<BaseForm footerCols={2} on:submit={edit} on:secondary={close} {flashes}>
			<svelte:fragment slot="title">Edit Driver</svelte:fragment>
			<div>
				<label data-required="true" for="driver-edit-name">Name</label>
				<input
					placeholder="name"
					required
					type="text"
					id="driver-edit-name"
					bind:value={values.name}
				/>
			</div>
			<IdNumberInput bind:value={values.id_number} />
			<SelectMultipleInput options={categories} required bind:value={values.id_categories}>
				Licence categories
			</SelectMultipleInput>
			<div class="col-span-1">
				<label for="driver-edit-address">Address</label>
				<textarea
					class="textarea px-2 max-h-48"
					placeholder="address"
					id="driver-edit-address"
					bind:value={values.address}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
