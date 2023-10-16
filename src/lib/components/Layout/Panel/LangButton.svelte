<script lang="ts">
	import { Modals } from '$lib/components/Modals';
	import i18n from '$lib/i18n';
	import { globe } from '$lib/icons';
	import { lang } from '$lib/stores';
	import { getFlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	const handleClick = () => {
		modalStore.trigger({
			type: 'component',
			component: Modals.LANGUAGE_SELECTION,
			meta: { flashes: getFlashStore() }
		});
	};
</script>

<button
	on:click={handleClick}
	type="button"
	class="btn flex flex-col text-xs font-semibold items-center app-rail-wrapper bg-primary-hover-token"
>
	{@html globe}
	{i18n.t('button.lang')} ({$lang})
</button>
