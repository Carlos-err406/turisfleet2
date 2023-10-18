<script lang="ts">
	import { createOneFromToast } from '$lib';
	import Dropdown, { type DropdownOption } from '$lib/components/Inputs/Dropdown.svelte';
	import ModalBase from '$lib/components/Modals/ModalBase.svelte';
	import i18n from '$lib/i18n';
	import { carService, situationService } from '$lib/services';
	import type { ICar } from '$lib/services/CarService';
	import type { ICarSituationCreate, ISituation } from '$lib/services/SituationService';
	import { loading } from '$lib/stores';
	import type { FlashStore } from '$lib/stores/flashes';
	import { tomorrow } from '$lib/utils';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { Modals } from '..';
	import BaseForm from '../BaseForm.svelte';
	const modalStore = getModalStore();
	const toastStore = getToastStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	const onResolve: (r: any) => void = $modalStore[0].meta.onResolve;
	console.log(onResolve)
	let values: ICarSituationCreate = {
		id_situation: 0,
		date: tomorrow(),
		return_date: undefined
	};
	let cars: ICar[] = [];
	let situations: ISituation[] = [];
	let carOptions: DropdownOption[] = [];
	let situationOptions: DropdownOption[] = [];
	let selectedCar: number;
	const close = () => modalStore.close();

	onMount(async () => {
		$loading = true;
		[cars, situations] = await Promise.all([
			carService.getAllCars(),
			situationService.getAllSituations()
		]);
		situations = situations.filter((s) => s.situation_type !== 'driver');
		$loading = false;
		if (situations.length === 0) {
			createOneFromToast({
				stores: { toast: toastStore, modal: modalStore },
				toastMessage: i18n.t('flashes.noSituationTypesToCreateSituations'),
				modalToReopen: Modals.CREATE_SITUATION_CAR,
				creationModal: Modals.CREATE_SITUATION,
				onResolve: onResolve
			});
			close();
		} else if (cars.length === 0) {
			createOneFromToast({
				stores: { toast: toastStore, modal: modalStore },
				toastMessage: i18n.t('flashes.noCarsToCreateSituations'),
				modalToReopen: Modals.CREATE_SITUATION_CAR,
				creationModal: Modals.CREATE_CAR,
				onResolve: onResolve
			});
			close();
		}
		values.id_situation = situations[0]?.id_situation;
		selectedCar = cars[0]?.id_car;

		carOptions = cars.map(({ id_car, plate_number, brand }) => ({
			label: `[${plate_number}] ${brand}`,
			value: id_car
		}));

		situationOptions = situations.map(({ id_situation, situation_name }) => ({
			label: situation_name,
			value: id_situation
		}));
	});

	const validate = () => {
		return true;
	};

	const create = async () => {
		if (validate()) {
			$loading = true;
			try {
				console.log('creating...');
				const carSituation = await situationService.createCarSituation(selectedCar, values);
				console.log('created...sending modal response');
				$modalStore[0].response?.(carSituation);
				console.log('closing...');
				close();
			} catch (e) {}
			$loading = false;
		}
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.createCarSituation')}</svelte:fragment>

			<Dropdown
				bind:value={selectedCar}
				placeholder={i18n.t('placeholder.car')}
				required
				options={carOptions}
			>
				{i18n.t('label.car')}
			</Dropdown>

			<Dropdown
				placeholder={i18n.t('placeholder.situation')}
				required
				bind:value={values.id_situation}
				options={situationOptions}
			>
				{i18n.t('label.situation')}
			</Dropdown>
			<div>
				<label class="required" for="car-situation-date">
					{i18n.t('label.date')}
				</label>
				<input
					required
					type="date"
					min={tomorrow()}
					max={values.return_date?.toString() ?? undefined}
					id="car-situation-date"
					bind:value={values.date}
				/>
			</div>
			<div>
				<label class="required" for="car-situation-date">
					{i18n.t('label.returnDate')}
				</label>
				<input
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
