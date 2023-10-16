<script lang="ts">
	import i18n from '$lib/i18n';
	import { v4 } from 'uuid';

	export let value: string;
	export let required = true;
	export let maxlength = 11;
	export let id = v4();
</script>

<div>
	<label for={id} data-required={required}>{i18n.t('label.idNumber')}</label>
	<input
		{maxlength}
		placeholder={i18n.t('placeholder.idNumber')}
		{required}
		type="text"
		{id}
		bind:value
	/>
</div>
