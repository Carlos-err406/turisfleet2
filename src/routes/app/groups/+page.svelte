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
	import {
		getPaginationStore,
		getQueryStringStore,
		getTotalElementsStore
	} from '$lib/stores/pagination';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount, setContext } from 'svelte';
	const toastStore = getToastStore();
	const modalStore = getModalStore();
	const paginationStore = getPaginationStore();
	const queryStore = getQueryStringStore();
	const totalElementsStore = getTotalElementsStore();

	setContext('pagination', paginationStore);
	setContext('totalElements', totalElementsStore);
	setContext('query', queryStore);

	let groups: IGroup[] = [];
	const headers: (keyof IGroup)[] = ['country', 'tourist_amount'];

	const getAll = async () => {
		$loading = true;
		try {
			const { data, total, page, page_size } = await groupService.getGroups(
				$paginationStore,
				$queryStore
			);
			groups = data;
			$totalElementsStore = total;
			$paginationStore.page = page;
			$paginationStore.page_size = page_size;
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		$loading = false;
	};

	onMount(getAll);

	const handleCreateGroup = () => {
		handleCreate(modalStore, Modals.CREATE_GROUP, async (created) => {
			await getAll();
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleEditGroup = ({ detail }: CustomEvent<IGroup>) => {
		handleEdit(modalStore, Modals.EDIT_GROUP, detail, async (edited) => {
			await getAll();
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteGroup = ({ detail }: CustomEvent<IGroup>) => {
		const target = detail.country;
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, target, async (deleted) => {
			$loading = true;
			try {
				await groupService.deleteGroup(detail.id_group);
				await getAll();
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
		await getAll();
	};
	const handleOrderChange = async ({ detail }: CustomEvent) => {};

</script>

<div class="overflow-hidden">
	<Table
		data={groups}
		{headers}
		on:insert={handleCreateGroup}
		on:edit={handleEditGroup}
		on:delete={handleDeleteGroup}
		on:page={handlePageChange}
		on:amount={handleAmountChange}
		on:change-order={handleOrderChange}
		on:search={getAll}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.groups')}
		</svelte:fragment>
	</Table>
</div>
