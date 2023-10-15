<script lang="ts">
	import { Modals } from '$lib/components/Modals';
	import type { IUserEdit } from '$lib/components/Modals/User/EditUser.svelte';
	import Table from '$lib/components/Table/Table.svelte';
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
	<Table tableName="Users" {data} {headers} keys={headers} on:insert={handleCreate} />
</div>
<button class="btn variant-filled-primary" on:click={handleEdit}>show edit modal</button>
