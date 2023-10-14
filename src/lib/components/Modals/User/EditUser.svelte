<script context="module" lang="ts">
	export interface IUserEdit {
		username: string;
	}
</script>

<script lang="ts">
	import type flashStore from '$lib/stores/flashes';
	import { getFlashStore } from '$lib/stores/flashes';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { Modals } from '..';
	import BaseForm from '../BaseForm.svelte';
	import FormFooter from '../FormFooter.svelte';
	import ModalBase from '../ModalBase.svelte';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	const values: IUserEdit = $modalStore[0].meta.values;
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const edit = () => {
		validate() && console.log(values);
	};
	const triggerChangePassword = () => {
		const changePasswordSettings: ModalSettings = {
			type: 'component',
			component: Modals.CHANGE_PASSWORD,
			meta: { flashes: getFlashStore() }
		};
		$modalStore = [changePasswordSettings, ...$modalStore];
	};
</script>

{#if $modalStore[0]}
	<ModalBase modalW="w-modal-slim">
		<BaseForm footerCols={1} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">Edit User</svelte:fragment>
			<div>
				<label for="user-edit-username">Username</label>
				<input
					required
					type="text"
					id="user-edit-username"
					placeholder="username"
					bind:value={values.username}
				/>
			</div>
			<svelte:fragment slot="footer">
				<FormFooter>
					<button
						type="button"
						class="btn variant-outline-primary"
						on:click={triggerChangePassword}
					>
						<slot name="primary">Change Password</slot>
					</button>
				</FormFooter>
			</svelte:fragment>
		</BaseForm>
	</ModalBase>
{/if}
