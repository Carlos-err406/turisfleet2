<script lang="ts">
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import i18n from '$lib/i18n';
	import { situationService } from '$lib/services';
	import type { ISituationCreate } from '$lib/services/SituationService';
	import type { FlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	import { situations } from './situations';
	import { loading } from '$lib/stores';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	let values: ISituationCreate = {
		situation_name: '',
		situation_type: 'car'
	};
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const create = async () => {
		if (validate()) {
			$loading = true;
			try {
				const situation = await situationService.createSituation(values);
				$modalStore[0].response?.(situation);
				close();
			} catch (e) {}
			$loading = false;
		}
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={1} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.createSituation')}</svelte:fragment>
			<div>
				<label class="required" for="situation-create-name">
					{i18n.t('label.situationName')}
				</label>
				<input
					minlength="3"
					placeholder={i18n.t('placeholder.situationName')}
					required
					type="text"
					id="situation-create-name"
					bind:value={values.situation_name}
				/>
			</div>
			<Dropdown
				placeholder={i18n.t('placeholder.situationType')}
				bind:value={values.situation_type}
				required
				options={situations}
			>
				{i18n.t('label.situationType')}
			</Dropdown>
		</BaseForm>
	</ModalBase>
{/if}
