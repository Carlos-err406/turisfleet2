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

	const handleCreateGroup = () => {
		handleCreate(modalStore, Modals.CREATE_GROUP, (created) => {
			console.log(created);
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleEditGroup = ({ detail }: CustomEvent) => {
		handleEdit(modalStore, Modals.EDIT_GROUP, detail, (edited) => {
			console.log(edited);
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteGroup = ({ detail }: CustomEvent) => {
		const target = detail.country;
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
		on:insert={handleCreateGroup}
		on:edit={handleEditGroup}
		on:delete={handleDeleteGroup}
		on:page={handlePageChange}
		on:amount={handleAmountChange}
		on:change-order={handleOrderChange}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.groups')}
		</svelte:fragment>
	</Table>
</div>
