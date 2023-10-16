<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import Table from '$lib/components/Table/Table.svelte';
	import { Modals } from '$lib/components/Modals';
	import { getFlashStore } from '$lib/stores/flashes';
	import type { ISpecificProgramEdit } from '$lib/components/Modals/Program/EditProgramSpecific.svelte';
	import i18n from '$lib/i18n';
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
	const handleEdit = () => {
		const clickedSpecificProgram: ISpecificProgramEdit = {
			id_program: '',
			description: 'run4theh1111z',
			start: '13:30',
			duration: '1 days 6 hours 4 minutes',
			km: 100
		};
		new Promise<any>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.EDIT_PROGRAM_SPECIFIC,
				meta: { flashes: getFlashStore(), values: clickedSpecificProgram },
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
			{i18n.t('title.specificPrograms')}
		</svelte:fragment>
	</Table>
</div>
<button class="btn variant-filled-primary" on:click={handleEdit}>show edit modal</button>
