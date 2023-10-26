<script lang="ts">
	import type { DropdownOption } from '$lib/components/Inputs/Dropdown.svelte';
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import i18n from '$lib/i18n';
	import type { IRequest } from '$lib/services/RequestService';
	import type { FlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import dayjs from 'dayjs';
	import BaseForm from '../BaseForm.svelte';
	import ModalBase from '../ModalBase.svelte';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	let requests: IRequest[] = $modalStore[0].meta.requests;
	let requestsOptions: DropdownOption[] = requests.map((value) => ({
		label: `(${dayjs(value.date).format('YYYY-MM-DD')}) [${value.group.country}] ${
			value.specific_program.description
		}`,
		value: value.id_request
	}));
	let value: number = requests[0].id_request;

	const close = () => {
		modalStore.close();
	};
	const validate = () => {
		return true;
	};
	const select = () => {
		if (validate()) {
			$modalStore[0].response?.(requests.find((req) => req.id_request === value));
			close();
		}
	};
</script>

{#if $modalStore[0]}
	<ModalBase modalW="w-full">
		<BaseForm footerCols={1} {flashes} on:submit={select} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('label.reports.requestModifications')}</svelte:fragment>
			<div class="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
				<Dropdown
					options={requestsOptions}
					placeholder={i18n.t('placeholder.request')}
					bind:value
					required
				>
					{i18n.t('label.selectARequest')}
				</Dropdown>
			</div>
		</BaseForm>
	</ModalBase>
{/if}
