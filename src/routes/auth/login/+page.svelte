<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { authService } from '$lib';
	import { lock, user } from '$lib/icons';
	import { loggedUser } from '$lib/stores/basic';
	import { focusTrap, getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	let username: string = '';
	let password: string = '';

	const handleSumbit = async () => {
		try {
			$loggedUser = await authService.login({ username, password });
			goto('/app/users');
		} catch (e: any) {
			const { exceptionID, message } = e;
			toastStore.trigger({
				timeout: 3000,
				message,
				classes: 'variant-ghost-error'
			});
		}
	};
</script>

<form
	class="card shadow-md variant-outline-surface sm:w-3/5 md:w-2/5 lg:w-1/5"
	on:submit|preventDefault={handleSumbit}
	use:focusTrap={true}
>
	<header class="card-header flex items-center gap-3 w-full justify-center">
		<img src="/logo.png" alt="logo" width="50" />
		<h1 class="text-2xl font-bold">{PUBLIC_APP_NAME}</h1>
	</header>
	<section class="p-4 flex flex-col gap-5">
		<div class="flex flex-col items-start gap-1">
			<label class="ml-3" for="username-input"> Useranme </label>
			<div class="flex gap-0 items-center input w-full">
				<span class="px-2">
					{@html user}
				</span>
				<input
					required
					type="text"
					id="username-input"
					placeholder="username"
					bind:value={username}
					class="px-2 py-1 input w-full variant-outline-primary outline-none border-none"
				/>
			</div>
		</div>
		<div class="flex flex-col items-start gap-1">
			<label class="ml-3" for="username-input"> Password </label>
			<div class="flex gap-0 items-center input w-full">
				<span class="px-2">
					{@html lock}
				</span>
				<input
					required
					type="password"
					id="password-input"
					placeholder="password"
					bind:value={password}
					class="px-2 py-1 input w-full variant-outline-primary outline-none border-none"
				/>
			</div>
		</div>
	</section>
	<footer class="card-footer flex justify-center">
		<button class="btn variant-ghost-primary">Login</button>
	</footer>
</form>
