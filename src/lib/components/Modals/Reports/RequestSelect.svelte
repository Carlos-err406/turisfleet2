<script lang="ts">
	import i18n from '$lib/i18n';
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	import type { DropdownOptions } from '$lib/components/Inputs/Dropdown.svelte';
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let value: any; //TODO request id
	const close = () => {
		modalStore.close();
	};
	const requests: DropdownOptions[] = [];
	const validate = () => {
		flashes.reset();
		return true;
	};
	const select = () => {
		if (validate()) {
			$modalStore[0].response?.(value);
			close();
		}
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={1} {flashes} on:submit={select} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('label.reports.requestModifications')}</svelte:fragment>
			<Dropdown options={requests} placeholder="request" required>Select a request</Dropdown>
		</BaseForm>
	</ModalBase>
{/if}
