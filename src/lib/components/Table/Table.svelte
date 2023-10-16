<script lang="ts">
	import { downSimple } from '$lib/icons';
	import { actionsHeight, navHeight } from '$lib/stores';
	import type { PaginationSettings, TableSource } from '@skeletonlabs/skeleton';
	import { Paginator, Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import { onDestroy, onMount } from 'svelte';
	import NoData from './NoData.svelte';
	import TableActions from './TableActions.svelte';

	export let headers: string[] = [];
	export let keys: string[] = [];
	export let data: any[] = [];
	let removeListenerFunctions: (() => void)[] = [];
	onMount(() => {
		setOrderClickListeners();
	});

	onDestroy(() => removeListenerFunctions.forEach((removeFunction) => removeFunction()));

	const setOrderClickListeners = () => {
		const allTableHeaderWrappers = document.querySelectorAll<HTMLDivElement>(
			'thead tr th div.table-header-wrapper'
		);
		allTableHeaderWrappers.forEach((div) => {
			div.addEventListener('click', orderClickListener);
			removeListenerFunctions.push(() => div.removeEventListener('click', orderClickListener));
		});
	};
	const orderClickListener = (e: Event) => {
		const div = e.currentTarget as HTMLDivElement;
		const button = div.querySelector<HTMLButtonElement>('button');
		const clickedColumn = div.dataset.title;
		button && switchOrderButtonOrientation(button);
		console.log('switch order of column:', clickedColumn);
	};
	const switchOrderButtonOrientation = (button: HTMLButtonElement) => {
		button.classList.contains('rotate-180')
			? button.classList.remove('rotate-180')
			: button.classList.add('rotate-180');
	};

	const header = (title: string) => `
	<div class="flex gap-2 items-center justify-start table-header-wrapper" id="table-header-${title}-wrapper" data-title="${title}"> 
		<span id="column-${title}-title" class="table-column-title">${title}</span> 
		<button tabindex="-1" type="button" class="btn transition-all duration-200 table-header-order-button outline-none p-0" id="table-header-${title}-order-button">
			${downSimple}
		</button>
	</div>`;

	const tableTotal = (total: number) => `<code class="code">${total}</code>`;
	const fillFooter = (body: any[]) => body[0].map((_: string) => '').slice(2);
	const parseForTable = (): TableSource => {
		let head: string[] = [];
		let body: any[] = [];
		let foot: string[] = [];
		let meta: any[] = [];
		if (data.length) {
			head = [...headers.map(header)];
			body = tableMapperValues(data, keys);
			meta = tableMapperValues(data, ['id']);
			foot = ['Total', tableTotal(body.length), ...fillFooter(body)];
		}
		return { head, body, foot, meta };
	};

	let source: TableSource = parseForTable();
	let paginationSettings = {
		page: 0,
		limit: 10,
		size: source.body.length,
		amounts: [10, 20, 50, 100, 200]
	} satisfies PaginationSettings;
</script>

<TableActions disableSearch={source.body.length === 0} on:insert>
	<slot name="table-name" />
	<svelte:fragment slot="insert">
		<slot name="insert" />
	</svelte:fragment>
</TableActions>
{#if source.body.length > 0}
	<div
		class="table-wrapper border-surface-50 dark:!border-0"
		style="--nav-height: {$navHeight}px; --actions-height: {$actionsHeight}px"
	>
		<Table {source} class="table-compact table-interactive" interactive on:selected />
	</div>
	<Paginator
		select="select min-w-[150px] w-fit outline-none"
		regionControl="min-w-fit btn-group !mt-0"
		class="!flex-row"
		bind:settings={paginationSettings}
		showNumerals
		maxNumerals={5}
		on:page
		on:amount
	/>
{:else}
	<NoData />
{/if}

<style>
	.table-wrapper {
		border-radius: 4px;
		border: 0.1rem solid;
		overflow-y: auto;
		margin-bottom: 10px;
		max-height: calc(100vh - var(--nav-height) - var(--actions-height) - 20px - 41px - 26px);
	}
</style>
