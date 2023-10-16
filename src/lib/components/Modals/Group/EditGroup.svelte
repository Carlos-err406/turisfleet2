<script context="module" lang="ts">
	import Dropdown from '../../Inputs/Dropdown.svelte';
	export interface IGroupEdit {
		country: string;
		tourist_amount: number;
	}
</script>

<script lang="ts">
	import countries from '$data/countries.json';
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	import i18n from '$lib/i18n';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: IGroupEdit = $modalStore[0].meta.values;
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const edit = () => {
		validate() && console.log(values);
	};

	function onCountrySelection({ detail }: CustomEvent): void {
		values.country = detail;
	}
	let countryLabel = countries.find(({ value }) => value === values.country)?.label;
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.editGroup')}</svelte:fragment>
			<Dropdown
				placeholder={i18n.t('placeholder.country')}
				required
				options={countries}
				on:select={onCountrySelection}
				bind:value={values.country}
				input={countryLabel}
			>
				{i18n.t('label.country')}
			</Dropdown>
			<div>
				<label data-required="true" for="group-edit-tourist-amount"
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
