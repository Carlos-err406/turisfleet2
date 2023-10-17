<script lang="ts">
	import i18n from '$lib/i18n';
	import { downSimple, edit, trash } from '$lib/icons';
	import { actionsHeight, navHeight } from '$lib/stores';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	export let headers: string[];
	export let data: any[];
	let tableElement: HTMLTableElement;
	const dispatch = createEventDispatcher();

	const handleEdit = (item: (typeof data)[0]) => dispatch('edit', item);
	const handleDelete = (item: (typeof data)[0]) => dispatch('delete', item);
	const handleOrderByChange = (header: string) => {
		const button = tableElement.querySelector(`#order-by-button-${header}`);
		if (button)
			button.classList.contains('rotate-180')
				? button.classList.remove('rotate-180')
				: button?.classList.add('rotate-180');
		dispatch('change-order', header);
	};

	let paginationSettings = {
		page: 0,
		limit: 20,
		size: data.length,
		amounts: [10, 20, 50, 100, 200]
	} satisfies PaginationSettings;
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
							class="py-0 px-2 flex items-center gap-2 transition-transform duration-200"
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
					{#each Object.entries(tr) as [key, value]}
						{#if value}
							<td>{value}</td>
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
				{#each Object.keys(data[0]) as _}
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
