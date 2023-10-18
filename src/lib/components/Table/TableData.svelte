<script lang="ts">
	import i18n from '$lib/i18n';
	import { downSimple, edit, trash } from '$lib/icons';
	import { actionsHeight, navHeight } from '$lib/stores';
	import type { PaginationStore } from '$lib/stores/pagination';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher, getContext } from 'svelte';
	import type { ColumnOrientation } from './Table.svelte';
	export let headers: string[];
	export let data: any[];
	let tableElement: HTMLTableElement;
	const dispatch = createEventDispatcher();

	const pagination: PaginationStore = getContext('pagination');

	const handleEdit = (item: (typeof data)[0]) => dispatch('edit', item);
	const handleDelete = (item: (typeof data)[0]) => dispatch('delete', item);
	const handleOrderByChange = (header: string) => {
		let orientation: ColumnOrientation = 'asc';
		const allButtons = tableElement.querySelectorAll('.order-by-button');
		const button = tableElement.querySelector(`#order-by-button-${header}`) as HTMLButtonElement;
		allButtons.forEach((b) => !button.isSameNode(b) && b.classList.remove('rotate-180'));
		orientation = button.classList.toggle('rotate-180') ? 'asc' : 'desc';
		dispatch('change-order', { header, orientation });
	};

	let paginationSettings: PaginationSettings = {
		page: Math.ceil($pagination.skip / $pagination.limit),
		limit: $pagination.limit,
		size: data.length,
		amounts: [10, 20, 50, 100, 200]
	};

	const footerFiller = () => {
		let filler = [];
		for (let i = 0; i < headers.length - 1; i++) {
			filler.push('');
		}
		return filler;
	};
</script>

<div
	class="table-wrapper border-surface-50 dark:!border-0"
	style="--nav-height: {$navHeight}px; --actions-height: {$actionsHeight}px"
>
	<table class="relative" bind:this={tableElement}>
		<thead class="sticky top-0">
			{#each headers as th}
				<th class="cursor-pointer" on:click={() => handleOrderByChange(th)}>
					<div class="flex items-center justify-start gap-0">
						<span class="px-2">{i18n.t(`table.header.${th}`) || `i18n - ${th}`}</span>
						<span
							id="order-by-button-{th}"
							tabindex="-1"
							class="order-by-button py-0 px-2 flex items-center gap-2 transition-transform duration-200"
						>
							{@html downSimple}
						</span>
					</div>
				</th>
			{/each}
			<th>
				<div class="flex items-center justify-end" />
			</th>
		</thead>
		<tbody>
			{#each data as tr}
				<tr class="bg-primary-hover-token">
					{#each headers as key}
						{#if tr[key]}
							<td>{tr[key]}</td>
						{:else}
							<td>-</td>
						{/if}
					{/each}
					<td class="">
						<div class="flex items-center justify-end gap-3">
							<button type="button" tabindex="-1" class="btn p-0" on:click={() => handleEdit(tr)}>
								{@html edit}
							</button>
							<button type="button" tabindex="-1" class="btn p-0" on:click={() => handleDelete(tr)}>
								{@html trash}
							</button>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
		<tfoot class="sticky bottom-0">
			<tr>
				<th>
					<div class="flex items-center gap-5">
						<span>Total</span>
						<span class="code">{data.length}</span>
					</div>
				</th>
				{#each footerFiller() as _}
					<td />
				{/each}
			</tr>
		</tfoot>
	</table>
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

<style>
	.table-wrapper {
		border-radius: 4px;
		border: 0.1rem solid;
		overflow-y: auto;
		margin-bottom: 10px;
		max-height: calc(100vh - var(--nav-height) - var(--actions-height) - 20px - 41px - 26px);
	}
</style>
