<script lang="ts">
	import { toastSuccessfullyCreated, toastSuccessfullyDeleted } from '$lib';
	import { triggerErrorToast } from '$lib/CustomError';
	import { Modals, handleCreate, handleDelete } from '$lib/components/Modals';
	import Table, { type ColumnOrientation } from '$lib/components/Table/Table.svelte';
	import i18n from '$lib/i18n';
	import { situationService } from '$lib/services';
	import { loading } from '$lib/stores';
	import {
		getPaginationStore,
		getQueryStringStore,
		getTotalElementsStore
	} from '$lib/stores/pagination';
	import type { IDriverSituation } from '$lib/types/SituationTypes';
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
	setContext('canEdit', false);

	type FlattenDataType = IDriverSituation & {
		name: string;
		id_number: string;
		situation_name: string;
	};
	let flattenData: FlattenDataType[] = [];
	const headers: (keyof FlattenDataType)[] = [
		'name',
		'id_number',
		'situation_name',
		'date',
		'return_date'
	];
	const getAll = async () => {
		$loading = true;
		try {
			const { data, total, page, page_size } = await situationService.getDriversSituations(
				$paginationStore,
				$queryStore
			);
			$totalElementsStore = total;
			$paginationStore.page = page;
			$paginationStore.page_size = page_size;
			flattenData = data.map((value) => ({
				...value,
				name: value.driver.name,
				id_number: value.driver.id_number,
				situation_name: value.situation.situation_name
			}));
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		$loading = false;
	};

	onMount(getAll);

	const handleCreateDriverSituation = () => {
		handleCreate(modalStore, Modals.CREATE_SITUATION_DRIVER, async () => {
			await getAll();
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleDeleteDriverSituation = ({ detail }: CustomEvent<IDriverSituation>) => {
		const target = detail.driver.name;
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, target, async () => {
			$loading = true;
			try {
				await situationService.deleteDriverSituation(
					detail.driver.id_driver,
					detail.situation.id_situation,
					detail.date as string
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
		let header: keyof IDriverSituation;
		switch (detail.header) {
			case 'name':
				header = 'driver';
				break;
			case 'id_number':
				header = 'driver';
				break;
			case 'situation_name':
				header = 'situation';
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
		on:insert={handleCreateDriverSituation}
		on:delete={handleDeleteDriverSituation}
		on:page={handlePageChange}
		on:amount={handleAmountChange}
		on:change-order={handleOrderChange}
		on:search={getAll}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.driverSituations')}
		</svelte:fragment>
	</Table>
</div>
