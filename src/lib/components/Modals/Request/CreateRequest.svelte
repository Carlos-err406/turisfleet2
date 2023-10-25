<script lang="ts">
	import Dropdown, { type DropdownOption } from '$lib/components/Inputs/Dropdown.svelte';
	import i18n from '$lib/i18n';
	import type { FlashStore } from '$lib/stores/flashes';
	import { tomorrow } from '$lib/utils';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	import type { IRequestCreate } from '$lib/services/RequestService';
	import type { IGroup } from '$lib/services/GroupService';
	import type { ISpecificProgram } from '$lib/services/ProgramService';
	import { onMount } from 'svelte';
	import { loading } from '$lib/stores';
	import { groupService, programService, requestService, situationService } from '$lib/services';
	import { createOneFromToast } from '$lib';
	import { Modals } from '..';
	import { triggerErrorFlash } from '$lib/CustomError';
	const modalStore = getModalStore();
	const toastStore = getToastStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	const onResolve: (r: any) => void = $modalStore[0].meta.onResolve;

	let values: IRequestCreate = {
		id_group: 0,
		id_specific_program: 0,
		start_date: tomorrow(),
		tourist_amount: 0
	};
	let groups: IGroup[] = [];
	let specificPrograms: ISpecificProgram[] = [];
	let groupOptions: DropdownOption[] = [];
	let specificProgramOptions: DropdownOption[] = [];
	const close = () => {
		modalStore.close();
	};
	onMount(async () => {
		$loading = true;
		[groups, specificPrograms] = await Promise.all([
			await groupService.getAllGroups(),
			await programService.getAllSpecificPrograms()
		]);
		$loading = false;
		if (groups.length === 0) {
			createOneFromToast({
				stores: { toast: toastStore, modal: modalStore },
				toastMessage: i18n.t('flashes.noGroupsToCreateRequest'),
				modalToReopen: Modals.CREATE_REQUEST,
				creationModal: Modals.CREATE_GROUP,
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
		values.id_group = groups[0].id_group;
		values.id_specific_program = specificPrograms[0]?.id_specific_program;
		groupOptions = groups.map(({ id_group, country, tourist_amount }) => ({
			label: `${country} [${tourist_amount}]`,
			value: id_group
		}));
		specificProgramOptions = specificPrograms.map(
			({ id_specific_program, description, program }) => ({
				label: `${program.program_name} ${description}`,
				value: id_specific_program
			})
		);
	});
	const validate = () => {
		return true;
	};
	const create = async () => {
		if (validate()) {
			$loading = true;
			try {
				const request = await requestService.createRequest(values);
				$modalStore[0].response?.(request);
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
		<BaseForm footerCols={3} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.createRequest')}</svelte:fragment>
			<Dropdown
				bind:value={values.id_group}
				placeholder={i18n.t('placeholder.group')}
				required
				options={groupOptions}
				on:select
			>
				{i18n.t('label.group')}
			</Dropdown>
			<div>
				<label class="required" for="request-create-tourist-amount">
					{i18n.t('label.touristAmount')}
				</label>
				<input
					placeholder={i18n.t('placeholder.touristAmount')}
					required
					type="number"
					min="1"
					max="300"
					id="request-create-tourist-amount"
					bind:value={values.tourist_amount}
				/>
			</div>
			<Dropdown
				bind:value={values.id_specific_program}
				placeholder={i18n.t('placeholder.specificProgram')}
				options={specificProgramOptions}
				on:select
			>
				{i18n.t('label.specificProgram')}
			</Dropdown>
			<div>
				<label class="required" for="request-create-start-date">{i18n.t('label.startDate')}</label>
				<input
					placeholder={i18n.t('placeholder.startDate')}
					required
					type="date"
					id="request-create-start-date"
					bind:value={values.start_date}
					min={tomorrow()}
				/>
			</div>
			
		</BaseForm>
	</ModalBase>
{/if}
