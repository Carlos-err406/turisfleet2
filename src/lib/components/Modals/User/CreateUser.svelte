<script lang="ts">
	import { triggerErrorFlash } from '$lib/CustomError';
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import i18n from '$lib/i18n';
	import { userService } from '$lib/services';
	import type { IUserCreate } from '$lib/services/UserService';
	import type { FlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	import { roles } from './user';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	let passwordConf = '';
	let values: IUserCreate = {
		username: '',
		password: '',
		role: roles[0].value,
		email: ''
	};
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		if (passwordConf !== values.password) {
			flashes.trigger({
				message: i18n.t('flashes.passwordsMustMatch'),
				type: 'error'
			});
			return false;
		}
		if (userService.validateEmail(values.email)) {
			flashes.trigger({
				message: i18n.t('flashes.invalidEmail'),
				type: 'error'
			});
			return false;
		}
		return true;
	};
	const create = async () => {
		if (validate()) {
			try {
				const user = await userService.createUser(values);
				$modalStore[0].response?.(user);
				close();
			} catch (e) {
				triggerErrorFlash(flashes, e);
			}
		}
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.createUser')}</svelte:fragment>
			<div>
				<label class="required" for="user-create-username">{i18n.t('label.username')}</label>
				<input
					required
					type="text"
					id="user-create-username"
					placeholder={i18n.t('placeholder.username')}
					bind:value={values.username}
				/>
			</div>
			<div>
				<label class="required" for="user-create-email">{i18n.t('label.email')}</label>
				<input
					required
					type="email"
					id="user-create-email"
					placeholder={i18n.t('placeholder.email')}
					bind:value={values.email}
				/>
			</div>
			<Dropdown
				required
				options={roles}
				bind:value={values.role}
				placeholder={i18n.t('placeholder.role')}
			>
				{i18n.t('label.role')}
			</Dropdown>
			<div>
				<label class="required" for="user-create-password">{i18n.t('label.password')}</label>
				<input
					required
					type="password"
					id="user-create-password"
					bind:value={values.password}
					placeholder={i18n.t('placeholder.password')}
				/>
			</div>
			<div>
				<label class="required" for="user-create-password-conf"
					>{i18n.t('label.passwordConfirmation')}</label
				>
				<input
					required
					type="password"
					id="user-create-password-conf"
					bind:value={passwordConf}
					placeholder={i18n.t('placeholder.passwordConfirmation')}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
