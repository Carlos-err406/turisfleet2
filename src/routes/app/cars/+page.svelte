<script lang="ts">
	import Table from '$lib/components/Table/Table.svelte';
	import { Modals } from '$lib/components/Modals';
	import { getFlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
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
</script>

<div class="overflow-hidden">
	<Table tableName="Cars" {data} {headers} keys={headers} on:insert={handleCreate} />
</div>
