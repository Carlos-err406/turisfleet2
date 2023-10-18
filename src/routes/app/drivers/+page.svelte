<script lang="ts">
	import {
		toastSuccessfullyCreated,
		toastSuccessfullyDeleted,
		toastSuccessfullyEdited
	} from '$lib';
	import { Modals, handleCreate, handleDelete, handleEdit } from '$lib/components/Modals';
	import Table, { type ColumnOrientation } from '$lib/components/Table/Table.svelte';
	import i18n from '$lib/i18n';
	import { driverService } from '$lib/services';
	import type { IDriver } from '$lib/services/DriverService';
	import { loading } from '$lib/stores';
	import { getPaginationStore } from '$lib/stores/pagination';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount, setContext } from 'svelte';
	const toastStore = getToastStore();
	const modalStore = getModalStore();
	const paginationStore = getPaginationStore();
	setContext('pagination', paginationStore);
	type FlattenDataType = IDriver & { license_categories_flat: string };
	let data: IDriver[] = [];
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
			data = await driverService.getDrivers($paginationStore);
			flattenData = data.map((value) => ({
				...value,
				license_categories_flat: value.license_categories
					.map((lc) => lc.license_category) //TODO remove this when api updates it
					.join(', ')
			}));
		} catch (e) {}
		$loading = false;
	};

	onMount(getAll);

	const handleCreateDriver = () => {
		handleCreate(modalStore, Modals.CREATE_DRIVER, (created) => {
			console.log(created);
			toastSuccessfullyCreated(toastStore);
			getAll();
		});
	};

	const handleEditDriver = ({ detail }: CustomEvent<IDriver>) => {
		handleEdit(modalStore, Modals.EDIT_DRIVER, detail, (edited) => {
			console.log(edited);
			getAll();
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteDriver = ({ detail }: CustomEvent<IDriver>) => {
		const target = detail.name;
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, target, async (deleted) => {
			console.log(detail);
			$loading = true;
			try {
				await driverService.deleteDriver(detail.id_driver);
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
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.drivers')}
		</svelte:fragment>
	</Table>
</div>
