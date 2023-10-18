<script lang="ts">
	//FIXME
	import { createOneFromToast } from '$lib';
	import Dropdown, { type DropdownOption } from '$lib/components/Inputs/Dropdown.svelte';
	import ModalBase from '$lib/components/Modals/ModalBase.svelte';
	import i18n from '$lib/i18n';
	import { driverService, situationService } from '$lib/services';
	import type { IDriver } from '$lib/services/DriverService';
	import type { IDriverSituation, ISituation } from '$lib/services/SituationService';
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
	let values: IDriverSituation = $modalStore[0].meta.values;

	let situations: ISituation[] = [];
	let drivers: IDriver[] = [];
	let driverOptions: DropdownOption[] = [];
	let situationOptions: DropdownOption[] = [];
	let selectedDriver: number;

	const close = () => {
		modalStore.close();
	};
	onMount(async () => {
		$loading = true;

		[drivers, situations] = await Promise.all([
			await driverService.getAllDrivers(),
			await situationService.getAllSituations()
		]);
		$loading = false;
		if (situations.length === 0) {
			createOneFromToast({
				stores: { toast: toastStore, modal: modalStore },
				toastMessage: i18n.t('flashes.noSituationTypesToEditSituations'),
				modalToReopen: Modals.EDIT_SITUATION_DRIVER,
				creationModal: Modals.CREATE_SITUATION,
				onResolve
			});
			close();
		} else if (drivers.length === 0) {
			createOneFromToast({
				stores: { toast: toastStore, modal: modalStore },
				toastMessage: i18n.t('flashes.noDriversToEditSituations'),
				modalToReopen: Modals.EDIT_SITUATION_DRIVER,
				creationModal: Modals.CREATE_DRIVER,
				onResolve
			});
			close();
		}
		values.situation = situations[0];
		selectedDriver = drivers[0]?.id_driver;
		driverOptions = drivers.map(({ id_driver, name }) => ({ label: name, value: id_driver }));
		situationOptions = situations.map(({ id_situation, situation_name }) => ({
			label: situation_name,
			value: id_situation
		}));
	});

	const validate = () => {
		return true;
	};
	const edit = () => {
		if (validate()) {
			$loading = true;
			try {
				const driver = situationService.editDriverSituation(
					selectedDriver,
					values.situation.id_situation,
					values
				);
				$modalStore[0].response?.(driver);
				close();
			} catch (e) {}
			$loading = false;
		}
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.editDriverSituation')}</svelte:fragment>

			<Dropdown
				bind:value={selectedDriver}
				placeholder={i18n.t('placeholder.driver')}
				required
				options={driverOptions}
			>
				{i18n.t('label.driver')}
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
				<label class="required" for="driver-situation-date">
					{i18n.t('label.date')}
				</label>
				<input
					required
					type="date"
					min={tomorrow()}
					max={values.return_date?.toString() ?? undefined}
					id="driver-situation-date"
					bind:value={values.date}
				/>
			</div>
			<div>
				<label class="required" for="driver-situation-date">
					{i18n.t('label.returnDate')}
				</label>
				<input
					required
					type="date"
					class=""
					min={values.date ? values.date.toString() : tomorrow()}
					id="driver-situation-date"
					bind:value={values.return_date}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
