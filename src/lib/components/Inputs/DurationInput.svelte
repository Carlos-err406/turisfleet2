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
	import i18n from '$lib/i18n';

	export let required = false;
	export let value: DurationInputValue = {
		days: '',
		hours: '',
		minutes: ''
	};
</script>

<div>
	<label for="" data-required={required}><slot>{i18n.t('label.duration')}</slot></label>
	<div class="flex items-center gap-1">
		<input
			class="input"
			{required}
			type="number"
			min="0"
			max="9999999"
			bind:value={value.days}
			placeholder={i18n.t('placeholder.days')}
		/>
		<span class="input-group-divider">:</span>
		<input
			class="input"
			{required}
			type="number"
			min="0"
			max="9999999"
			bind:value={value.hours}
			placeholder={i18n.t('placeholder.hours')}
		/>
		<span class="input-group-divider">:</span>
		<input
			class="input"
			{required}
			type="number"
			min="0"
			max="99999999"
			bind:value={value.minutes}
			placeholder={i18n.t('placeholder.minutes')}
		/>
	</div>
</div>
