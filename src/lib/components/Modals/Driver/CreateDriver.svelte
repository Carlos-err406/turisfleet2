<script context="module" lang="ts">
	export interface DriverCreate {
		id_number: string;
		name: string;
		address: string;
	}
</script>

<script lang="ts">
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import dayjs from 'dayjs';
	import ModalBase from '../ModalBase.svelte';
	import BaseForm from '../BaseForm.svelte';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	console.log($flashes);
	let values: DriverCreate = {
		id_number: '',
		name: '',
		address: ''
	};
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
		const { id_number } = values;
		if (id_number.length !== 11) {
			triggerInvalidID();
			return false;
		}

		const [year, month, day] = [
			parseInt(id_number.slice(0, 2)),
			parseInt(id_number.slice(2, 4)),
			parseInt(id_number.slice(4, 6))
		];

		const date = dayjs(`${month}-${day}-${year}`);
		let isValid = true;
		if (day > 31) isValid = false;
		else if (month == 2 && day > 29) isValid = false;
		else if ([1, 3, 5, 7, 9, 10, 12].includes(month) && day > 31) isValid = false;
		else if ([4, 6, 8, 11].includes(month) && day > 30) isValid = false;
		if (!isValid || !date.isValid()) {
			triggerInvalidID();
		}
		return isValid;
	};
	const create = () => {
		validate() && console.log(values);
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">Create Driver</svelte:fragment>
			<div>
				<label for="driver-create-name">Name</label>
				<input
					placeholder="name"
					required
					type="text"
					id="driver-create-name"
					bind:value={values.name}
				/>
			</div>
			<div>
				<label for="driver-create-id-number">ID number</label>
				<input
					placeholder="id number"
					required
					type="string"
					id="driver-create-id-number"
					bind:value={values.id_number}
				/>
			</div>
			<div>
				<label for="driver-create-address">Address</label>
				<input
					placeholder="address"
					type="password"
					id="driver-create-address"
					bind:value={values.address}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
