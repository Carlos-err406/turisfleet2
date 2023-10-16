<script context="module" lang="ts">
	export interface IProgramCreate {
		name: string;
	}
</script>

<script lang="ts">
	import ModalBase from '$lib/components/Modals/ModalBase.svelte';
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import i18n from '$lib/i18n';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: IProgramCreate = {
		name: ''
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
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={1} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.createProgram')}</svelte:fragment>
			<div>
				<label for="program-create-name">{i18n.t('label.programName')}</label>
				<input
					placeholder={i18n.t('placeholder.programName')}
					required
					type="text"
					id="program-create-name"
					bind:value={values.name}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
