<script lang="ts">
	//FIXME
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import DurationInput, {
		durationObjToStr,
		durationStrToObj,
		type DurationInputValue
	} from '$lib/components/Inputs/DurationInput.svelte';
	import ModalBase from '$lib/components/Modals/ModalBase.svelte';
	import i18n from '$lib/i18n';
	import type { ISpecificProgramEdit } from '$lib/services/ProgramService';
	import type { FlashStore } from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	const modalStore = getModalStore();
	const flashes: FlashStore = $modalStore[0].meta.flashes;
	let values: ISpecificProgramEdit = $modalStore[0].meta.values;
	let durationObj: DurationInputValue = durationStrToObj(values.duration);
	const close = () => {
		modalStore.close();
	};

	const validate = () => {
		return true;
	};
	const parse = () => {
		const durationStr = durationObjToStr(durationObj);
		values.duration = durationStr;
	};
	const edit = () => {
		parse();
		validate() && console.log(values);
	};
	const onProgramSelection = ({ detail }: CustomEvent) => {
		values.id_program = detail;
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={edit} on:secondary={close}>
			<svelte:fragment slot="title">{i18n.t('title.editSpecificProgram')}</svelte:fragment>
			<Dropdown placeholder={i18n.t('placeholder.program')} required options={[]} on:select>
				{i18n.t('label.program')}
			</Dropdown>
			<div>
				<label class="required" for="specific-program-edit-description">
					{i18n.t('label.description')}
				</label>
				<input
					placeholder={i18n.t('placeholder.description')}
					required
					type="text"
					id="specific-program-edit-description"
					bind:value={values.description}
				/>
			</div>
			<div>
				<label class="required" for="specific-program-edit-start">
					{i18n.t('label.startsAt')}
				</label>
				<input required type="time" id="specific-program-edit-start" bind:value={values.start} />
			</div>
			<div>
				<label class="required" for="specific-program-edit-distance">
					{i18n.t('label.distanceKM')}
				</label>
				<div class="input-group flex items-center">
					<input
						placeholder="km"
						required
						type="number"
						id="specific-program-edit-distance"
						bind:value={values.km}
						min="1"
						max="1000"
					/>
					<span class=" px-3">KM</span>
				</div>
			</div>
			<div class="col-span-2">
				<DurationInput required bind:value={durationObj} />
			</div>
		</BaseForm>
	</ModalBase>
{/if}
