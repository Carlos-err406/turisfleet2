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

	const handleCreateSituation = () => {
		handleCreate(modalStore, Modals.CREATE_SITUATION, (created) => {
			console.log(created);
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleEditSituation = ({ detail }: CustomEvent) => {
		handleEdit(modalStore, Modals.EDIT_SITUATION, detail, (edited) => {
			console.log(edited);
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteSituation = ({ detail }: CustomEvent) => {
		console.log(detail.situationname);
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, detail.situationname, (deleted) => {
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
		on:insert={handleCreateSituation}
		on:edit={handleEditSituation}
		on:delete={handleDeleteSituation}
		on:page={handlePageChange}
		on:amount={handleAmountChange}
		on:change-order={handleOrderChange}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.situations')}
		</svelte:fragment>
	</Table>
</div>
