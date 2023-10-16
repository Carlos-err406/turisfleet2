<script lang="ts">
	import Dropdown, { type DropdownOptions } from '$lib/components/Inputs/Dropdown.svelte';
	import BaseForm from '$lib/components/Modals/BaseForm.svelte';
	import i18n from '$lib/i18n';
	import { lang } from '$lib/stores';
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ModalBase from '../ModalBase.svelte';
	import { LANGUAGES } from './langTypes';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	const options: DropdownOptions[] = Object.entries(LANGUAGES).map(([key, value]) => ({
		value: key,
		label: value
	}));
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const select = () => {
		validate() && console.log($lang);
	};

	const onLanguageSelection = ({ detail }: CustomEvent) => {
		$lang = detail;
		i18n.locale($lang);
		window.location.reload();
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={1} {flashes}>
			<svelte:fragment slot="title">{i18n.t('title.languageSelection')}</svelte:fragment>
			<Dropdown
				event="click"
				placeholder={i18n.t('placeholder.language')}
				{options}
				on:select={onLanguageSelection}
			>
				{i18n.t('label.language')}
			</Dropdown>
			<!-- input={LANGUAGES[$lang]} -->
			<svelte:fragment slot="footer">
				<button type="button" class="btn variant-outline-primary" on:click={close}>
					<slot name="secondary">Close</slot>
				</button>
			</svelte:fragment>
		</BaseForm>
	</ModalBase>
{/if}
