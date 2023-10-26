<script lang="ts">
	import { triggerErrorFlash } from '$lib/CustomError';
	import Dropdown, { type DropdownOption } from '$lib/components/Inputs/Dropdown.svelte';
	import ModalBase from '$lib/components/Modals/ModalBase.svelte';
	import i18n from '$lib/i18n';
	import type { ICar } from '$lib/services/CarService';
	import type { FlashStore } from '$lib/stores/flashes';
	import { tomorrow } from '$lib/utils';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import BaseForm from '../BaseForm.svelte';
	import type { CarAndDate } from './types';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	let cars: ICar[] = $modalStore[0].meta.cars;
	let values: CarAndDate = {
		car: cars[0],
		date: tomorrow()
	};
	let selectedCar: number = cars[0]?.id_car;
	let carOptions: DropdownOption[] = cars.map(({ id_car, brand, plate_number }) => ({
		label: `[${plate_number}] ${brand}`,
		value: id_car
	}));

	const close = () => {
		modalStore.close();
	};
	onMount(async () => {});
	const validate = () => {
		const car = cars.find((car) => car.id_car === selectedCar);
		if (!car) {
			triggerErrorFlash(flashes, i18n.t('error.00060'));
			return false;
		} else {
			values.car = car;
		}
		return true;
	};

	const select = async () => {
		if (validate()) {
			$modalStore[0].response?.(values);
			close();
		}
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={1} {flashes} on:submit={select} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.fillDataForReport')}</svelte:fragment>
			<Dropdown
				bind:value={selectedCar}
				placeholder={i18n.t('placeholder.car')}
				required
				options={carOptions}
				on:select
			>
				{i18n.t('label.car')}
			</Dropdown>
			<div>
				<label class="required" for="report-select-date-input">{i18n.t('label.selectADate')}</label>
				<input required type="date" id="report-select-date-input" bind:value={values.date} />
			</div>
		</BaseForm>
	</ModalBase>
{/if}
