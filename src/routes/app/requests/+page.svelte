<script lang="ts">
	import { Modals } from '$lib/components/Modals';
	import type { IRequestEdit } from '$lib/components/Modals/Request/EditRequest.svelte';
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
				component: Modals.CREATE_REQUEST,
				meta: { flashes: getFlashStore() },
				response: (r) => resolve(r)
			});
		}).then((r) => {
			console.log(r);
		});
	};
	const handleEdit = () => {
		const clickedRequest: IRequestEdit = {
			id_car: 0,
			id_copilot: 0,
			date: dayjs().format('YYYY-MM-DD'),
			id_specific_program: 0,
			tourist_amount: 10
		};
		new Promise<any>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.EDIT_REQUEST,
				meta: { flashes: getFlashStore(), values: clickedRequest },
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
			{i18n.t('title.requests')}
		</svelte:fragment>
	</Table>
</div>
<button class="btn variant-filled-primary" on:click={handleEdit}>show edit modal</button>
