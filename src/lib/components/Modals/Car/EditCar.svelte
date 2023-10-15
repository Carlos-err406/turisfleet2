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
	<ModalBase modalW="w-modal-slim">
		<BaseForm footerCols={1} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">Edit Car</svelte:fragment>
			<Dropdown placeholder="driver" required options={[]} on:select={onDriverSelection}>
				Driver
			</Dropdown>
		</BaseForm>
	</ModalBase>
{/if}
