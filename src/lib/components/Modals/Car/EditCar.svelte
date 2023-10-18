<script lang="ts">
	import Dropdown, { type DropdownOption } from '$lib/components/Inputs/Dropdown.svelte';
	import BaseForm from '$lib/components/Modals/BaseForm.svelte';
	import i18n from '$lib/i18n';
	import { driverService } from '$lib/services';
	import type { ICarEdit } from '$lib/services/CarService';
	import type { IDriver } from '$lib/services/DriverService';
	import type { FlashStore } from '$lib/stores/flashes';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { Modals } from '..';
	import ModalBase from '../ModalBase.svelte';
	import { createOneFromToast } from '$lib';
	const modalStore = getModalStore();
	const toastStore = getToastStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	const onResolve: (r: any) => void = $modalStore[0].meta.onResolve;
	let values: ICarEdit = $modalStore[0].meta.values;
	const close = () => {
		modalStore.close();
	};
	let drivers: IDriver[] = [];
	let driverOptions: DropdownOption[] = [];
	onMount(async () => {
		drivers = await driverService.getAllDrivers();
		if (drivers.length === 0) {
			createOneFromToast({
				stores: { toast: toastStore, modal: modalStore },
				toastMessage: i18n.t('flashes.noDriverToAssignToCar'),
				modalToReopen: Modals.EDIT_CAR,
				creationModal: Modals.CREATE_DRIVER,
				meta: $modalStore[0].meta,
				onResolve
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
		return true;
	};
	const edit = () => {
		if (validate()) {
			//TODO
			$modalStore[0].response?.(values);
			close();
		}
	};

	const onDriverSelection = ({ detail }: CustomEvent) => {
		values.id_driver = detail;
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={1} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.editCar')}</svelte:fragment>
			<Dropdown
				bind:value={values.id_driver}
				placeholder={i18n.t('placeholder.driver')}
				required
				options={driverOptions}
				on:select={onDriverSelection}
			>
				{i18n.t('label.driver')}
			</Dropdown>
		</BaseForm>
	</ModalBase>
{/if}
