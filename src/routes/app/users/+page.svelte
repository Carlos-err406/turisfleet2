<script lang="ts">
	import {
		toastSuccessfullyCreated,
		toastSuccessfullyDeleted,
		toastSuccessfullyEdited
	} from '$lib';
	import { Modals, handleCreate, handleDelete, handleEdit } from '$lib/components/Modals';
	import Table, { type ColumnOrientation } from '$lib/components/Table/Table.svelte';
	import i18n from '$lib/i18n';
	import { userService } from '$lib/services';
	import type { IUser } from '$lib/services/UserService';
	import { loading } from '$lib/stores';
	import { getPaginationStore } from '$lib/stores/pagination';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount, setContext } from 'svelte';
	const toastStore = getToastStore();
	const modalStore = getModalStore();
	const paginationStore = getPaginationStore();
	setContext('pagination', paginationStore);
	type FlattenDataType = IUser & { role_i18n: string };
	let data: IUser[] = [];
	let flattenData: FlattenDataType[] = [];
	const headers: (keyof FlattenDataType)[] = ['username', 'role_i18n'];

	const getAll = async () => {
		$loading = true;
		try {
			data = await userService.getUsers($paginationStore);
			flattenData = data.map((value) => ({ ...value, role_i18n: i18n.t(`label.${value.role}`) }));
		} catch (e) {}
		$loading = false;
	};

	onMount(getAll);

	const handleCreateUser = () => {
		handleCreate(modalStore, Modals.CREATE_USER, (created) => {
			console.log(created);
			toastSuccessfullyCreated(toastStore);
			getAll();
		});
	};

	const handleEditUser = ({ detail }: CustomEvent<IUser>) => {
		handleEdit(modalStore, Modals.EDIT_USER, detail, (edited) => {
			console.log(edited);
			getAll();
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteUser = ({ detail }: CustomEvent<IUser>) => {
		const target = detail.username;
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, target, async (deleted) => {
			console.log(detail);
			$loading = true;
			try {
				await userService.deleteUser(detail.id_user);
				getAll();
				toastSuccessfullyDeleted(toastStore);
			} catch (e) {}
			$loading = false;
		});
	};

	const handlePageChange = ({ detail }: CustomEvent) => {
		paginationStore.gotoPage(detail);
		getAll();
	};
	const handleAmountChange = ({ detail }: CustomEvent) => {
		paginationStore.setLimit(detail);
		getAll();
	};
	const handleOrderChange = ({
		detail
	}: CustomEvent<{ header: keyof FlattenDataType; orientation: ColumnOrientation }>) => {
		let header: keyof IUser;
		switch (detail.header) {
			case 'role_i18n':
				header = 'role';
				break;
			default:
				header = detail.header;
		}
	};
</script>

<div class="overflow-hidden">
	<Table
		data={flattenData}
		{headers}
		on:insert={handleCreateUser}
		on:edit={handleEditUser}
		on:delete={handleDeleteUser}
		on:page={handlePageChange}
		on:amount={handleAmountChange}
		on:change-order={handleOrderChange}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.users')}
		</svelte:fragment>
	</Table>
</div>
