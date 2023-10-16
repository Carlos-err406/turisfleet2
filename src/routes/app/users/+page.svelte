<script lang="ts">
	import { Modals } from '$lib/components/Modals';
	import type { IUserEdit } from '$lib/components/Modals/User/EditUser.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import i18n from '$lib/i18n';
	import { getFlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	const data: any[] = [];
	const headers: string[] = [];
	const handleCreate = () => {
		new Promise<any>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.CREATE_USER,
				meta: { flashes: getFlashStore() },
				response: (r) => resolve(r)
			});
		}).then((r) => {
			console.log(r);
		});
	};

	const handleEdit = () => {
		const clickedUser: IUserEdit = { username: 'charlie' };
		new Promise<any>((resolve) => {
			modalStore.trigger({
				type: 'component',
				component: Modals.EDIT_USER,
				meta: { flashes: getFlashStore(), values: clickedUser },
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
			{i18n.t('title.users')}
		</svelte:fragment>
	</Table>
</div>
<button class="btn variant-filled-primary" on:click={handleEdit}>show edit modal</button>
