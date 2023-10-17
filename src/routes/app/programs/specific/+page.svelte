<script lang="ts">
	import {
		toastSuccessfullyCreated,
		toastSuccessfullyDeleted,
		toastSuccessfullyEdited
	} from '$lib';
	import { Modals, handleCreate, handleDelete, handleEdit } from '$lib/components/Modals';
	import Table from '$lib/components/Table/Table.svelte';
	import i18n from '$lib/i18n';
	import { getModalStore,getToastStore } from '@skeletonlabs/skeleton';
const toastStore = getToastStore()
	const data: any[] = [];
	const headers: string[] = [];

	const modalStore = getModalStore();

	const handleCreateSpecificProgram = () => {
		handleCreate(modalStore, Modals.CREATE_PROGRAM_SPECIFIC, (created) => {
			console.log(created);
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleEditSpecificProgram = ({ detail }: CustomEvent) => {
		handleEdit(modalStore, Modals.EDIT_PROGRAM_SPECIFIC, detail, (edited) => {
			console.log(edited);
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteSpecificProgram = ({ detail }: CustomEvent) => {
		const target = detail.name;
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, target, (deleted) => {
			console.log(deleted);
			toastSuccessfullyDeleted(toastStore);
		});
	};

	const handlePageChange = ({ detail }: CustomEvent) => {};
	const handleAmountChange = ({ detail }: CustomEvent) => {};
	const handleOrderChange = ({ detail }: CustomEvent) => {};
</script>

<div class="overflow-hidden">
	<Table
		{data}
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
