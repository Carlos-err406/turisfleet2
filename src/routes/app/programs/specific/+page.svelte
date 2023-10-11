<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import Table from '$components/Table/Table.svelte';
	import { Modals } from '$lib';
	import { getFlashStore } from '$lib/stores/flashes';
	const modalStore = getModalStore();
	const data: any[] = [];
	const headers: string[] = [];
	const handleCreate = () => {
		new Promise<any>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.CREATE_PROGRAM_SPECIFIC,
				meta: { flashes: getFlashStore() },
				response: (r) => resolve(r)
			});
		}).then((r) => {
			console.log(r);
		});
	};
</script>

<div class="overflow-hidden">
	<Table tableName="Specific programs" {data} {headers} keys={headers} on:insert={handleCreate} />
</div>
