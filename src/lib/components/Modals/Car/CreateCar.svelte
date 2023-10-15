<script context="module" lang="ts">
	export interface ICarCreate {
		plate_number: string;
		brand: string;
		seat_amount: number;
		available_km: number;
		id_driver: number;
		id_category: LicenseCategory;
	}
</script>

<script lang="ts">
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import BaseForm from '$lib/components/Modals/BaseForm.svelte';
	import type flashStore from '$lib/stores/flashes';
	import { LicenseCategory } from '$lib/types/LicenceTypes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ModalBase from '../ModalBase.svelte';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: ICarCreate = {
		plate_number: '',
		brand: '',
		seat_amount: 4,
		available_km: 100,
		id_driver: NaN,
		id_category: LicenseCategory.B
	};
	const categories = Object.entries(LicenseCategory).map(([key, value]) => ({ label: key, value }));
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const create = () => {
		validate() && console.log(values);
	};

	const onLicenseSelection = ({ detail }: CustomEvent) => {
		values.id_category = detail;
	};
	const onDriverSelection = ({ detail }: CustomEvent) => {
		values.id_driver = detail;
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">Create Car</svelte:fragment>
			<div>
				<label data-required="true" for="car-create-plate">Plate number</label>
				<input
					placeholder="plate number"
					required
					type="text"
					id="car-create-plate"
					bind:value={values.plate_number}
				/>
			</div>
			<Dropdown
				placeholder="licence"
				input={LicenseCategory.B}
				required
				options={categories}
				on:select={onLicenseSelection}>Licence</Dropdown
			>
			<div>
				<label data-required="true" for="car-create-brand">Brand</label>
				<input
					placeholder="brand"
					required
					type="text"
					id="car-create-brand"
					bind:value={values.brand}
				/>
			</div>
			<div>
				<label data-required="true" for="car-create-seat-amount">Seat amount</label>
				<input
					placeholder="seat amount"
					required
					type="number"
					min="0"
					max="60"
					id="car-create-seat-amount"
					bind:value={values.seat_amount}
				/>
			</div>
			<div>
				<label data-required="true" for="car-create-available-km">Available KM</label>
				<div class="input-group flex items-center">
					<input
						placeholder="available km"
						required
						type="number"
						id="car-create-available-km"
						bind:value={values.available_km}
						min="0"
						max="600"
					/>
					<span class=" px-3">KM</span>
				</div>
			</div>
			<Dropdown placeholder="driver" required options={[]} on:select={onDriverSelection}>
				Driver
			</Dropdown>
		</BaseForm>
	</ModalBase>
{/if}
