<script lang="ts">
	import {
		toastSuccessfullyCreated,
		toastSuccessfullyDeleted,
		toastSuccessfullyEdited
	} from '$lib';
	import { durationObjToStr, durationStrToObj } from '$lib/components/Inputs/DurationInput.svelte';
	import { Modals, handleCreate, handleDelete, handleEdit } from '$lib/components/Modals';
	import Table, { type ColumnOrientation } from '$lib/components/Table/Table.svelte';
	import i18n from '$lib/i18n';
	import { programService } from '$lib/services';
	import type { ISpecificProgram } from '$lib/services/ProgramService';
	import { loading } from '$lib/stores';
	import { getPaginationStore } from '$lib/stores/pagination';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount, setContext } from 'svelte';

	const toastStore = getToastStore();
	const modalStore = getModalStore();
	const paginationStore = getPaginationStore();
	
	setContext('pagination', paginationStore);
	let data: ISpecificProgram[] = [];
	type FlattenDataType = ISpecificProgram & { program_name: string; duration_flat: string };
	let flattenForTable: FlattenDataType[] = [];
	const headers: (keyof FlattenDataType)[] = [
		'program_name',
		'description',
		'start',
		'duration_flat',
		'km'
	];

	const getAll = async () => {
		$loading = true;
		try {
			data = await programService.getSpecificPrograms($paginationStore);
			flattenForTable = data.map((value) => ({
				...value,
				program_name: value.program.program_name,
				duration_flat: durationObjToStr(durationStrToObj(value.duration))
			}));
		} catch (e) {}
		$loading = false;
	};

	onMount(getAll);
	const handleCreateSpecificProgram = () => {
		handleCreate(modalStore, Modals.CREATE_PROGRAM_SPECIFIC, (created) => {
			console.log(created);
			getAll();
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleEditSpecificProgram = ({ detail }: CustomEvent<ISpecificProgram>) => {
		handleEdit(modalStore, Modals.EDIT_PROGRAM_SPECIFIC, detail, (edited) => {
			console.log(edited);
			getAll();
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteSpecificProgram = ({ detail }: CustomEvent<ISpecificProgram>) => {
		const target = detail.description;
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, target, async (deleted) => {
			console.log(detail);
			$loading = true;
			try {
				await programService.deleteSpecificProgram(
					detail.program.id_program,
					detail.id_specific_program
				);
				getAll();
				toastSuccessfullyDeleted(toastStore);
			} catch (e) {}
			$loading = false;
		});
	};

	const handlePageChange = ({ detail }: CustomEvent) => {};
	const handleAmountChange = ({ detail }: CustomEvent) => {};
	const handleOrderChange = ({
		detail
	}: CustomEvent<{ header: keyof FlattenDataType; orientation: ColumnOrientation }>) => {
		let header: keyof ISpecificProgram;
		switch (detail.header) {
			case 'program_name':
				header = 'program';
				break;
			case 'duration_flat':
				header = 'duration';
				break;
			default:
				header = detail.header;
		}
	};
</script>

<div class="overflow-hidden">
	<Table
		data={flattenForTable}
		{headers}
		on:insert={handleCreateSpecificProgram}
		on:edit={handleEditSpecificProgram}
		on:delete={handleDeleteSpecificProgram}
		on:page={handlePageChange}
		on:amount={handleAmountChange}
		on:change-order={handleOrderChange}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.specificPrograms')}
		</svelte:fragment>
	</Table>
</div>
