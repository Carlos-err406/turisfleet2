<script lang="ts">
	import Table from '$lib/components/Table/Table.svelte';
	import { Modals } from '$lib/components/Modals';
	import { getFlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { ICarEdit } from '$lib/components/Modals/Car/EditCar.svelte';
	const data: any[] = [];
	const headers: string[] = [];
	const modalStore = getModalStore();
	const handleCreate = () => {
		modalStore.trigger({
			type: 'component',
			component: Modals.CREATE_CAR,
			meta: { flashes: getFlashStore() }
		});
	};
	const handleEdit = () => {
		const clickedCar: ICarEdit = {
			id_driver: 0
		};
		new Promise<any>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.EDIT_CAR,
				meta: { flashes: getFlashStore(), values: clickedCar },
				response: (r) => resolve(r)
			});
		}).then((r) => {
			console.log(r);
		});
	};
</script>

<div class="overflow-hidden">
	<Table tableName="Cars" {data} {headers} keys={headers} on:insert={handleCreate} />
</div>
<button class="btn variant-filled-primary" on:click={handleEdit}>show edit modal</button>
