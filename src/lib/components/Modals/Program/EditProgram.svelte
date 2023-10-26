<script lang="ts">
	import ModalBase from '$lib/components/Modals/ModalBase.svelte';
	import i18n from '$lib/i18n';
	import { programService } from '$lib/services';
	import type { IProgram, IProgramEdit } from '$lib/services/ProgramService';
	import { loading } from '$lib/stores';
	import type { FlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import { triggerErrorFlash } from '$lib/CustomError';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	const program: IProgram = $modalStore[0].meta.values;

	let values: IProgramEdit = {
		program_name: program.program_name
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
				const updated = await programService.editProgram(program.id_program, values);
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
			<svelte:fragment slot="title">{i18n.t('title.editProgram')}</svelte:fragment>
			<div>
				<label class="required" for="program-edit-name">{i18n.t('label.programName')}</label>
				<input
					placeholder={i18n.t('placeholder.programName')}
					required
					type="text"
					minlength="3"
					id="program-edit-name"
					bind:value={values.program_name}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
