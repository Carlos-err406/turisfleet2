<script lang="ts">
	//FIXME
	import ModalBase from '$lib/components/Modals/ModalBase.svelte';
	import i18n from '$lib/i18n';
	import type { ISpecificProgram, IProgramEdit } from '$lib/services/ProgramService';
	import type { FlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import { programService } from '$lib/services';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	let values: ISpecificProgram = $modalStore[0].meta.values;
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const edit = async () => {
		if (validate()) {
			const program = await programService.editProgram(values.id_program, values);
			$modalStore[0].response?.(program);
			close();
		}
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={1} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.editProgram')}</svelte:fragment>
			<div>
				<label class="required" for="program-edit-name">{i18n.t('label.programName')}</label>
				<input
					placeholder={i18n.t('placeholder.programName')}
					required
					type="text"
					id="program-edit-name"
					bind:value={values.program_name}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
