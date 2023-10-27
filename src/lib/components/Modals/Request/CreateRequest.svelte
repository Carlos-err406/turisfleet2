<script lang="ts">
	import { createOneFromToast } from '$lib';
	import { triggerErrorFlash } from '$lib/CustomError';
	import Dropdown, { type DropdownOption } from '$lib/components/Inputs/Dropdown.svelte';
	import i18n from '$lib/i18n';
	import {
		carService,
		driverService,
		groupService,
		programService,
		requestService
	} from '$lib/services';

	import { loading } from '$lib/stores';
	import type { FlashStore } from '$lib/stores/flashes';
	import type { ICar } from '$lib/types/CarTypes';
	import type { IDriver } from '$lib/types/DriverTypes';
	import type { IGroup } from '$lib/types/GroupService';
	import type { IProgram, ISpecificProgram } from '$lib/types/ProgramTypes';
	import type { IRequestCreate } from '$lib/types/RequestTypes';
	import { tomorrow } from '$lib/utils';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { Modals } from '..';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	const modalStore = getModalStore();
	const toastStore = getToastStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	const onResolve: (r: any) => void = $modalStore[0].meta.onResolve;

	let values: IRequestCreate = {
		id_group: 0,
		id_specific_program: 0,
		date: tomorrow(),
		tourist_amount: 0
	};
	let mounted = false;
	let groups: IGroup[] = [];
	let drivers: IDriver[] = [];
	let programs: IProgram[] = [];
	let specificPrograms: ISpecificProgram[] = [];
	let cars: ICar[] = [];
	let groupOptions: DropdownOption[] = [];
	let specificProgramOptions: DropdownOption[] = [];
	const close = () => {
		modalStore.close();
	};
	onMount(async () => {
		$loading = true;
		[groups, specificPrograms, cars, programs, drivers] = await Promise.all([
			groupService.getAllGroups(),
			programService.getAllSpecificPrograms(),
			carService.getAllCars(),
			programService.getAllPrograms(),
			driverService.getAllDrivers()
		]);
		$loading = false;
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
		} else if (cars.length === 0 && drivers.length === 0) {
			createOneFromToast({
				stores: { toast: toastStore, modal: modalStore },
				toastMessage: i18n.t('flashes.noDriversToCreateRequest'),
				modalToReopen: Modals.CREATE_REQUEST,
				creationModal: Modals.CREATE_DRIVER,
				onResolve
			});
			close();
		} else if (cars.length === 0) {
			createOneFromToast({
				stores: { toast: toastStore, modal: modalStore },
				toastMessage: i18n.t('flashes.noCarsToCreateRequest'),
				modalToReopen: Modals.CREATE_REQUEST,
				creationModal: Modals.CREATE_CAR,
				onResolve
			});
			close();
		} else if (groups.length === 0) {
			createOneFromToast({
				stores: { toast: toastStore, modal: modalStore },
				toastMessage: i18n.t('flashes.noGroupsToCreateRequest'),
				modalToReopen: Modals.CREATE_REQUEST,
				creationModal: Modals.CREATE_GROUP,
				onResolve
			});
			close();
		}
		mounted = true;
		values.id_group = groups[0].id_group;
		values.id_specific_program = specificPrograms[0]?.id_specific_program;
		groupOptions = groups.map(({ id_group, country, tourist_amount }) => ({
			label: `${country} [${tourist_amount}]`,
			value: id_group
		}));
		specificProgramOptions = specificPrograms.map(
			({ id_specific_program, description, program }) => ({
				label: `(${program.program_name}) ${description}`,
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

{#if $modalStore[0] && mounted}
	<ModalBase>
		<BaseForm footerCols={3} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.createRequest')}</svelte:fragment>
			<div class="col-span-2">
				<Dropdown
					bind:value={values.id_group}
					placeholder={i18n.t('placeholder.group')}
					required
					options={groupOptions}
					on:select
				>
					{i18n.t('label.group')}
				</Dropdown>
			</div>
			<div>
				<label class="required" for="request-create-tourist-amount">
					{i18n.t('label.touristAmount')}
				</label>
				<input
					placeholder={i18n.t('placeholder.touristAmount')}
					required
					type="number"
					min="1"
					max={groups.find((g) => g.id_group === values.id_group)?.tourist_amount || 0}
					id="request-create-tourist-amount"
					bind:value={values.tourist_amount}
				/>
			</div>
			<div class="col-span-3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
				<Dropdown
					bind:value={values.id_specific_program}
					placeholder={i18n.t('placeholder.specificProgram')}
					options={specificProgramOptions}
					on:select
				>
					{i18n.t('label.specificProgram')}
				</Dropdown>
			</div>
			<div>
				<label class="required" for="request-create-start-date">{i18n.t('label.startDate')}</label>
				<input
					placeholder={i18n.t('placeholder.startDate')}
					required
					type="date"
					id="request-create-start-date"
					bind:value={values.date}
					min={tomorrow()}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
