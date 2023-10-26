<script lang="ts">
	import i18n from '$lib/i18n';
	import type { FlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	import type { IUser, IUserChangePassword } from '$lib/services/UserService';
	import { triggerErrorFlash } from '$lib/CustomError';
	import { isAdmin, isSupport, loading, loggedUser } from '$lib/stores';
	import { userService } from '$lib/services';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	const user: IUser = $modalStore[0].meta.values;
	let confirmPassword: string = '';
	let values: IUserChangePassword = {
		old_password: '',
		new_password: ''
	};

	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		flashes.reset();
		if (values.new_password !== confirmPassword) {
			flashes.trigger({
				message: i18n.t('flashes.passwordsMustMatch'),
				type: 'error'
			});
			return false;
		}
		return true;
	};
	const change = async () => {
		if (validate()) {
			$loading = true;
			try {
				await userService.changePassword(user.id_user, values);
				flashes.trigger({
					message: i18n.t('flashes.passwordChanged'),
					type: 'success'
				});
				$modalStore[0].response?.(true);
				close();
			} catch (e) {
				triggerErrorFlash(flashes, e);
			}
			$loading = false;
		}
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={1} {flashes} on:submit={change} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.changePassword')}</svelte:fragment>
			<div class:hidden={$isAdmin || $isSupport}>
				<label class:required={!$isAdmin} for="user-edit-current-password">
					{i18n.t('label.currentPassword')}
				</label>
				<input
					required={!$isAdmin && !$isSupport}
					type="password"
					id="user-edit-current-password"
					placeholder={i18n.t('placeholder.currentPassword')}
					bind:value={values.old_password}
				/>
			</div>
			<div>
				<label class="required" for="user-edit-password">{i18n.t('label.newPassword')}</label>
				<input
					required
					type="password"
					id="user-edit-password"
					placeholder={i18n.t('placeholder.newPassword')}
					bind:value={values.new_password}
				/>
			</div>
			<div>
				<label class="required" for="user-edit-password-confirm">
					{i18n.t('label.confirmPassword')}
				</label>
				<input
					required
					type="password"
					id="user-edit-password-confirm"
					placeholder={i18n.t('placeholder.confirmPassword')}
					bind:value={confirmPassword}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
