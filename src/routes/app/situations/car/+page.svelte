<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import Table from '$lib/components/Table/Table.svelte';
	import { Modals } from '$lib/components/Modals';
	import { getFlashStore } from '$lib/stores/flashes';
	import type { ICarSituationEdit } from '$lib/components/Modals/Situation/EditSituationCar.svelte';
	import { tomorrow } from '$lib/utils';
	import dayjs from 'dayjs';
	const modalStore = getModalStore();
	const data: any[] = [];
	const headers: string[] = [];
	const handleCreate = () => {
		new Promise<any>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.CREATE_SITUATION_CAR,
				meta: { flashes: getFlashStore() },
				response: (r) => resolve(r)
			});
		}).then((r) => {
			console.log(r);
		});
	};

	const handleEdit = () => {
		const clickedCarSituation: ICarSituationEdit = {
			car_id_car: 0,
			situation_id_situation: 0,
			date: tomorrow(),
			return_date: dayjs('Dic 20, 2023').toDate()
		};
		new Promise<any>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.EDIT_SITUATION_CAR,
				meta: { flashes: getFlashStore(), values: clickedCarSituation },
				response: (r) => resolve(r)
			});
		}).then((r) => {
			console.log(r);
		});
	};
</script>

<div class="overflow-hidden">
	<Table tableName="Car Situations" {data} {headers} keys={headers} on:insert={handleCreate} />
</div>
<button class="btn variant-filled-primary" on:click={handleEdit}>show edit modal</button>
