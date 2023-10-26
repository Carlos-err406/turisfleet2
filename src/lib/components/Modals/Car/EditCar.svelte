<script lang="ts">
	import { createOneFromToast } from '$lib';
	import { triggerErrorFlash, triggerErrorToast } from '$lib/CustomError';
	import Dropdown, { type DropdownOption } from '$lib/components/Inputs/Dropdown.svelte';
	import BaseForm from '$lib/components/Modals/BaseForm.svelte';
	import i18n from '$lib/i18n';
	import { carService, driverService } from '$lib/services';
	import type { ICar, ICarEdit } from '$lib/services/CarService';
	import type { IDriver } from '$lib/services/DriverService';
	import { loading } from '$lib/stores';
	import type { FlashStore } from '$lib/stores/flashes';
	import { LicenseCategory } from '$lib/types/LicenseTypes';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { Modals } from '..';
	import ModalBase from '../ModalBase.svelte';
	const modalStore = getModalStore();
	const toastStore = getToastStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	const car: ICar = $modalStore[0].meta.values;
	const onResolve: (r: any) => void = $modalStore[0].meta.onResolve;
	let values: ICarEdit = {
		...car
	};
	let drivers: IDriver[] = [];
	let driverOptions: DropdownOption[] = [];
	const categories = Object.entries(LicenseCategory).map(([key, value]) => ({ label: key, value }));
	const close = () => {
		modalStore.close();
	};
	onMount(async () => {
		$loading = true;
		try {
			drivers = await driverService.getAllDrivers();
		} catch (e) {
			triggerErrorToast(toastStore, e);
			close();
			return;
		}
		$loading = false;
		handleCategoryChange();
		if (drivers.length === 0) {
			createOneFromToast({
				stores: { toast: toastStore, modal: modalStore },
				toastMessage: i18n.t('flashes.noDriverToAssignToCar'),
				modalToReopen: Modals.EDIT_CAR,
				creationModal: Modals.EDIT_DRIVER,
				onResolve: onResolve
			});
			close();
		}
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
	const edit = async () => {
		if (validate()) {
			$loading = true;
			try {
				const updated = await carService.editCar(car.id_car, values);
				$modalStore[0].response?.(updated);
				close();
			} catch (e) {
				triggerErrorFlash(flashes, e);
			}
			$loading = false;
		}
	};
	$: values.plate_number = values.plate_number.toUpperCase();
	const handleCategoryChange = () => {
		driverOptions = drivers
			.filter((driver) => driver.license_categories.includes(values.category))
			.map(({ name, id_driver, license_categories }) => ({
				label: `${name} [${license_categories.join(', ')}]`,
				value: id_driver
			}));
		values.id_driver = driverOptions[0]?.value;
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.editCar')}</svelte:fragment>
			<div>
				<label class="required" for="car-edit-plate">{i18n.t('label.plateNumber')}</label>
				<input
					placeholder={i18n.t('placeholder.plateNumber')}
					required
					type="text"
					id="car-edit-plate"
					bind:value={values.plate_number}
					minlength="7"
					maxlength="7"
				/>
			</div>
			<Dropdown
				on:change={handleCategoryChange}
				placeholder={i18n.t('placeholder.licenseCategory')}
				bind:value={values.category}
				required
				options={categories}
			>
				{i18n.t('label.licenseCategory')}
			</Dropdown>
			<div>
				<label class="required" for="car-edit-brand">{i18n.t('label.brand')}</label>
				<input
					placeholder={i18n.t('placeholder.brand')}
					required
					type="text"
					id="car-edit-brand"
					bind:value={values.brand}
				/>
			</div>
			<div>
				<label class="required" for="car-edit-seat-amount">{i18n.t('label.seatAmount')}</label>
				<input
					placeholder={i18n.t('placeholder.seatAmount')}
					required
					type="number"
					min="0"
					max="200"
					id="car-edit-seat-amount"
					bind:value={values.seat_amount}
				/>
			</div>
			<div>
				<label class="required" for="car-edit-available-km">{i18n.t('label.availableKM')}</label>
				<div class="input-group flex items-center">
					<input
						placeholder={i18n.t('placeholder.availableKM')}
						required
						type="number"
						id="car-edit-available-km"
						bind:value={values.available_km}
						min="0"
						max="3000"
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
