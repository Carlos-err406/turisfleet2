<script context="module" lang="ts">
	export interface RequestCreate {
		id_group: number;
		id_specific_program: number;
		start_date: Date | string;
		tourist_amount: number;
	}
</script>

<script lang="ts">
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import type flashStore from '$lib/stores/flashes';
	import { tomorrow } from '$lib/utils';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	import i18n from '$lib/i18n';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: RequestCreate = {
		id_group: NaN,
		id_specific_program: NaN,
		start_date: tomorrow(),
		tourist_amount: 1
	};
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const create = () => {
		validate() && console.log(values);
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.createRequest')}</svelte:fragment>
			<Dropdown placeholder={i18n.t('placeholder.group')} required options={[]} on:select>
				{i18n.t('label.group')}
			</Dropdown>
			<Dropdown placeholder={i18n.t('placeholder.specificProgram')} options={[]} on:select>
				{i18n.t('label.specificProgram')}
			</Dropdown>
			<div>
				<label data-required="true" for="request-create-start-date"
					>{i18n.t('label.startDate')}</label
				>
				<input
					placeholder={i18n.t('placeholder.startDate')}
					required
					type="date"
					id="request-create-start-date"
					bind:value={values.start_date}
					min={tomorrow()}
				/>
			</div>
			<div>
				<label data-required="true" for="request-create-tourist-amount"
					>{i18n.t('label.touristAmount')}</label
				>
				<input
					placeholder={i18n.t('placeholder.touristAmount')}
					required
					type="number"
					min="1"
					max="100"
					id="request-create-tourist-amount"
					bind:value={values.tourist_amount}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
