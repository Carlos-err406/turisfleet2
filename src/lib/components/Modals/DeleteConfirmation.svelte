<script context="module" lang="ts">
	export interface IConfirmationTarget {
		target: string;
	}
</script>

<script lang="ts">
	import ModalBase from '$lib/components/Modals/ModalBase.svelte';
	import i18n from '$lib/i18n';
	import { alertTriangle } from '$lib/icons';
	import type { FlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from './BaseForm.svelte';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	let values: IConfirmationTarget = $modalStore[0].meta.values;

	const close = () => {
		modalStore.close();
	};

	const confirm = () => {
		$modalStore[0].response?.(true);
		close();
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<div class="hidden sm:block relative">
			<div class="absolute right-2">
				{@html alertTriangle}
			</div>
		</div>
		<BaseForm footerCols={1} {flashes} on:submit={confirm} on:secondary={close}>
			<svelte:fragment slot="title">
				{i18n.t('misc.areYouSure')}
			</svelte:fragment>
			<p>
				{i18n.t('misc.areYouSureYouWantTo', {
					action: i18n.t('misc.delete'),
					target: values.target
				})}
			</p>
			<svelte:fragment slot="primary">
				{i18n.t('button.yes')}
			</svelte:fragment>
			<svelte:fragment slot="secondary">
				{i18n.t('button.no')}
			</svelte:fragment>
		</BaseForm>
	</ModalBase>
{/if}
