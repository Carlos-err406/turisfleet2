<script lang="ts">
	import {
		toastSuccessfullyCreated,
		toastSuccessfullyDeleted,
		toastSuccessfullyEdited
	} from '$lib';
	import { triggerErrorToast } from '$lib/CustomError';
	import { Modals, handleCreate, handleDelete, handleEdit } from '$lib/components/Modals';
	import Table from '$lib/components/Table/Table.svelte';
	import i18n from '$lib/i18n';
	import { requestService } from '$lib/services';
	import type { IRequest } from '$lib/services/RequestService';
	import { loading } from '$lib/stores';
	import {
		getPaginationStore,
		getQueryStringStore,
		getTotalElementsStore
	} from '$lib/stores/pagination';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount, setContext } from 'svelte';

	const toastStore = getToastStore();
	const modalStore = getModalStore();
	const paginationStore = getPaginationStore();
	const queryStore = getQueryStringStore();
	const totalElementsStore = getTotalElementsStore();

	setContext('pagination', paginationStore);
	setContext('totalElements', totalElementsStore);
	setContext('query', queryStore);
	let requests: IRequest[] = [];
	type FlattenDataType = IRequest & {
		car_flat: string;
		country: string;
		description: string;
		program_name: string;
		driver_flat: string;
		copilot_flat?: string;
	};
	let flattenData: FlattenDataType[] = [];
	const headers: (keyof FlattenDataType)[] = [
		'date',
		'return_date',
		'country',
		'description',
		'program_name',
		'tourist_amount',
		'car_flat',
		'driver_flat',
		'copilot_flat'
	];

	const getAll = async () => {
		$loading = true;
		try {
			const { data, total, page, page_size } = await requestService.getRequests(
				$paginationStore,
				$queryStore
			);
			requests = data;
			$totalElementsStore = total;
			$paginationStore.page = page;
			$paginationStore.page_size = page_size;
			flattenData = data.map((value) => ({
				...value,
				car_flat: `[${value.car.plate_number}] ${value.car.brand}`,
				country: value.group.country,
				description: value.specific_program.description,
				program_name: value.specific_program.program.program_name,
				driver_flat: `${value.driver.name}`,
				copilot_flat: value.copilot?.name
			}));
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
		$loading = false;
	};

	onMount(getAll);

	const handleCreateRequest = () => {
		handleCreate(modalStore, Modals.CREATE_REQUEST, async (created) => {
			await getAll();
			toastSuccessfullyCreated(toastStore);
		});
	};

	const handleEditRequest = ({ detail }: CustomEvent) => {
		handleEdit(modalStore, Modals.EDIT_REQUEST, detail, async (edited) => {
			await getAll();
			toastSuccessfullyEdited(toastStore);
		});
	};

	const handleDeleteRequest = ({ detail }: CustomEvent<IRequest>) => {
		const target = detail.date as string; //FIXME
		handleDelete(modalStore, Modals.DELETE_CONFIRMATION, target, async (deleted) => {
			$loading = true;
			try {
				await requestService.deleteRequest(detail.id_request);
				await getAll();
				toastSuccessfullyDeleted(toastStore);
			} catch (e) {
				triggerErrorToast(toastStore, e);
			}
			$loading = false;
		});
	};

	const handlePageChange = async ({ detail }: CustomEvent) => {
		paginationStore.gotoPage(detail + 1);
		await getAll();
	};
	const handleAmountChange = async ({ detail }: CustomEvent) => {
		paginationStore.setLimit(detail);
		await getAll();
	};
	const handleOrderChange = ({ detail }: CustomEvent) => {};
</script>

<div class="overflow-hidden">
	<Table
		data={flattenData}
		{headers}
		on:insert={handleCreateRequest}
		on:edit={handleEditRequest}
		on:delete={handleDeleteRequest}
		on:page={handlePageChange}
		on:amount={handleAmountChange}
		on:change-order={handleOrderChange}
		on:search={getAll}
	>
		<svelte:fragment slot="table-name">
			{i18n.t('title.requests')}
		</svelte:fragment>
	</Table>
</div>
