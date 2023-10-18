<script lang="ts">
	import i18n from '$lib/i18n';
	import type { IUser } from '$lib/services/UserService';
	import type { FlashStore } from '$lib/stores/flashes';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { Modals } from '..';
	import BaseForm from '../BaseForm.svelte';
	import FormFooter from '../FormFooter.svelte';
	import ModalBase from '../ModalBase.svelte';
	import { userService } from '$lib/services';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	const values: IUser = $modalStore[0].meta.values;
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const edit = async () => {
		if (validate()) {
			const user = await userService.editUser(values.id_user, values);
			$modalStore[0].response?.(user);
			close();
		}
	};
	const triggerChangePassword = () => {
		const changePasswordSettings: ModalSettings = {
			type: 'component',
			component: Modals.CHANGE_PASSWORD,
			meta: { flashes, values }
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
						<slot name="primary">{i18n.t('button.changePassword')}</slot>
					</button>
				</FormFooter>
			</svelte:fragment>
		</BaseForm>
	</ModalBase>
{/if}
