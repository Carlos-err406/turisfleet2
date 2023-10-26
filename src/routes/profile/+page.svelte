<script lang="ts">
	import { goto } from '$app/navigation';
	import { toastSuccessfullyEdited } from '$lib';
	import { triggerErrorToast } from '$lib/CustomError';
	import { Modals, handleEdit } from '$lib/components/Modals';
	import type { CarAndDate } from '$lib/components/Modals/Reports/types';
	import PopupItem from '$lib/components/Popup/PopupItem.svelte';
	import Reports from '$lib/components/Popup/Reports.svelte';
	import { handleRoutingSheets } from '$lib/components/Popup/reports';
	import i18n from '$lib/i18n';
	import { avatar, edit } from '$lib/icons';
	import { carService, reportService } from '$lib/services';
	import type { ICar } from '$lib/services/CarService';
	import { isDriver, loading, loggedUser } from '$lib/stores';
	import { getFlashStore } from '$lib/stores/flashes';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	let modalStore = getModalStore();
	let toastStore = getToastStore();
	// let driverData: IDriver;
	// let userData: IUser;
	onMount(async () => {
		if (!$loggedUser) {
			await goto('/auth/login');
			return;
		}
		try {
			// $loading = true;
			// [userData] = await Promise.all([userService.getUser($loggedUser.id_user)]);
			// $loading = false;
			// [driver] = await Promise.all([
			// 	driverService.getDriver($loggedUser.id_user),
			// 	userService.getUser($loggedUser.id_user)
			// ]);
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
	});
	const handleEditClick = () => {
		handleEdit(modalStore, Modals.EDIT_USER, $loggedUser, async (edited) => {
			$loggedUser = edited;
			toastSuccessfullyEdited(toastStore);
		});
	};
</script>

<section class="relative h-full">
	<div class="m-3 absolute">
		<!-- {#if $isDriver}
			<PopupItem on:click={() => handleRoutingSheets(toastStore, modalStore)}
				>{i18n.t('label.reports.routingSheets')}</PopupItem
			>
		{/if} -->
	</div>
	<div class="flex items-center justify-center w-full h-full flex-col">
		{@html avatar}
		<span class="text-5xl pb-2 flex items-center gap-2">
			{$loggedUser?.username}
			<button class="btn p-0" type="button" on:click={handleEditClick}>{@html edit}</button>
		</span>
		<span class="text-2xl opacity-70 pb-2">{$loggedUser?.email}</span>
		<span class="text-2xl opacity-70 pb-2">{i18n.t(`label.${$loggedUser?.role}`)}</span>
	</div>
</section>
