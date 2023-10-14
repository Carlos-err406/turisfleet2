<script context="module" lang="ts">
	export interface SpecificProgramCreate {
		id_program: string | number;
		description: string;
		start: Date | string;
		duration: string; //interval
		km: number;
	}
</script>

<script lang="ts">
	import Dropdown from '$lib/components/Inputs/Dropdown.svelte';
	import DurationInput, {
		durationObjToStr,
		type DurationInputValue
	} from '$lib/components/Inputs/DurationInput.svelte';
	import ModalBase from '$lib/components/Modals/ModalBase.svelte';
	import type flashStore from '$lib/stores/flashes';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import BaseForm from '../BaseForm.svelte';
	const modalStore = getModalStore();
	const flashes: typeof flashStore = $modalStore[0].meta.flashes;
	let values: SpecificProgramCreate = {
		id_program: '',
		description: '',
		start: '',
		duration: '',
		km: 0
	};
	let durationObj: DurationInputValue;
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
	const create = () => {
		parse();
		validate() && console.log(values);
	};
	const onProgramSelection = ({ detail }: CustomEvent) => {
		values.id_program = detail;
	};
</script>

{#if $modalStore[0]}
	<ModalBase>
		<BaseForm footerCols={2} {flashes} on:submit={create} on:secondary={close}>
			<svelte:fragment slot="title">Create Specific program</svelte:fragment>
			<Dropdown placeholder="program" required options={[]} on:select>Program</Dropdown>
			<div>
				<label for="specific-program-create-description">Description</label>
				<input
					placeholder="description"
					required
					type="text"
					id="specific-program-create-description"
					bind:value={values.description}
				/>
			</div>
			<div>
				<label for="specific-program-create-start">Start</label>
				<input
					placeholder="starts at"
					required
					type="time"
					id="specific-program-create-start"
					bind:value={values.start}
				/>
			</div>
			<div>
				<label for="specific-program-create-distance">Distance KM</label>
				<div class="input-group flex items-center">
					<input
						placeholder="km"
						required
						type="number"
						id="specific-program-create-distance"
						bind:value={values.km}
						min="0"
						max="600"
					/>
					<span class=" px-3">KM</span>
				</div>
			</div>
			<div class="col-span-2">
				<DurationInput bind:value={durationObj} />
			</div>
		</BaseForm>
	</ModalBase>
{/if}