<script context="module" lang="ts">
	export type ColumnOrientation = 'asc' | 'desc';
</script>

<script lang="ts">
	import NoData from './NoData.svelte';
	import TableActions from './TableActions.svelte';
	import TableData from './TableData.svelte';
	export let headers: any[] = [];
	export let data: any[] = [];
</script>

<!-- disableSearch={data.length === 0} -->
<TableActions on:insert>
	<slot name="table-name" />
	<svelte:fragment slot="insert">
		<slot name="insert" />
	</svelte:fragment>
</TableActions>
{#if data.length > 0}
	<TableData bind:data bind:headers on:amount on:change-order on:delete on:edit on:page />
{:else}
	<NoData />
{/if}
