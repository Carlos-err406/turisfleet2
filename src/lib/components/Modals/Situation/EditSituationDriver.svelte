<script context="module" lang="ts">
	export interface IDriverSituationEdit {
		driver_id_driver: number;
		situation_id_situation: number;
		date: Date | string;
		return_date: Date | null;
	}
</script>

<script lang="ts">
	import type flashStore from '$lib/stores/flashes';
	import { tomorrow } from '$lib/utils';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import ModalBase from '$lib/components/Modals/ModalBase.svelte';
	import BaseForm from '../BaseForm.svelte';
	import i18n from '$lib/i18n';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: IDriverSituationEdit = $modalStore[0].meta.values;

	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const edit = () => {
		validate() && console.log(values);
	};

	const onSituationSelection = ({ detail }: CustomEvent) => {
		values.situation_id_situation = detail;
	};
	const onDriverSelection = ({ detail }: CustomEvent) => {
		values.driver_id_driver = detail;
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.editDriverSituation')}</svelte:fragment>
			<Dropdown
				placeholder={i18n.t('placeholder.driver')}
				required
				options={[]}
				on:select={onDriverSelection}
			>
				{i18n.t('label.driver')}
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
				<label data-required="true" for="driver-situation-date">
					{i18n.t('label.date')}
				</label>
				<input
					required
					type="date"
					min={tomorrow()}
					max={values.return_date?.toString() ?? undefined}
					id="driver-situation-date"
					bind:value={values.date}
				/>
			</div>
			<div>
				<label data-required="true" for="driver-situation-date">
					{i18n.t('label.returnDate')}
				</label>
				<input
					required
					type="date"
					class=""
					min={values.date ? values.date.toString() : tomorrow()}
					id="driver-situation-date"
					bind:value={values.return_date}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
