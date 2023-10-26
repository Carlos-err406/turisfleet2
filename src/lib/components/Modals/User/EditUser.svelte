<script lang="ts">
	import { triggerErrorFlash } from '$lib/CustomError';
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import i18n from '$lib/i18n';
	import { userService } from '$lib/services';
	import type { IUser, IUserEdit } from '$lib/services/UserService';
	import { isAdmin } from '$lib/stores';
	import type { FlashStore } from '$lib/stores/flashes';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { Modals } from '..';
	import BaseForm from '../BaseForm.svelte';
	import FormFooter from '../FormFooter.svelte';
	import ModalBase from '../ModalBase.svelte';
	import { roles } from './user';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	const user: IUser = $modalStore[0].meta.values;
	const editedUser: IUserEdit = {
		username: user.username,
		role: user.role,
		email: user.email
	};
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const edit = async () => {
		if (validate()) {
			try {
				const updatedUser = await userService.editUser(user.id_user, editedUser);
				$modalStore[0].response?.(updatedUser);
				close();
			} catch (e) {
				triggerErrorFlash(flashes, e);
			}
		}
	};
	const triggerChangePassword = () => {
		const changePasswordSettings: ModalSettings = {
			type: 'component',
			component: Modals.CHANGE_PASSWORD,
			meta: { flashes, values: user }
		};
		$modalStore = [changePasswordSettings, ...$modalStore];
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={1} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.editUser')}</svelte:fragment>
			<div>
				<label class="required" for="user-edit-username">{i18n.t('label.username')}</label>
				<input
					required
					type="text"
					id="user-edit-username"
					placeholder={i18n.t('placeholder.username')}
					bind:value={editedUser.username}
				/>
			</div>
			<div>
				<label class="required" for="user-edit-email">{i18n.t('label.email')}</label>
				<input
					required
					type="text"
					id="user-edit-email"
					placeholder={i18n.t('placeholder.email')}
					bind:value={editedUser.email}
				/>
			</div>
			{#if $isAdmin}
				<Dropdown
					required
					options={roles}
					bind:value={editedUser.role}
					placeholder={i18n.t('placeholder.role')}
				>
					{i18n.t('label.role')}
				</Dropdown>
			{/if}
			<svelte:fragment slot="footer">
				<FormFooter>
					<button
						type="button"
						class="btn variant-outline-primary"
						on:click={triggerChangePassword}
					>
						<slot name="primary">{i18n.t('button.changePassword')}</slot>
					</button>
				</FormFooter>
			</svelte:fragment>
		</BaseForm>
	</ModalBase>
{/if}
