<script lang="ts">
	import {
		toastSuccessfullyCreated,
		toastSuccessfullyDeleted,
		toastSuccessfullyEdited
	} from '$lib';
	import { Modals, handleCreate, handleDelete, handleEdit } from '$lib/components/Modals';
	import Table, { type ColumnOrientation } from '$lib/components/Table/Table.svelte';
	import i18n from '$lib/i18n';
	import { driverService, situationService } from '$lib/services';
	import type { IDriver } from '$lib/services/DriverService';
	import type { IDriverSituation } from '$lib/services/SituationService';
	import { loading } from '$lib/stores';
	import { getPaginationStore } from '$lib/stores/pagination';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount, setContext } from 'svelte';
	const toastStore = getToastStore();
	const paginationStore = getPaginationStore();
	const modalStore = getModalStore();
	setContext('pagination', paginationStore);
	type FlattenDataType = IDriverSituation & {
		name: string;
		id_number: string;
		situation_name: string;
	};
	let data: IDriverSituation[] = [];
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
			data = await situationService.getDriversSituations($paginationStore);
			flattenData = data.map((value) => ({
				...value,
				name: value.driver.name,
				id_number: value.driver.id_number,
				situation_name: value.situation.situation_name
			}));
		} catch (e) {}
		$loading = false;
	};

	onMount(getAll);

	const handleCreateDriverSituation = () => {
		handleCreate(modalStore, Modals.CREATE_SITUATION_DRIVER, (created) => {
			console.log(created);
			getAll();
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleEditDriverSituation = ({ detail }: CustomEvent<IDriverSituation>) => {
		handleEdit(modalStore, Modals.EDIT_SITUATION_DRIVER, detail, (edited) => {
			console.log(edited);
			getAll();
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteDriverSituation = ({ detail }: CustomEvent<IDriverSituation>) => {
		const target = detail.driver.name;
		console.log(detail);
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, target, async (deleted) => {
			console.log(deleted);
			$loading = true;
			try {
				await situationService.deleteDriverSituation(
					detail.driver.id_driver,
					detail.situation.id_situation,
					detail.date as string
				);
				getAll();
				toastSuccessfullyDeleted(toastStore);
			} catch (e) {}
			$loading = false;
		});
	};

	const handlePageChange = ({ detail }: CustomEvent) => {};
	const handleAmountChange = ({ detail }: CustomEvent) => {};
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
		on:edit={handleEditDriverSituation}
		on:delete={handleDeleteDriverSituation}
		on:page={handlePageChange}
		on:amount={handleAmountChange}
		on:change-order={handleOrderChange}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.driverSituations')}
		</svelte:fragment>
	</Table>
</div>
