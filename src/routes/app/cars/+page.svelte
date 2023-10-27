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
	import { carService } from '$lib/services';
	import { loading } from '$lib/stores';
	import {
		getPaginationStore,
		getQueryStringStore,
		getTotalElementsStore
	} from '$lib/stores/pagination';
	import type { ICar } from '$lib/types/CarTypes';
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

	let cars: ICar[] = [];
	const headers: (keyof ICar)[] = [
		'plate_number',
		'brand',
		'category',
		'seat_amount',
		'available_km'
	];

	const getAll = async () => {
		$loading = true;
		try {
			const { data, total, page, page_size } = await carService.getCars(
				$paginationStore,
				$queryStore
			);
			cars = data;
			$totalElementsStore = total;
			$paginationStore.page = page;
			$paginationStore.page_size = page_size;
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		$loading = false;
	};

	onMount(getAll);

	const handleCreateCar = () => {
		handleCreate(modalStore, Modals.CREATE_CAR, async () => {
			await getAll();
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleEditCar = ({ detail }: CustomEvent<ICar>) => {
		handleEdit(modalStore, Modals.EDIT_CAR, detail, async () => {
			await getAll();
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteCar = ({ detail }: CustomEvent<ICar>) => {
		const target = `[${detail.plate_number}] ${detail.brand}`;
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, target, async () => {
			$loading = true;
			try {
				await carService.deleteCar(detail.id_car);
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
		paginationStore.gotoPage(1);
		paginationStore.setLimit(detail);
		await getAll();
	};
	const handleOrderChange = () => {};
</script>

<div class="overflow-hidden">
	<Table
		data={cars}
		{headers}
		on:insert={handleCreateCar}
		on:edit={handleEditCar}
		on:delete={handleDeleteCar}
		on:page={handlePageChange}
		on:amount={handleAmountChange}
		on:change-order={handleOrderChange}
		on:search={getAll}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.cars')}
		</svelte:fragment>
	</Table>
</div>
