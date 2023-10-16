<script context="module" lang="ts">
	export interface ICarEdit {
		id_driver: number;
	}
</script>

<script lang="ts">
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import BaseForm from '$lib/components/Modals/BaseForm.svelte';
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ModalBase from '../ModalBase.svelte';
	import i18n from '$lib/i18n';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: ICarEdit = $modalStore[0].meta.values;
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const edit = () => {
		validate() && console.log(values);
	};

	const onDriverSelection = ({ detail }: CustomEvent) => {
		values.id_driver = detail;
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={1} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.editCar')}</svelte:fragment>
			<Dropdown
				placeholder={i18n.t('placeholder.driver')}
				required
				options={[]}
				on:select={onDriverSelection}
			>
				{i18n.t('label.driver')}
			</Dropdown>
		</BaseForm>
	</ModalBase>
{/if}
