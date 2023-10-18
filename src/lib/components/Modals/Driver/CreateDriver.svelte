<script lang="ts">
	import type { DropdownOption } from '$lib/components/Inputs/Dropdown.svelte';
	import DropdownMultiple from '$lib/components/Inputs/DropdownMultiple.svelte';
	import IdNumberInput from '$lib/components/Inputs/IDNumberInput.svelte';
	import i18n from '$lib/i18n';
	import { driverService } from '$lib/services';
	import type { IDriverCreate } from '$lib/services/DriverService';
	import { loading } from '$lib/stores';
	import type { FlashStore } from '$lib/stores/flashes';
	import { LicenseCategory } from '$lib/types/LicenseTypes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import dayjs from 'dayjs';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	const categories = Object.entries(LicenseCategory).map(([key, value]) => ({
		label: key,
		value: { license_category: value } //TODO remove this when api updates it
	}));

	let values: IDriverCreate = {
		id_number: '',
		name: '',
		address: '',
		license_categories: []
	};
	const close = () => {
		modalStore.close();
	};

	const triggerInvalidID = () => {
		flashes.trigger({
			message: i18n.t('flashes.invalidID'),
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
		if(month<1 || month>12) isValid = false;
		else if (day > 31 || day < 1) isValid = false;
		else if (month == 2 && day > 29) isValid = false;
		else if ([1, 3, 5, 7, 9, 10, 12].includes(month) && day > 31) isValid = false;
		else if ([4, 6, 8, 11].includes(month) && day > 30) isValid = false;
		if (!isValid || !date.isValid()) {
			triggerInvalidID();
		}
		console.log(isValid)
		return isValid;
	};
	const create = async () => {
		if (validate()) {
			values.license_categories = selectedCategories.map((c) => ({
				license_category: c.value.license_category
			}));
			$loading = true;
			try {
				const driver = await driverService.createDriver(values);
				$modalStore[0].response?.(driver);
				close();
			} catch (e) {}
			$loading = false;
		}
	};
	let selectedCategories: DropdownOption[] = [
		{ label: LicenseCategory.B, value: { license_category: LicenseCategory.B } }
	];
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
			<DropdownMultiple options={categories} bind:selectedOptions={selectedCategories} required>
				{i18n.t('label.licenseCategory')}
			</DropdownMultiple>
		</BaseForm>
	</ModalBase>
{/if}
