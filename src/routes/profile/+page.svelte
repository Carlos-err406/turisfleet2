<script lang="ts">
	import { goto } from '$app/navigation';
	import { toastSuccessfullyEdited } from '$lib';
	import Avatar from '$lib/components/Icons/Avatar.svelte';
	import Edit from '$lib/components/Icons/Edit.svelte';
	import { Modals, handleEdit } from '$lib/components/Modals';
	import i18n from '$lib/i18n';
	import { loggedUser } from '$lib/stores';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	let modalStore = getModalStore();
	let toastStore = getToastStore();
	onMount(async () => {
		if (!$loggedUser) {
			await goto('/auth/login');
			return;
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
	<div class="m-3 absolute" />
	<div class="flex items-center justify-center w-full h-full flex-col">
		<Avatar />
		<span class="text-5xl pb-2 flex items-center gap-2">
			{$loggedUser?.username}
			<button class="btn p-0" type="button" on:click={handleEditClick}><Edit /></button>
		</span>
		<span class="text-2xl opacity-70 pb-2">{$loggedUser?.email}</span>
		<span class="text-2xl opacity-70 pb-2">{i18n.t(`label.${$loggedUser?.role}`)}</span>
	</div>
</section>
