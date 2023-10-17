<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { trash } from '$lib/icons';
	import { page } from '$app/stores';
	export let items: any[] = [];

	let headers: string[] = [];
	let idColumn: string[] = [];
	const dispatch = createEventDispatcher();
	let itemToDelete: any = null;

	$: switch ($page.url.pathname) {
		case '/app/users':
			idColumn = ['id_user', 'id_role'];
			break;
		case '/app/cars':
			idColumn = ['id_car', 'id_driver'];
			break;
		case '/app/drivers':
			idColumn = ['id_driver'];
			break;
		case '/app/groups':
			idColumn = ['id_group'];
			break;
		case '/app/requests':
			idColumn = ['id_request', 'id_group', 'id_copilot', 'id_car', 'id_specific_program'];
			break;
		case '/app/situations':
			idColumn = ['id_situation'];
			break;
		case '/app/situations/car':
			idColumn = ['car_id_car', 'situation_id_situation'];
			break;
		case '/app/situations/driver':
			idColumn = ['driver_id_driver', 'situation_id_situation'];
			break;
		case '/app/programs':
			idColumn = ['id_program'];
			break;
		case '/app/programs/specific':
			idColumn = ['id_specific_program', 'id_program'];
			break;
		default:
			idColumn = [];
			break;
	}

	$: if (items && items.length > 0) {
		headers = Object.keys(items[0]);
	}
	const rowClicked = (item: any) => {
		dispatch('edit', item);
	};

	const deleteClicked = (item: any) => {
		dispatch('delete', item);
	};
</script>

<div class="table-container">
	<div class="table-wrapper">
		{#if items.length}
			<table>
				<thead>
					<tr>
						{#each headers as header}
							{#if !idColumn.includes(header) && header != 'disable' && header != 'disabled'}
								{@const h = header.split('_').join(' ')}
								<th>
									<p class="header-name">{h}</p>
								</th>
							{/if}
						{/each}
						<th class="actions-header" />
					</tr>
				</thead>
				<tbody>
					{#each items as item}
						<tr on:click={() => rowClicked(item)}>
							{#each Object.entries(item) as [key, value]}
								{#if !idColumn.includes(key) && key != 'disable' && key != 'disabled'}
									<td>
										{value === null ? '-' : value}
									</td>
								{/if}
							{/each}
							<td>
								<button
									tabindex="-1"
									on:click|capture|preventDefault|stopPropagation={() => deleteClicked(item)}
								>
									{@html trash}</button
								>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
</div>
