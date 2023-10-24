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
	import { groupService } from '$lib/services';
	import type { IGroup } from '$lib/services/GroupService';
	import { loading } from '$lib/stores';
	import { getPaginationStore } from '$lib/stores/pagination';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount, setContext } from 'svelte';
	const toastStore = getToastStore();
	const modalStore = getModalStore();
	const paginationStore = getPaginationStore();
	setContext('pagination', paginationStore);

	let data: IGroup[] = [];
	const headers: (keyof IGroup)[] = ['country', 'tourist_amount'];

	const getAll = async () => {
		$loading = true;
		try {
			data = await groupService.getGroups($paginationStore);
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		$loading = false;
	};

	onMount(getAll);

	const handleCreateGroup = () => {
		handleCreate(modalStore, Modals.CREATE_GROUP, (created) => {
			console.log(created);
			toastSuccessfullyCreated(toastStore);
			getAll();
		});
	};

	const handleEditGroup = ({ detail }: CustomEvent<IGroup>) => {
		handleEdit(modalStore, Modals.EDIT_GROUP, detail, (edited) => {
			console.log(edited);
			getAll();
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteGroup = ({ detail }: CustomEvent<IGroup>) => {
		const target = detail.country;
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, target, async (deleted) => {
			console.log(detail);
			$loading = true;
			try {
				await groupService.deleteGroup(detail.id_group);
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
