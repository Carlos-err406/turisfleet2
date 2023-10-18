<script context="module" lang="ts">
	export interface IRequestEdit {
		id_car: number;
		id_copilot: number;
		date: Date | string;
		id_specific_program: number;
		tourist_amount: number;
	}
</script>

<script lang="ts">
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import i18n from '$lib/i18n';
	import type { FlashStore } from '$lib/stores/flashes';
	import { today } from '$lib/utils';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	let values: IRequestEdit = $modalStore[0].meta.values;
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const edit = () => {
		validate() && console.log(values);
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.editRequest')}</svelte:fragment>
			<Dropdown placeholder={i18n.t('placeholder.copilot')} required options={[]} on:select>
				{i18n.t('label.copilot')}
			</Dropdown>
			<Dropdown placeholder={i18n.t('placeholder.car')} required options={[]} on:select>
				{i18n.t('label.car')}
			</Dropdown>
			<div>
				<label class="required" for="request-edit-start-date">{i18n.t('label.startDate')}</label>
				<input
					placeholder={i18n.t('placeholder.startDate')}
					required
					type="date"
					id="request-edit-start-date"
					bind:value={values.date}
					min={today()}
				/>
			</div>
			<div>
				<label class="required" for="request-edit-tourist-amount"
					>{i18n.t('label.touristAmount')}</label
				>
				<input
					placeholder={i18n.t('placeholder.touristAmount')}
					required
					type="number"
					min="1"
					max="100"
					id="request-edit-tourist-amount"
					bind:value={values.tourist_amount}
				/>
			</div>
			<div class="col-span-2">
				<Dropdown
					placeholder={i18n.t('placeholder.specificProgram')}
					required
					options={[]}
					on:select
				>
					{i18n.t('label.specificProgram')}
				</Dropdown>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
