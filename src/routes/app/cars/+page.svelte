<script lang="ts">
	import {
		toastSuccessfullyCreated,
		toastSuccessfullyDeleted,
		toastSuccessfullyEdited
	} from '$lib';
	import { Modals, handleCreate, handleDelete, handleEdit } from '$lib/components/Modals';
	import Table from '$lib/components/Table/Table.svelte';
	import i18n from '$lib/i18n';
	import { getModalStore,getToastStore } from '@skeletonlabs/skeleton';
const toastStore = getToastStore()
	const data: any[] = [{ brand: 'Toyota', plate_number: 'XXXXX' }];
	const headers: string[] = ['brand', 'plate_number'];
	const modalStore = getModalStore();

	const handleCreateCar = () => {
		handleCreate(modalStore, Modals.CREATE_CAR, (created) => {
			console.log(created);
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleEditCar = ({ detail }: CustomEvent) => {
		handleEdit(modalStore, Modals.EDIT_CAR, detail, (edited) => {
			console.log(edited);
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteCar = ({ detail }: CustomEvent) => {
		const target = `[${detail.plate_number}] ${detail.brand}`;
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, target, (deleted) => {
			console.log(deleted);
			toastSuccessfullyDeleted(toastStore);
		});
	};

	const handlePageChange = ({ detail }: CustomEvent) => {};
	const handleAmountChange = ({ detail }: CustomEvent) => {};
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
