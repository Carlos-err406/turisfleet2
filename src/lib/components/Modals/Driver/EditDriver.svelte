<script lang="ts">
	import { triggerErrorFlash } from '$lib/CustomError';
	import DropdownMultiple from '$lib/components/Inputs/DropdownMultiple.svelte';
	import IdNumberInput from '$lib/components/Inputs/IDNumberInput.svelte';
	import i18n from '$lib/i18n';
	import { driverService } from '$lib/services';
	import { loading } from '$lib/stores';
	import type { FlashStore } from '$lib/stores/flashes';
	import type { IDriver, IDriverEdit } from '$lib/types/DriverTypes';
	import { LicenseCategory } from '$lib/types/LicenseTypes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	const driver: IDriver = $modalStore[0].meta.values;
	const categories = Object.entries(LicenseCategory).map(([key, value]) => ({
		label: key,
		value
	}));

	let driverEdit: IDriverEdit = {
		...driver
	};
	console.log(driverEdit);
	const close = () => {
		modalStore.close();
	};

	const triggerInvalidID = (flashStore: FlashStore) => {
		flashStore.trigger({
			message: i18n.t('flashes.invalidID'),
			type: 'error'
		});
	};

	const validate = () => {
		const { id_number } = driverEdit;
		if (!driverService.validateIDNumber(id_number)) {
			triggerInvalidID(flashes);
			return false;
		} else return true;
	};
	const edit = async () => {
		if (validate()) {
			$loading = true;
			try {
				const updated = await driverService.editDriver(driver.id_driver, driverEdit);
				$modalStore[0].response?.(updated);
				close();
			} catch (e) {
				triggerErrorFlash(flashes, e);
			}
			$loading = false;
		}
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} on:submit={edit} on:secondary={close} {flashes}>
			<svelte:fragment slot="title">{i18n.t('title.editDriver')}</svelte:fragment>
			<div class="col-span-1">
				<label class="required" for="driver-edit-name">{i18n.t('label.name')}</label>
				<input
					placeholder={i18n.t('placeholder.name')}
					required
					type="text"
					id="driver-edit-name"
					bind:value={driverEdit.name}
				/>
			</div>
			<IdNumberInput bind:value={driverEdit.id_number} />
			<div class="col-span-1">
				<label for="driver-edit-address">{i18n.t('label.address')}</label>
				<textarea
					class="textarea px-2 h-full max-h-[157px]"
					placeholder={i18n.t('placeholder.address')}
					id="driver-edit-address"
					bind:value={driverEdit.address}
				/>
			</div>
			<DropdownMultiple options={categories} bind:values={driverEdit.license_categories} required>
				{i18n.t('label.licenseCategory')}
			</DropdownMultiple>
		</BaseForm>
	</ModalBase>
{/if}
