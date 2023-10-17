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
	const data: any[] = [{ username: 'USERNAME' }];
	const headers: string[] = ['username'];
	const modalStore = getModalStore();

	const handleCreateUser = () => {
		handleCreate(modalStore, Modals.CREATE_USER, (created) => {
			console.log(created);
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleEditUser = ({ detail }: CustomEvent) => {
		handleEdit(modalStore, Modals.EDIT_USER, detail, (edited) => {
			console.log(edited);
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteUser = ({ detail }: CustomEvent) => {
		console.log(detail.username);
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, detail.username, (r) => {
			console.log(r);
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
		on:insert={handleCreateUser}
		on:edit={handleEditUser}
		on:delete={handleDeleteUser}
		on:page={handlePageChange}
		on:amount={handleAmountChange}
		on:change-order={handleOrderChange}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.users')}
		</svelte:fragment>
	</Table>
</div>
