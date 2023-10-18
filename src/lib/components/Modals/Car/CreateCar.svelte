<script lang="ts">
	import Dropdown, { type DropdownOption } from '$lib/components/Inputs/Dropdown.svelte';
	import BaseForm from '$lib/components/Modals/BaseForm.svelte';
	import i18n from '$lib/i18n';
	import { carService, driverService } from '$lib/services';
	import type { ICarCreate } from '$lib/services/CarService';
	import type { IDriver } from '$lib/services/DriverService';
	import { loading } from '$lib/stores';
	import type { FlashStore } from '$lib/stores/flashes';
	import { LicenseCategory } from '$lib/types/LicenseTypes';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { Modals } from '..';
	import ModalBase from '../ModalBase.svelte';
	import { createOneFromToast } from '$lib';
	const modalStore = getModalStore();
	const toastStore = getToastStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	const onResolve: (r: any) => void = $modalStore[0].meta.onResolve;
	let values: ICarCreate = {
		plate_number: '',
		brand: '',
		seat_amount: 4,
		available_km: 100,
		category: LicenseCategory.B
	};
	let drivers: IDriver[] = [];
	let driverOptions: DropdownOption[] = [];
	const categories = Object.entries(LicenseCategory).map(([key, value]) => ({ label: key, value }));
	const close = () => {
		modalStore.close();
	};
	onMount(async () => {
		drivers = await driverService.getAllDrivers();
		if (drivers.length === 0) {
			createOneFromToast({
				stores: { toast: toastStore, modal: modalStore },
				toastMessage: i18n.t('flashes.noDriverToAssignToCar'),
				modalToReopen: Modals.CREATE_CAR,
				creationModal: Modals.CREATE_DRIVER,
				onResolve: onResolve
			});
			close();
		}
		values.id_driver = drivers[0]?.id_driver;

		driverOptions = drivers.map(({ id_driver, name }) => ({
			label: name,
			value: id_driver
		}));
	});
	const validate = () => {
		const isValidPlateNumber = carService.isValidPlateNumber(values.plate_number);
		if (!isValidPlateNumber) {
			flashes.trigger({
				type: 'error',
				message: i18n.t('flashes.invalidPlateNumber')
			});
			return false;
		}
		return true;
	};
	const create = async () => {
		if (validate()) {
			$loading = true;
			try {
				const car = await carService.createCar(values);
				$modalStore[0].response?.(car);
				close();
			} catch (e) {}
			$loading = false;
		}
	};
	$: values.plate_number = values.plate_number.toUpperCase();
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.createCar')}</svelte:fragment>
			<div>
				<label class="required" for="car-create-plate">{i18n.t('label.plateNumber')}</label>
				<input
					placeholder={i18n.t('placeholder.plateNumber')}
					required
					type="text"
					minlength="7"
					maxlength="7"
					id="car-create-plate"
					bind:value={values.plate_number}
				/>
			</div>
			<Dropdown
				placeholder={i18n.t('placeholder.licenseCategory')}
				bind:value={values.category}
				required
				options={categories}
			>
				{i18n.t('label.licenseCategory')}
			</Dropdown>
			<div>
				<label class="required" for="car-create-brand">{i18n.t('label.brand')}</label>
				<input
					placeholder={i18n.t('placeholder.brand')}
					required
					type="text"
					id="car-create-brand"
					bind:value={values.brand}
				/>
			</div>
			<div>
				<label class="required" for="car-create-seat-amount">{i18n.t('label.seatAmount')}</label>
				<input
					placeholder={i18n.t('placeholder.seatAmount')}
					required
					type="number"
					min="0"
					max="60"
					id="car-create-seat-amount"
					bind:value={values.seat_amount}
				/>
			</div>
			<div>
				<label class="required" for="car-create-available-km">{i18n.t('label.availableKM')}</label>
				<div class="input-group flex items-center">
					<input
						placeholder={i18n.t('placeholder.availableKM')}
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
			<Dropdown
				placeholder={i18n.t('placeholder.driver')}
				required
				bind:value={values.id_driver}
				options={driverOptions}
			>
				{i18n.t('label.driver')}
			</Dropdown>
		</BaseForm>
	</ModalBase>
{/if}
