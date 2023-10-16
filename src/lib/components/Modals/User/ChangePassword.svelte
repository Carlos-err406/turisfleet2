<script context="module" lang="ts">
	export interface IChangePassword {
		password: string;
	}
</script>

<script lang="ts">
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	import i18n from '$lib/i18n';
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
		flashes.reset();
		if (values.password !== currentPassword) {
			flashes.trigger({
				message: i18n.t('flashes.passwordsMustMatch'),
				type: 'error'
			});
			return false;
		}
		return true;
	};
	const change = () => {
		if (validate()) {
			flashes.trigger({
				message: i18n.t('flashes.passwordChanged'),
				type: 'success'
			});
			$modalStore[0].response?.(true);
			close();
		}
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={1} {flashes} on:submit={change} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.changePassword')}</svelte:fragment>
			<div>
				<label data-required="true" for="user-edit-current-password">
					{i18n.t('label.currentPassword')}
				</label>
				<input
					required
					type="password"
					id="user-edit-current-password"
					placeholder={i18n.t('placeholder.currentPassword')}
					bind:value={currentPassword}
				/>
			</div>
			<div>
				<label data-required="true" for="user-edit-password">{i18n.t('label.newPassword')}</label>
				<input
					required
					type="password"
					id="user-edit-password"
					placeholder={i18n.t('placeholder.newPassword')}
					bind:value={values.password}
				/>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
