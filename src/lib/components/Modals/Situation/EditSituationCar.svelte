<script lang="ts">
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import ModalBase from '$lib/components/Modals/ModalBase.svelte';
	import i18n from '$lib/i18n';
	import type { ICarSituation } from '$lib/services/SituationService';
	import type { FlashStore } from '$lib/stores/flashes';
	import { tomorrow } from '$lib/utils';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	let values: ICarSituation = $modalStore[0].meta.values;

	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const edit = () => {
		//TODO
		validate() && console.log(values);
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.editCarSituation')}</svelte:fragment>
			<Dropdown
				bind:value={values.car.id_car}
				placeholder={i18n.t('placeholder.car')}
				required
				options={[]}
			>
				{i18n.t('label.car')}
			</Dropdown>
			<Dropdown
				bind:value={values.situation.id_situation}
				placeholder={i18n.t('placeholder.situation')}
				required
				options={[]}
			>
				{i18n.t('label.situation')}
			</Dropdown>
			<div>
				<label class="required" for="car-situation-date">
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
				<label class="required" for="car-situation-date">
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
