<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import Table from '$lib/components/Table/Table.svelte';
	import { Modals } from '$lib/components/Modals';
	import { getFlashStore } from '$lib/stores/flashes';
	import type { ISituationEdit } from '$lib/components/Modals/Situation/EditSituation.svelte';
	const modalStore = getModalStore();
	const data: any[] = [];
	const headers: string[] = [];
	const handleCreate = () => {
		new Promise<any>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.CREATE_SITUATION,
				meta: { flashes: getFlashStore() },
				response: (r) => resolve(r)
			});
		}).then((r) => {
			console.log(r);
		});
	};
	const handleEdit = () => {
		const clickedSituation: ISituationEdit = {
			situation_name: 'Howling',
			situation_type: 'C'
		};
		new Promise<any>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.EDIT_SITUATION,
				meta: { flashes: getFlashStore(), values: clickedSituation },
				response: (r) => resolve(r)
			});
		}).then((r) => {
			console.log(r);
		});
	};
</script>

<div class="overflow-hidden">
	<Table tableName="Situations" {data} {headers} keys={headers} on:insert={handleCreate} />
</div>
<button class="btn variant-filled-primary" on:click={handleEdit}>show edit modal</button>
