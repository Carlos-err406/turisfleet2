<script lang="ts">
	import {
		toastSuccessfullyCreated,
		toastSuccessfullyDeleted,
		toastSuccessfullyEdited
	} from '$lib';
	import { triggerErrorToast } from '$lib/CustomError';
	import { durationObjToStr, durationStrToObj } from '$lib/components/Inputs/DurationInput.svelte';
	import { Modals, handleCreate, handleDelete, handleEdit } from '$lib/components/Modals';
	import Table, { type ColumnOrientation } from '$lib/components/Table/Table.svelte';
	import i18n from '$lib/i18n';
	import { programService } from '$lib/services';
	import type { ISpecificProgram } from '$lib/services/ProgramService';
	import { loading } from '$lib/stores';
	import {
		getPaginationStore,
		getQueryStringStore,
		getTotalElementsStore
	} from '$lib/stores/pagination';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import dayjs from 'dayjs';
	import { onMount, setContext } from 'svelte';

	const toastStore = getToastStore();
	const modalStore = getModalStore();
	const paginationStore = getPaginationStore();
	const queryStore = getQueryStringStore();
	const totalElementsStore = getTotalElementsStore();

	setContext('pagination', paginationStore);
	setContext('totalElements', totalElementsStore);
	setContext('query', queryStore);
	//TODO test
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
			const { data, total, page, page_size } = await programService.getSpecificPrograms(
				$paginationStore,
				$queryStore
			);
			$totalElementsStore = total;
			$paginationStore.page = page;
			$paginationStore.page_size = page_size;
			flattenForTable = data.map((value) => ({
				...value,
				program_name: value.program.program_name,
				duration_flat: durationObjToStr(durationStrToObj(value.duration))
			}));
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		$loading = false;
	};

	onMount(getAll);
	const handleCreateSpecificProgram = () => {
		handleCreate(modalStore, Modals.CREATE_PROGRAM_SPECIFIC, async (created) => {
			await getAll();
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleEditSpecificProgram = ({ detail }: CustomEvent<ISpecificProgram>) => {
		handleEdit(modalStore, Modals.EDIT_PROGRAM_SPECIFIC, detail, async (edited) => {
			await getAll();
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteSpecificProgram = ({ detail }: CustomEvent<ISpecificProgram>) => {
		const target = detail.description;
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, target, async (deleted) => {
			$loading = true;
			try {
				await programService.deleteSpecificProgram(
					detail.program.id_program,
					detail.id_specific_program
				);
				getAll();
				toastSuccessfullyDeleted(toastStore);
			} catch (e) {
				triggerErrorToast(toastStore, e);
			}
			$loading = false;
		});
	};

	const handlePageChange = async ({ detail }: CustomEvent) => {
		paginationStore.gotoPage(detail + 1);
		await getAll();
	};
	const handleAmountChange = async ({ detail }: CustomEvent) => {
		paginationStore.setLimit(detail);
		paginationStore.gotoPage(1);
		await getAll();
	};
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
		on:search={getAll}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.specificPrograms')}
		</svelte:fragment>
	</Table>
</div>
