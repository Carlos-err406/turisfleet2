<script context="module" lang="ts">
	export interface ICarSituationCreate {
		car_id_car: number;
		situation_id_situation: number;
		date: Date | string;
		return_date: Date | null;
	}
</script>

<script lang="ts">
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import ModalBase from '$lib/components/Modals/ModalBase.svelte';
	import i18n from '$lib/i18n';
	import type flashStore from '$lib/stores/flashes';
	import { tomorrow } from '$lib/utils';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: ICarSituationCreate = {
		car_id_car: 0,
		situation_id_situation: 0,
		date: '',
		return_date: null
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

	const onSituationSelection = ({ detail }: CustomEvent) => {
		values.situation_id_situation = detail;
	};
	const onCarSelection = ({ detail }: CustomEvent) => {
		values.car_id_car = detail;
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.createCarSituation')}</svelte:fragment>
			<Dropdown
				placeholder={i18n.t('placeholder.car')}
				required
				options={[]}
				on:select={onCarSelection}
			>
				{i18n.t('label.car')}
			</Dropdown>
			<Dropdown
				placeholder={i18n.t('placeholder.situation')}
				required
				options={[]}
				on:select={onSituationSelection}
			>
				{i18n.t('label.situation')}
			</Dropdown>
			<div>
				<label data-required="true" for="car-situation-date">
					{i18n.t('label.date')}
				</label>
				<input
					required
					type="date"
					min={tomorrow()}
					max={values.return_date?.toString() ?? undefined}
					id="car-situation-date"
					bind:value={values.date}
				/>
			</div>
			<div>
				<label data-required="true" for="car-situation-date">
					{i18n.t('label.returnDate')}
				</label>
				<input
					required
					type="date"
					class=""
					min={values.date ? values.date.toString() : tomorrow()}
					id="car-situation-date"
					bind:value={values.return_date}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
