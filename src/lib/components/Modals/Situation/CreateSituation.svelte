<script context="module" lang="ts">
	export interface ISituationCreate {
		situation_name: string;
		situation_type: 'C' | 'D' | 'CD';
	}
</script>

<script lang="ts">
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ModalBase from '../ModalBase.svelte';
	import BaseForm from '../BaseForm.svelte';
	import i18n from '$lib/i18n';
	import { situations } from './situations';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: ISituationCreate = {
		situation_name: '',
		situation_type: 'CD'
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
		values.situation_type = detail;
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={1} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.createSituation')}</svelte:fragment>
			<div>
				<label data-required="true" for="situation-create-name">
					{i18n.t('label.situationName')}
				</label>
				<input
					placeholder={i18n.t('placeholder.situationName')}
					required
					type="text"
					id="situation-create-name"
					bind:value={values.situation_name}
				/>
			</div>
			<Dropdown
				placeholder={i18n.t('placeholder.situationType')}
				input={situations[2].label}
				required
				options={situations}
				on:select={onSituationSelection}
			>
				{i18n.t('label.situationType')}
			</Dropdown>
		</BaseForm>
	</ModalBase>
{/if}
