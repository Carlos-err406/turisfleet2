<script lang="ts">
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import countries from '$data/countries.json';
	import i18n from '$lib/i18n';
	import { groupService } from '$lib/services';
	import type { IGroup } from '$lib/services/GroupService';
	import type { FlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	import { loading } from '$lib/stores';
	import { triggerErrorFlash } from '$lib/CustomError';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	let values: IGroup = $modalStore[0].meta.values;
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const edit = async () => {
		if (validate()) {
			$loading = true;
			try {
				const group = await groupService.editGroup(values.id_group, values);
				$modalStore[0].response?.(group);
				close();
			} catch (e) {
				triggerErrorFlash(flashes, e);
			}
			$loading = false;
		}
	};

	function onCountrySelection({ detail }: CustomEvent): void {
		values.country = detail.label;
	}
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={1} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.editGroup')}</svelte:fragment>
			<Dropdown
				placeholder={i18n.t('placeholder.country')}
				required
				options={countries}
				on:select={onCountrySelection}
				bind:value={values.country}
			>
				{i18n.t('label.country')}
			</Dropdown>
			<div>
				<label class="required" for="group-edit-tourist-amount"
					>{i18n.t('label.touristAmount')}</label
				>
				<input
					placeholder={i18n.t('placeholder.touristAmount')}
					required
					type="number"
					id="group-edit-tourist-amount"
					bind:value={values.tourist_amount}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
