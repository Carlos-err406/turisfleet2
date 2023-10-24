<script lang="ts">
	import {
		toastSuccessfullyCreated,
		toastSuccessfullyDeleted,
		toastSuccessfullyEdited
	} from '$lib';
	import { triggerErrorToast } from '$lib/CustomError';
	import { Modals, handleCreate, handleDelete, handleEdit } from '$lib/components/Modals';
	import Table from '$lib/components/Table/Table.svelte';
	import i18n from '$lib/i18n';
	import { programService } from '$lib/services';
	import type { IProgram } from '$lib/services/ProgramService';
	import { loading } from '$lib/stores';
	import { getPaginationStore } from '$lib/stores/pagination';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount, setContext } from 'svelte';
	const toastStore = getToastStore();
	const modalStore = getModalStore();
	const paginationStore = getPaginationStore();
	setContext('pagination', paginationStore);

	let data: IProgram[] = [];
	const headers: (keyof IProgram)[] = ['program_name'];

	const getAll = async () => {
		$loading = true;
		try {
			data = await programService.getPrograms($paginationStore);
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		$loading = false;
	};

	onMount(getAll);

	const handleCreateProgram = () => {
		handleCreate(modalStore, Modals.CREATE_PROGRAM, (created) => {
			console.log(created);
			getAll();
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleEditProgram = ({ detail }: CustomEvent<IProgram>) => {
		handleEdit(modalStore, Modals.EDIT_PROGRAM, detail, (edited) => {
			console.log(edited);
			getAll();
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteProgram = ({ detail }: CustomEvent<IProgram>) => {
		const target = detail.program_name;
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, target, async (deleted) => {
			console.log(detail);
			$loading = true;
			try {
				await programService.deleteProgram(detail.id_program);
				getAll();
				toastSuccessfullyDeleted(toastStore);
			} catch (e) {
				triggerErrorToast(toastStore, e);
			}
			$loading = false;
		});
	};

	const handlePageChange = ({ detail }: CustomEvent) => {
		paginationStore.gotoPage(detail);
		getAll();
	};
	const handleAmountChange = ({ detail }: CustomEvent) => {
		paginationStore.setLimit(detail);
		getAll();
	};
	const handleOrderChange = ({ detail }: CustomEvent) => {};
</script>

<div class="overflow-hidden">
	<Table
		{data}
		{headers}
		on:insert={handleCreateProgram}
		on:edit={handleEditProgram}
		on:delete={handleDeleteProgram}
		on:page={handlePageChange}
		on:amount={handleAmountChange}
		on:change-order={handleOrderChange}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.programs')}
		</svelte:fragment>
	</Table>
</div>
