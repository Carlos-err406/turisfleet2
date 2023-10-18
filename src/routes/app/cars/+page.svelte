<script lang="ts">
	import {
		toastSuccessfullyCreated,
		toastSuccessfullyDeleted,
		toastSuccessfullyEdited
	} from '$lib';
	import { Modals, handleCreate, handleDelete, handleEdit } from '$lib/components/Modals';
	import Table from '$lib/components/Table/Table.svelte';
	import i18n from '$lib/i18n';
	import { carService } from '$lib/services';
	import type { ICar } from '$lib/services/CarService';
	import { loading } from '$lib/stores';
	import { getPaginationStore } from '$lib/stores/pagination';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount, setContext } from 'svelte';
	const toastStore = getToastStore();
	const modalStore = getModalStore();
	const paginationStore = getPaginationStore();
	setContext('pagination', paginationStore);

	let data: ICar[] = [];
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
			data = await carService.getCars($paginationStore);
		} catch (e) {}
		$loading = false;
	};

	onMount(getAll);

	const handleCreateCar = () => {
		handleCreate(modalStore, Modals.CREATE_CAR, (created) => {
			console.log(created);
			toastSuccessfullyCreated(toastStore);
			getAll();
		});
	};

	const handleEditCar = ({ detail }: CustomEvent<ICar>) => {
		handleEdit(modalStore, Modals.EDIT_CAR, detail, (edited) => {
			console.log(edited);
			getAll();
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteCar = ({ detail }: CustomEvent<ICar>) => {
		const target = `[${detail.plate_number}] ${detail.brand}`;
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, target, async (deleted) => {
			console.log(detail);
			$loading = true;
			try {
				await carService.deleteCar(detail.id_car);
				getAll();
				toastSuccessfullyDeleted(toastStore);
			} catch (e) {}
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
		on:insert={handleCreateCar}
		on:edit={handleEditCar}
		on:delete={handleDeleteCar}
		on:page={handlePageChange}
		on:amount={handleAmountChange}
		on:change-order={handleOrderChange}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.cars')}
		</svelte:fragment>
	</Table>
</div>
