<script lang="ts">
	import Dropdown, { type DropdownOption } from '$lib/components/Inputs/Dropdown.svelte';
	import DurationInput, {
		durationObjToStr,
		type DurationInputValue
	} from '$lib/components/Inputs/DurationInput.svelte';
	import ModalBase from '$lib/components/Modals/ModalBase.svelte';
	import i18n from '$lib/i18n';
	import type { FlashStore } from '$lib/stores/flashes';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import type { IProgram, ISpecificProgramCreate } from '$lib/services/ProgramService';
	import { createOneFromToast } from '$lib';
	import { driverService, programService } from '$lib/services';
	import { onMount } from 'svelte';
	import { Modals } from '..';
	import { loading } from '$lib/stores';
	import { triggerErrorFlash } from '$lib/CustomError';
	const modalStore = getModalStore();
	const toastStore = getToastStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	const onResolve: (r: any) => void = $modalStore[0].meta.onResolve;
	let values: ISpecificProgramCreate = {
		description: '',
		start: '',
		duration: '',
		km: 0
	};
	let selectedProgram: number;
	let programs: IProgram[] = [];
	let programOptions: DropdownOption[] = [];
	let durationObj: DurationInputValue;
	const close = () => {
		modalStore.close();
	};
	onMount(async () => {
		programs = await programService.getAllPrograms();
		if (programs.length === 0) {
			createOneFromToast({
				stores: { toast: toastStore, modal: modalStore },
				toastMessage: i18n.t('flashes.noProgramsToCreateSpecificProgramFrom'),
				modalToReopen: Modals.CREATE_PROGRAM_SPECIFIC,
				creationModal: Modals.CREATE_PROGRAM,
				onResolve
			});
			close();
		}
		selectedProgram = programs[0]?.id_program;

		programOptions = programs.map(({ id_program, program_name }) => ({
			label: program_name,
			value: id_program
		}));
	});
	const validate = () => {
		return true;
	};
	const parse = () => {
		const durationStr = durationObjToStr(durationObj);
		values.duration = durationStr;
	};
	const create = async () => {
		parse();
		if (validate()) {
			$loading = true;
			try {
				const newSpecificProgram = await programService.createSpecificProgram(
					selectedProgram,
					values
				);
				$modalStore[0].response?.(newSpecificProgram);
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
		<BaseForm footerCols={2} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.createSpecificProgram')}</svelte:fragment>
			<Dropdown
				bind:value={selectedProgram}
				placeholder={i18n.t('placeholder.program')}
				required
				options={programOptions}
				on:select
			>
				{i18n.t('label.program')}
			</Dropdown>
			<div>
				<label class="required" for="specific-program-create-description">
					{i18n.t('label.description')}
				</label>
				<input
					minlength="3"
					placeholder={i18n.t('placeholder.description')}
					required
					type="text"
					id="specific-program-create-description"
					bind:value={values.description}
				/>
			</div>
			<div>
				<label class="required" for="specific-program-create-start">
					{i18n.t('label.startsAt')}
				</label>
				<input required type="time" id="specific-program-create-start" bind:value={values.start} />
			</div>
			<div>
				<label class="required" for="specific-program-create-distance">
					{i18n.t('label.distanceKM')}
				</label>
				<div class="input-group flex items-center">
					<input
						placeholder="km"
						required
						type="number"
						id="specific-program-create-distance"
						bind:value={values.km}
						min="1"
						max="1000"
					/>
					<span class=" px-3">KM</span>
				</div>
			</div>
			<div class="col-span-2">
				<DurationInput required bind:value={durationObj} />
			</div>
		</BaseForm>
	</ModalBase>
{/if}
