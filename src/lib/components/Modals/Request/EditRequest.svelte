<script lang="ts">
	import { createOneFromToast } from '$lib';
	import { triggerErrorFlash } from '$lib/CustomError';
	import Dropdown, { type DropdownOption } from '$lib/components/Inputs/Dropdown.svelte';
	import i18n from '$lib/i18n';
	import { programService, requestService } from '$lib/services';
	import type { IProgram, ISpecificProgram } from '$lib/services/ProgramService';
	import type { IRequest, IRequestEdit } from '$lib/services/RequestService';
	import { loading } from '$lib/stores';
	import type { FlashStore } from '$lib/stores/flashes';
	import { today } from '$lib/utils';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { Modals } from '..';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	const modalStore = getModalStore();
	const toastStore = getToastStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	const onResolve: (r: any) => void = $modalStore[0].meta.onResolve;
	const request: IRequest = $modalStore[0].meta.values;
	let values: Partial<IRequestEdit> = {
		date: request.date,
		tourist_amount: request.tourist_amount,
		id_specific_program: request.specific_program.id_specific_program
	};
	let specificPrograms: ISpecificProgram[] = [];
	let specificProgramOptions: DropdownOption[] = [];
	let programs: IProgram[] = [];

	onMount(async () => {
		[specificPrograms, programs] = await Promise.all([
			programService.getAllSpecificPrograms(),
			programService.getAllPrograms()
		]);
		if (specificPrograms.length === 0 && programs.length === 0) {
			createOneFromToast({
				stores: { toast: toastStore, modal: modalStore },
				toastMessage: i18n.t('flashes.noProgramsToCreateRequest'),
				modalToReopen: Modals.CREATE_REQUEST,
				creationModal: Modals.CREATE_PROGRAM,
				onResolve
			});
			close();
		} else if (specificPrograms.length === 0) {
			createOneFromToast({
				stores: { toast: toastStore, modal: modalStore },
				toastMessage: i18n.t('flashes.noSpecificProgramsToCreateRequest'),
				modalToReopen: Modals.CREATE_REQUEST,
				creationModal: Modals.CREATE_PROGRAM_SPECIFIC,
				onResolve
			});
			close();
		}
		specificProgramOptions = specificPrograms.map((p) => ({
			label: p.description,
			value: p.id_specific_program
		}));
	});
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const edit = () => {
		if (validate()) {
			const editedValues: Partial<IRequestEdit> = {};
			values.date !== request.date && Object.assign(editedValues, { date: values.date });
			values.id_specific_program !== request.specific_program.id_specific_program &&
				Object.assign(editedValues, { id_specific_program: values.id_specific_program });
			values.tourist_amount !== request.tourist_amount &&
				Object.assign(editedValues, { tourist_amount: values.tourist_amount });
			$loading = true;
			try {
				const updated = requestService.editRequest(request.id_request, editedValues);
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
		<BaseForm footerCols={2} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.editRequest')}</svelte:fragment>
			<div>
				<label class="required" for="request-edit-start-date">{i18n.t('label.startDate')}</label>
				<input
					placeholder={i18n.t('placeholder.startDate')}
					required
					type="date"
					id="request-edit-start-date"
					bind:value={values.date}
					min={today()}
				/>
			</div>
			<div>
				<label class="required" for="request-edit-tourist-amount"
					>{i18n.t('label.touristAmount')}</label
				>
				<input
					placeholder={i18n.t('placeholder.touristAmount')}
					required
					type="number"
					min="1"
					max="100"
					id="request-edit-tourist-amount"
					bind:value={values.tourist_amount}
				/>
			</div>
			<div class="col-span-2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
				<Dropdown
					placeholder={i18n.t('placeholder.specificProgram')}
					required
					options={specificProgramOptions}
					bind:value={values.id_specific_program}
				>
					{i18n.t('label.specificProgram')}
				</Dropdown>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
