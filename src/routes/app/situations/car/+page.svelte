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
	import type { ICarSituation } from '$lib/services/SituationService';
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

	type FlattenDataType = ICarSituation & {
		brand: string;
		plate_number: string;
		situation_name: string;
	};
	let data: ICarSituation[] = [];
	let flattenData: FlattenDataType[] = [];
	const headers: (keyof FlattenDataType)[] = [
		'plate_number',
		'brand',
		'situation_name',
		'date',
		'return_date'
	];

	const getAll = async () => {
		$loading = true;
		try {
			const { data, total, page, page_size } = await situationService.getCarsSituations(
				$paginationStore
			);
			$totalElementsStore = total;
			$paginationStore.page = page;
			$paginationStore.page_size = page_size;
			flattenData = data.map((value) => ({
				...value,
				plate_number: value.car.plate_number,
				brand: value.car.brand,
				situation_name: value.situation.situation_name
			}));
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		$loading = false;
	};

	onMount(getAll);

	const handleCreateCarSituation = () => {
		handleCreate(modalStore, Modals.CREATE_SITUATION_CAR, async (created) => {
			await getAll();
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleEditCarSituation = ({ detail }: CustomEvent) => {
		handleEdit(modalStore, Modals.EDIT_SITUATION_CAR, detail, async (edited) => {
			await getAll();
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteCarSituation = ({ detail }: CustomEvent<ICarSituation>) => {
		const target = `([${detail.car.plate_number}] ${detail.car.brand}) -> ${detail.situation.situation_name}`;
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, target, async (deleted) => {
			$loading = true;
			try {
				await situationService.deleteCarSituation(
					detail.car.id_car,
					detail.situation.id_situation,
					detail.date as string
				);
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
	const handleOrderChange = ({
		detail
	}: CustomEvent<{ header: keyof FlattenDataType; orientation: ColumnOrientation }>) => {
		let header: keyof ICarSituation;
		switch (detail.header) {
			case 'brand':
				header = 'car';
				break;
			case 'plate_number':
				header = 'car';
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
		on:insert={handleCreateCarSituation}
		on:edit={handleEditCarSituation}
		on:delete={handleDeleteCarSituation}
		on:page={handlePageChange}
		on:amount={handleAmountChange}
		on:change-order={handleOrderChange}
		on:search={getAll}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.carSituations')}
		</svelte:fragment>
	</Table>
</div>
