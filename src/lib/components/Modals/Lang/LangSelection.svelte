<script lang="ts">
	import Dropdown, { type DropdownOption } from '$lib/components/Inputs/Dropdown.svelte';
	import BaseForm from '$lib/components/Modals/BaseForm.svelte';
	import i18n from '$lib/i18n';
	import { lang } from '$lib/stores';
	import type { FlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ModalBase from '../ModalBase.svelte';
	import { LANGUAGES } from './langTypes';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	const options: DropdownOption[] = Object.entries(LANGUAGES).map(([key, value]) => ({
		value: key,
		label: value
	}));
	const close = () => {
		modalStore.close();
	};

	const handleSelect = () => {
		i18n.locale($lang);
		window.location.reload();
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={1} {flashes}>
			<svelte:fragment slot="title">{i18n.t('title.languageSelection')}</svelte:fragment>
			<Dropdown
				bind:value={$lang}
				placeholder={i18n.t('placeholder.language')}
				{options}
				on:change={handleSelect}
			>
				{i18n.t('label.language')}
			</Dropdown>
			<svelte:fragment slot="footer">
				<button type="button" class="btn variant-outline-primary" on:click={close}>
					<slot name="secondary">Close</slot>
				</button>
			</svelte:fragment>
		</BaseForm>
	</ModalBase>
{/if}
