<script lang="ts">
	import { triggerErrorFlash } from '$lib/CustomError';
	import DropdownMultiple from '$lib/components/Inputs/DropdownMultiple.svelte';
	import IdNumberInput from '$lib/components/Inputs/IDNumberInput.svelte';
	import i18n from '$lib/i18n';
	import { driverService } from '$lib/services';
	import { loading } from '$lib/stores';
	import type { FlashStore } from '$lib/stores/flashes';
	import type { IDriverCreate } from '$lib/types/DriverTypes';
	import { LicenseCategory } from '$lib/types/LicenseTypes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	const categories = Object.entries(LicenseCategory).map(([key, value]) => ({
		label: key,
		value
	}));

	let values: IDriverCreate = {
		id_number: '',
		name: '',
		address: '',
		license_categories: [LicenseCategory.B]
	};
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
		const { id_number } = values;
		if (!driverService.validateIDNumber(id_number)) {
			triggerInvalidID(flashes);
			return false;
		}
		return true;
	};
	const create = async () => {
		if (validate()) {
			// values.license_categories = selectedCategories.map((c) => ({
			// 	license_category: c.value.license_category
			// }));
			$loading = true;
			try {
				const driver = await driverService.createDriver(values);
				$modalStore[0].response?.(driver);
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
		<BaseForm footerCols={2} on:submit={create} on:secondary={close} {flashes}>
			<svelte:fragment slot="title">{i18n.t('title.createDriver')}</svelte:fragment>
			<div class="col-span-1">
				<label class="required" for="driver-create-name">{i18n.t('label.name')}</label>
				<input
					placeholder={i18n.t('placeholder.name')}
					required
					type="text"
					id="driver-create-name"
					bind:value={values.name}
				/>
			</div>
			<IdNumberInput bind:value={values.id_number} />
			<div class="col-span-1">
				<label for="driver-create-address">{i18n.t('label.address')}</label>
				<textarea
					class="textarea px-2 max-h-[157px]"
					placeholder={i18n.t('placeholder.address')}
					id="driver-create-address"
					bind:value={values.address}
				/>
			</div>
			<DropdownMultiple options={categories} bind:values={values.license_categories} required>
				{i18n.t('label.licenseCategory')}
			</DropdownMultiple>
		</BaseForm>
	</ModalBase>
{/if}
