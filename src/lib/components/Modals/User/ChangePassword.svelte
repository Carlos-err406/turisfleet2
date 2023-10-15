<script context="module" lang="ts">
	export interface IChangePassword {
		password: string;
	}
</script>

<script lang="ts">
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	import FormFooter from '../FormFooter.svelte';
	import { Modals } from '..';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let currentPassword: string = '';
	let values: IChangePassword = {
		password: ''
	};
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		if (values.password !== currentPassword) {
			flashes.trigger({
				message: 'Passwords must match',
				type: 'error'
			});
			return false;
		}
		return true;
	};
	const edit = () => {
		console.log(values);
		if (validate()) {
			close();
		}
	};
</script>

{#if $modalStore[0]}
	<ModalBase modalW="w-modal-slim">
		<BaseForm footerCols={1} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">Change Password</svelte:fragment>
			<div>
				<label data-required="true" for="user-edit-current-password">Current password</label>
				<input
					required
					type="password"
					id="user-edit-current-password"
					placeholder="current password"
					bind:value={currentPassword}
				/>
			</div>
			<div>
				<label data-required="true" for="user-edit-password">New Password</label>
				<input
					required
					type="password"
					id="user-edit-password"
					placeholder="password"
					bind:value={values.password}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
