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
	import { requestService } from '$lib/services';
	import type { IRequest } from '$lib/services/RequestService';
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
	let requests: IRequest[] = [];
	const headers: (keyof IRequest)[] = [];

	const getAll = async () => {
		$loading = true;
		try {
			const { data, total, page, page_size } = await requestService.getRequests(
				$paginationStore,
				$queryStore
			);
			requests = data;
			$totalElementsStore = total;
			$paginationStore.page = page;
			$paginationStore.page_size = page_size;
			// flattenData = data.map((value) => ({
			// 	...value,
			// 	license_categories_flat: value.license_categories.join(', ')
			// }));
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		$loading = false;
	};

	onMount(getAll);
	const handleCreateRequest = () => {
		handleCreate(modalStore, Modals.CREATE_REQUEST, async (created) => {
			await getAll();
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleEditRequest = ({ detail }: CustomEvent) => {
		handleEdit(modalStore, Modals.EDIT_REQUEST, detail, async (edited) => {
			await getAll();
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteRequest = ({ detail }: CustomEvent) => {
		const target = detail.name;
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, target, (deleted) => {
			$loading = true;
			try {
				toastSuccessfullyDeleted(toastStore);
			} catch (e) {
				triggerErrorToast(toastStore, e);
			}
			$loading = false;
		});
	};

	const handlePageChange = ({ detail }: CustomEvent) => {};
	const handleAmountChange = ({ detail }: CustomEvent) => {};
	const handleOrderChange = ({ detail }: CustomEvent) => {};
</script>

<div class="overflow-hidden">
	<Table
		data={requests}
		{headers}
		on:insert={handleCreateRequest}
		on:edit={handleEditRequest}
		on:delete={handleDeleteRequest}
		on:page={handlePageChange}
		on:amount={handleAmountChange}
		on:change-order={handleOrderChange}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.requests')}
		</svelte:fragment>
	</Table>
</div>
