<script lang="ts">
	export let modalW: 'w-modal' | 'w-modal-slim' | 'w-modal-wide' = 'w-modal';
</script>

<div
	class="bg-surface-50-900-token {modalW} h-auto max-h-[95vh] p-4 rounded-container-token shadow-xl overflow-auto"
>
	<slot />
</div>
