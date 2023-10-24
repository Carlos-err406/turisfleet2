<script lang="ts">
	import countries from '$data/countries.json';
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import i18n from '$lib/i18n';
	import { groupService } from '$lib/services';
	import type { IGroupCreate } from '$lib/services/GroupService';
	import { loading } from '$lib/stores';
	import type { FlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	import { triggerErrorFlash } from '$lib/CustomError';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	let values: IGroupCreate = {
		country: countries[0].value,
		tourist_amount: 1
	};
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const create = async () => {
		if (validate()) {
			$loading = true;
			try {
				const group = await groupService.createGroup(values);
				$modalStore[0].response?.(group);
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
		<BaseForm footerCols={1} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.createGroup')}</svelte:fragment>
			<input type="text" hidden />
			<Dropdown
				bind:value={values.country}
				placeholder={i18n.t('placeholder.country')}
				required
				options={countries}
			>
				{i18n.t('label.country')}
			</Dropdown>
			<div>
				<label class="required" for="group-create-tourist-amount"
					>{i18n.t('label.touristAmount')}</label
				>
				<input
					placeholder={i18n.t('placeholder.touristAmount')}
					required
					type="number"
					id="group-create-tourist-amount"
					bind:value={values.tourist_amount}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
