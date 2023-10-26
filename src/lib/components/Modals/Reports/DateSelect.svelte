<script lang="ts">
	import i18n from '$lib/i18n';
	import type { FlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { Dayjs } from 'dayjs';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	let value: Dayjs;
	const close = () => {
		modalStore.close();
	};

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
			<svelte:fragment slot="title">{i18n.t('label.reports.requestOnDate')}</svelte:fragment>
			<div>
				<label class="required" for="report-select-date-input">{i18n.t('label.selectADate')}</label>
				<input required type="date" id="report-select-date-input" bind:value />
			</div>
		</BaseForm>
	</ModalBase>
{/if}
