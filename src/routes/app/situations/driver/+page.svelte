<script lang="ts">
	import { Modals } from '$lib/components/Modals';
	import type { IDriverSituationEdit } from '$lib/components/Modals/Situation/EditSituationDriver.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import i18n from '$lib/i18n';
	import { getFlashStore } from '$lib/stores/flashes';
	import { tomorrow } from '$lib/utils';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import dayjs from 'dayjs';
	const modalStore = getModalStore();
	const data: any[] = [];
	const headers: string[] = [];
	const handleCreate = () => {
		new Promise<any>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.CREATE_SITUATION_DRIVER,
				meta: { flashes: getFlashStore() },
				response: (r) => resolve(r)
			});
		}).then((r) => {
			console.log(r);
		});
	};
	const handleEdit = () => {
		const clickedDriverSituation: IDriverSituationEdit = {
			driver_id_driver: 0,
			situation_id_situation: 0,
			date: tomorrow(),
			return_date: dayjs('Dic 20, 2023').toDate()
		};
		new Promise<any>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.EDIT_SITUATION_DRIVER,
				meta: { flashes: getFlashStore(), values: clickedDriverSituation },
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
			{i18n.t('title.driverSituations')}
		</svelte:fragment>
	</Table>
</div>
<button class="btn variant-filled-primary" on:click={handleEdit}>show edit modal</button>
