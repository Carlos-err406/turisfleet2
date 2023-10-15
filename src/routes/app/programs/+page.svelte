<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import Table from '$lib/components/Table/Table.svelte';
	import { Modals } from '$lib/components/Modals';
	import { getFlashStore } from '$lib/stores/flashes';
	import type { IRequestEdit } from '$lib/components/Modals/Request/EditRequest.svelte';
	import type { IProgramEdit } from '$lib/components/Modals/Program/editProgram.svelte';
	const modalStore = getModalStore();
	const data: any[] = [];
	const headers: string[] = [];
	const handleCreate = () => {
		new Promise<any>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.CREATE_PROGRAM,
				meta: { flashes: getFlashStore() },
				response: (r) => resolve(r)
			});
		}).then((r) => {
			console.log(r);
		});
	};
	const handleEdit = () => {
		const clickedProgram: IProgramEdit = {
			name: 'Viñales'
		};
		new Promise<any>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.EDIT_PROGRAM,
				meta: { flashes: getFlashStore(), values: clickedProgram },
				response: (r) => resolve(r)
			});
		}).then((r) => {
			console.log(r);
		});
	};
</script>

<div class="overflow-hidden">
	<Table tableName="Programs" {data} {headers} keys={headers} on:insert={handleCreate} />
</div>
<button class="btn variant-filled-primary" on:click={handleEdit}>show edit modal</button>
