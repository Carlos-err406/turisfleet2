<script lang="ts">
	import Table from '$lib/components/Table/Table.svelte';
	import { Modals } from '$lib/components/Modals';
	import { getFlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { IDriverEdit } from '$lib/components/Modals/Driver/EditDriver.svelte';
	import { LicenseCategory } from '$lib/types/LicenseTypes';
	import i18n from '$lib/i18n';
	const data: any[] = [];
	const headers: string[] = [];
	const modalStore = getModalStore();
	const handleCreate = () => {
		modalStore.trigger({
			type: 'component',
			component: Modals.CREATE_DRIVER,
			meta: { flashes: getFlashStore() }
		});
	};
	const handleEdit = () => {
		const clickedDriver: IDriverEdit = {
			address: "this driver's address",
			id_number: '01060568481',
			id_categories: [LicenseCategory.A, LicenseCategory.B, LicenseCategory.C],
			name: 'Carlos'
		};
		new Promise<any>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.EDIT_DRIVER,
				meta: { flashes: getFlashStore(), values: clickedDriver },
				response: (r) => resolve(r)
			});
		}).then((r) => {
			console.log(r);
		});
	};
</script>

<div class="overflow-hidden">
	<Table {data} {headers} keys={headers} on:insert={handleCreate}>
		<svelte:fragment slot="table-name">
			{i18n.t('title.drivers')}
		</svelte:fragment>
	</Table>
</div>

<button class="btn variant-filled-primary" on:click={handleEdit}>show edit modal</button>
