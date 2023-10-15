<script lang="ts">
	import { v4 } from 'uuid';

	export let value: string;
	export let required = true;
	export let placeholder = 'id number';
	export let maxlength = 11;
	export let id = v4();
</script>

<div>
	<label for={id} data-required={required}>ID number</label>
	<input {maxlength} {placeholder} {required} type="text" {id} bind:value />
</div>
