<script lang="ts">
	import { triggerErrorFlash } from '$lib/CustomError';
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import i18n from '$lib/i18n';
	import { situationService } from '$lib/services';
	import type { ISituation, ISituationEdit } from '$lib/services/SituationService';
	import { loading } from '$lib/stores';
	import type { FlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	import { situations } from './situations';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	const situation: ISituation = $modalStore[0].meta.values;
	let values: ISituationEdit = {
		situation_name: situation.situation_name,
		situation_type: situation.situation_type
	};
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const edit = async () => {
		if (validate()) {
			$loading = true;
			try {
				const updated = await situationService.editSituation(situation.id_situation, values);
				$modalStore[0].response?.(updated);
				close();
			} catch (e) {
				triggerErrorFlash(flashes, e);
			}
			$loading = false;
		}
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={1} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.editSituation')}</svelte:fragment>
			<div>
				<label class="required" for="situation-edit-name">
					{i18n.t('label.situationName')}
				</label>
				<input
					minlength="3"
					placeholder={i18n.t('placeholder.situationName')}
					required
					type="text"
					id="situation-edit-name"
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
