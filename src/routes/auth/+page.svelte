<script lang="ts">
	import { goto } from '$app/navigation';
	import { toastInvalidCredentials } from '$lib/utils';
	import { focusTrap, getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	let username: string = '';
	let password: string = '';

	const handleSumbit = () => {
		if (username != 'admin' || password != 'admin') {
			setFormError();
			triggerInvalidCredentialsToast();
		} else {
			goto('/app/orders');
		}
	};

	let form: HTMLFormElement;
	let submitButton: HTMLButtonElement;
	const triggerInvalidCredentialsToast = () => {
		toastInvalidCredentials(toastStore, resetFormStyle);
	};

	const setFormError = () => {
		form.classList.add('variant-glass-error');
		submitButton.classList.add('variant-ghost-error');
	};
	const resetFormStyle = () => {
		form.classList.remove('variant-glass-error');
		submitButton.classList.remove('variant-ghost-error');
	};
</script>

<form
	class="card shadow-md variant-outline-surface w-1/5"
	on:submit|preventDefault={handleSumbit}
	use:focusTrap={true}
	bind:this={form}
>
	<header class="card-header flex items-center gap-3 w-full justify-center">
		<img src="/img/logo.png" alt="logo" width="50" />
		<h1 class="text-2xl font-bold">Login</h1>
	</header>
	<section class="p-4 flex flex-col">
		<div class="flex flex-col items-start">
			<label class="ml-3" for="username-input">
				Useranme
				<span class="text-red-500">*</span>
			</label>
			<input
				required
				type="text"
				id="username-input"
				placeholder="username"
				bind:value={username}
				class="px-2 py-1 input variant-outline-primary outline-none"
			/>
		</div>
		<div class="flex flex-col items-start">
			<label class="ml-3" for="username-input">
				Password
				<span class="text-red-500">*</span>
			</label>
			<input
				required
				type="password"
				id="password-input"
				placeholder="password"
				bind:value={password}
				class="px-2 py-1 input variant-outline-primary outline-none"
			/>
		</div>
	</section>
	<footer class="card-footer flex justify-center">
		<button class="btn variant-ghost-primary" bind:this={submitButton}>Login</button>
	</footer>
</form>
