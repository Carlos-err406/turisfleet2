<script lang="ts">
	import {
		toastSuccessfullyCreated,
		toastSuccessfullyDeleted,
		toastSuccessfullyEdited
	} from '$lib';
	import { triggerErrorToast } from '$lib/CustomError';
	import { Modals, handleCreate, handleDelete, handleEdit } from '$lib/components/Modals';
	import Table, { type ColumnOrientation } from '$lib/components/Table/Table.svelte';
	import i18n from '$lib/i18n';
	import { situationService } from '$lib/services';
	import { loading } from '$lib/stores';
	import {
		getPaginationStore,
		getQueryStringStore,
		getTotalElementsStore
	} from '$lib/stores/pagination';
	import type { ISituation } from '$lib/types/SituationTypes';
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

	type FlattenDataType = ISituation & { situation_type_i18n: string };
	let flattenData: FlattenDataType[] = [];

	const headers: (keyof FlattenDataType)[] = ['situation_name', 'situation_type_i18n'];

	const getAll = async () => {
		$loading = true;
		try {
			const { data, total, page, page_size } = await situationService.getSituations(
				$paginationStore,
				$queryStore
			);
			$totalElementsStore = total;
			$paginationStore.page = page;
			$paginationStore.page_size = page_size;
			flattenData = data.map((value) => ({
				...value,
				situation_type_i18n: i18n.t(`label.${value.situation_type}`)
			}));
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		$loading = false;
	};

	onMount(getAll);

	const handleCreateSituation = () => {
		handleCreate(modalStore, Modals.CREATE_SITUATION, async () => {
			await getAll();
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleEditSituation = ({ detail }: CustomEvent<ISituation>) => {
		handleEdit(modalStore, Modals.EDIT_SITUATION, detail, async () => {
			await getAll();
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteSituation = ({ detail }: CustomEvent<ISituation>) => {
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, detail.situation_name, async () => {
			$loading = true;
			try {
				await situationService.deleteSituation(detail.id_situation);
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
		let header: keyof ISituation;
		switch (detail.header) {
			case 'situation_type_i18n':
				header = 'situation_type';
				break;
			default:
				header = detail.header;
		}
	};
</script>

<div class="overflow-hidden">
	<Table
		data={flattenData}
		{headers}
		on:insert={handleCreateSituation}
		on:edit={handleEditSituation}
		on:delete={handleDeleteSituation}
		on:page={handlePageChange}
		on:amount={handleAmountChange}
		on:change-order={handleOrderChange}
		on:search={getAll}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.situations')}
		</svelte:fragment>
	</Table>
</div>
