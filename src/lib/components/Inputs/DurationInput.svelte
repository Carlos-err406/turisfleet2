<script context="module" lang="ts">
	export interface DurationInputValue {
		days: string;
		hours: string;
		minutes: string;
	}
	export const durationObjToStr = (duration: object): string => {
		let result = '';
		Object.entries(duration).forEach(([key, value]) => {
			result += `${value} ${key} `;
		});
		return result.trim();
	};

	export const durationStrToObj = (duration: string): DurationInputValue => {
		let result: any = {
			days: '0',
			hours: '0',
			minutes: '0'
		};
		const arr = duration.trim().split(' ');
		for (let i = 0; i < arr.length; i += 2) {
			let key = arr[i + 1];
			let value = parseInt(arr[i]);
			result[key] = value;
		}

		return result;
	};
</script>

<script lang="ts">
	export let required = false;
	export let value: DurationInputValue = {
		days: '',
		hours: '',
		minutes: ''
	};
</script>

<div>
	<label for="" data-required={required}><slot>Duration (days : hours : minutes)</slot></label>
	<div class="flex items-center gap-1">
		<input
			class="input"
			{required}
			type="number"
			min="0"
			max="9999999"
			bind:value={value.days}
			placeholder="days"
		/>
		<span class="input-group-divider">:</span>
		<input
			class="input"
			{required}
			type="number"
			min="0"
			max="9999999"
			bind:value={value.hours}
			placeholder="hours"
		/>
		<span class="input-group-divider">:</span>
		<input
			class="input"
			{required}
			type="number"
			min="0"
			max="99999999"
			bind:value={value.minutes}
			placeholder="minutes"
		/>
	</div>
</div>
