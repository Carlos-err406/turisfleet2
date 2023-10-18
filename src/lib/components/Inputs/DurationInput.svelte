<script context="module" lang="ts">
	export interface DurationInputValue {
		days: string;
		hours: string;
		minutes: string;
	}
	export const durationObjToStr = (duration: DurationInputValue): string => {
		const { hours, minutes, days } = duration;
		const [hoursNum, minutesNum] = [parseInt(hours), parseInt(minutes)];
		const formattedHours = hoursNum < 10 ? '0' + hoursNum : hoursNum.toString();
		const formattedMinutes = minutesNum < 10 ? '0' + minutesNum : minutesNum.toString();
		return `${days} days, ${formattedHours}:${formattedMinutes}:00`;
	};

	export const durationStrToObj = (duration: string): DurationInputValue => {
		const days = duration.match(/(\d+)D/);
		const _days = days ? parseInt(days[1]) : 0;
		const seconds = duration.match(/T(\d+)S/);
		const _seconds = seconds ? parseInt(seconds[1]) : 0;
		const hours = (_seconds / 3600).toFixed(0);
		const minutes = (_seconds % 3600) / 60;
		return {
			days: '' + _days,
			hours: '' + hours,
			minutes: '' + minutes
		};
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
	<label for="" class:required><slot>{i18n.t('label.duration')}</slot></label>
	<div class="flex items-center gap-1">
		<input
			class="input"
			{required}
			type="number"
			min="0"
			step="1"
			max="10"
			bind:value={value.days}
			placeholder={i18n.t('placeholder.days')}
		/>
		<span class="input-group-divider">:</span>
		<input
			class="input"
			{required}
			type="number"
			min="0"
			step="1"
			max="23"
			bind:value={value.hours}
			placeholder={i18n.t('placeholder.hours')}
		/>
		<span class="input-group-divider">:</span>
		<input
			class="input"
			{required}
			type="number"
			min="0"
			step="1"
			max="59"
			bind:value={value.minutes}
			placeholder={i18n.t('placeholder.minutes')}
		/>
	</div>
</div>
