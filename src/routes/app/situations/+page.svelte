<script lang="ts">
	import {
		toastSuccessfullyCreated,
		toastSuccessfullyDeleted,
		toastSuccessfullyEdited
	} from '$lib';
	import { Modals, handleCreate, handleDelete, handleEdit } from '$lib/components/Modals';
	import Table, { type ColumnOrientation } from '$lib/components/Table/Table.svelte';
	import i18n from '$lib/i18n';
	import { situationService } from '$lib/services';
	import type { ISituation } from '$lib/services/SituationService';
	import { loading } from '$lib/stores';
	import { getPaginationStore } from '$lib/stores/pagination';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount, setContext } from 'svelte';
	const toastStore = getToastStore();
	const paginationStore = getPaginationStore();
	const modalStore = getModalStore();
	setContext('pagination', paginationStore);
	type FlattenDataType = ISituation & { situation_type_i18n: string };
	let data: ISituation[] = [];
	let flattenData: FlattenDataType[] = [];

	const headers: (keyof FlattenDataType)[] = ['situation_name', 'situation_type_i18n'];

	const getAll = async () => {
		$loading = true;
		try {
			data = await situationService.getSituations($paginationStore);
			flattenData = data.map((value) => ({
				...value,
				situation_type_i18n: i18n.t(`label.${value.situation_type}`)
			}));
		} catch (e) {}
		$loading = false;
	};

	onMount(getAll);

	const handleCreateSituation = () => {
		handleCreate(modalStore, Modals.CREATE_SITUATION, (created) => {
			console.log(created);
			getAll();
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleEditSituation = ({ detail }: CustomEvent<ISituation>) => {
		handleEdit(modalStore, Modals.EDIT_SITUATION, detail, (edited) => {
			console.log(edited);
			getAll();
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteSituation = ({ detail }: CustomEvent<ISituation>) => {
		console.log(detail.situation_name);
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, detail.situation_name, async (deleted) => {
			console.log(deleted);
			$loading = true;
			try {
				await situationService.deleteSituation(detail.id_situation);
				getAll();
				toastSuccessfullyDeleted(toastStore);
			} catch (e) {}
			$loading = false;
		});
	};
	const handlePageChange = ({ detail }: CustomEvent) => {};
	const handleAmountChange = ({ detail }: CustomEvent) => {};
	const handleOrderChange = ({
		detail
	}: CustomEvent<{ header: keyof FlattenDataType; orientation: ColumnOrientation }>) => {
		let header: keyof ISituation;
		switch (detail.header) {
			case 'situation_type_i18n':
				header = 'situation_type';
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
		on:insert={handleCreateSituation}
		on:edit={handleEditSituation}
		on:delete={handleDeleteSituation}
		on:page={handlePageChange}
		on:amount={handleAmountChange}
		on:change-order={handleOrderChange}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.situations')}
		</svelte:fragment>
	</Table>
</div>
