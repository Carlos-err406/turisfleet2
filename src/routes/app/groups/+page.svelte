<script lang="ts">
	import { Modals } from '$lib/components/Modals';
	import type { IGroupEdit } from '$lib/components/Modals/Group/EditGroup.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import { getFlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import countries from '$data/countries.json';
	import i18n from '$lib/i18n';
	const data: any[] = [];
	const headers: string[] = [];
	const modalStore = getModalStore();
	const handleCreate = () => {
		modalStore.trigger({
			type: 'component',
			component: Modals.CREATE_GROUP,
			meta: { flashes: getFlashStore() }
		});
	};
	const handleEdit = () => {
		const clickedGroup: IGroupEdit = {
			country: countries[0].value,
			tourist_amount: 10
		};
		new Promise<any>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.EDIT_GROUP,
				meta: { flashes: getFlashStore(), values: clickedGroup },
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
			{i18n.t('title.groups')}
		</svelte:fragment>
	</Table>
</div>
<button class="btn variant-filled-primary" on:click={handleEdit}>show edit modal</button>
