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
	import { driverService } from '$lib/services';
	import type { IDriver } from '$lib/services/DriverService';
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

	type FlattenDataType = IDriver & { license_categories_flat: string };
	let flattenData: FlattenDataType[] = [];
	const headers: (keyof FlattenDataType)[] = [
		'name',
		'id_number',
		'license_categories_flat',
		'address'
	];

	const getAll = async () => {
		$loading = true;
		try {
			const { data, total, page, page_size } = await driverService.getDrivers(
				$paginationStore,
				$queryStore
			);
			$totalElementsStore = total;
			$paginationStore.page = page;
			$paginationStore.page_size = page_size;
			flattenData = data.map((value) => ({
				...value,
				license_categories_flat: value.license_categories.join(', ')
			}));
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		$loading = false;
	};

	onMount(getAll);

	const handleCreateDriver = () => {
		handleCreate(modalStore, Modals.CREATE_DRIVER, async (created) => {
			await getAll();
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleEditDriver = ({ detail }: CustomEvent<IDriver>) => {
		handleEdit(modalStore, Modals.EDIT_DRIVER, detail, async (edited) => {
			await getAll();
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteDriver = ({ detail }: CustomEvent<IDriver>) => {
		const target = detail.name;
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, target, async (deleted) => {
			$loading = true;
			try {
				await driverService.deleteDriver(detail.id_driver);
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
		let header: keyof IDriver;
		switch (detail.header) {
			case 'license_categories_flat':
				header = 'license_categories';
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
		on:insert={handleCreateDriver}
		on:edit={handleEditDriver}
		on:delete={handleDeleteDriver}
		on:page={handlePageChange}
		on:amount={handleAmountChange}
		on:change-order={handleOrderChange}
		on:search={getAll}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.drivers')}
		</svelte:fragment>
	</Table>
</div>
