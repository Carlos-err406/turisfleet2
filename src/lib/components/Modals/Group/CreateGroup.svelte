<script context="module" lang="ts">
	export interface IGroupCreate {
		country: string;
		tourist_amount: number;
	}
</script>

<script lang="ts">
	import countries from '$data/countries.json';
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	import i18n from '$lib/i18n';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
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
	const create = () => {
		validate() && console.log(values);
	};

	function onCountrySelection({ detail }: CustomEvent): void {
		values.country = detail;
	}
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.createGroup')}</svelte:fragment>
			<input type="text" hidden />
			<Dropdown
				event="click"
				placeholder={i18n.t('placeholder.country')}
				required
				options={countries}
				on:select={onCountrySelection}
			>
				{i18n.t('label.country')}
			</Dropdown>
			<div>
				<label data-required="true" for="group-create-tourist-amount"
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
