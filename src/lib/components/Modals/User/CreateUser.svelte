<script context="module" lang="ts">
	export interface UserCreate {
		username: string;
		password: string;
		id_role: number;
	}
</script>

<script lang="ts">
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ModalBase from '../ModalBase.svelte';
	import BaseForm from '../BaseForm.svelte';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let passwordConf = '';
	let values: UserCreate = {
		username: '',
		password: '',
		id_role: 1
	};
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		if (passwordConf !== values.password) {
			flashes.trigger({
				message: 'Passwords must match',
				type: 'error'
			});
			return false;
		}
		return true;
	};
	const create = () => {
		validate() && console.log(values);
	};

	function onRoleSelection({ detail }: CustomEvent): void {
		values.id_role = detail;
	}
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">Create User</svelte:fragment>
			<div>
				<label for="user-create-username">Username</label>
				<input
					required
					type="text"
					id="user-create-username"
					placeholder="username"
					bind:value={values.username}
				/>
			</div>
			<Dropdown required options={[]} on:select={onRoleSelection} placeholder="role">Role</Dropdown>
			<div>
				<label for="user-create-password">Password</label>
				<input
					required
					type="password"
					id="user-create-password"
					bind:value={values.password}
					placeholder="password"
				/>
			</div>
			<div>
				<label for="user-create-password-conf">Password confirmation</label>
				<input
					required
					type="password"
					id="user-create-password-conf"
					bind:value={passwordConf}
					placeholder="password confirmation"
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
