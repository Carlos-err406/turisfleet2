<script lang="ts">
	import i18n from '$lib/i18n';
	import type { FlashStore } from '$lib/stores/flashes';
	import Flashes from './../Flash/Flashes.svelte';
	import FormFooter from './FormFooter.svelte';
	export let flashes: FlashStore;
	export let footerCols = 1;
</script>

<div class="grid gap-y-3">
	<h3 class="text-3xl"><slot name="title" /></h3>
	<Flashes {flashes} />
	<form
		action=""
		autocomplete="off"
		class="grid gap-y-4 grid-cols-{footerCols} gap-x-3"
		on:submit|preventDefault
	>
		<slot />
		<div
			class="flex items-center justify-end w-full mt-2 gap-3 font-semibold col-span-{footerCols} "
		>
			<slot name="footer">
				<FormFooter on:primary on:secondary>
					<svelte:fragment slot="secondary">
						<slot name="secondary">{i18n.t('button.cancel')}</slot>
					</svelte:fragment>
					<svelte:fragment slot="primary">
						<slot name="primary">{i18n.t('button.submit')}</slot>
					</svelte:fragment>
				</FormFooter>
			</slot>
		</div>
	</form>
</div>
