<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { triggerErrorToast } from '$lib/CustomError';
	import Lock from '$lib/components/Icons/Lock.svelte';
	import User from '$lib/components/Icons/User.svelte';
	import i18n from '$lib/i18n';
	import { authService } from '$lib/services';
	import { isAgent, isDriver, loading, loggedUser } from '$lib/stores';
	import { focusTrap, getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	let username: string = '';
	let password: string = '';

	const handleSumbit = async () => {
		$loading = true;
		try {
			$loggedUser = await authService.login({ username, password });
			if ($isDriver) {
				await goto('/profile');
			} else if ($isAgent) {
				await goto('/app/drivers');
			} else {
				await goto('/app/users');
			}
		} catch (e: any) {
			triggerErrorToast(toastStore, e);
		}
		$loading = false;
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
			<label class="required ml-3" for="username-input">
				{i18n.t('label.username')}
			</label>
			<div class="flex gap-0 items-center input w-full">
				<span class="px-2">
					<User />
				</span>
				<input
					required
					type="text"
					id="username-input"
					placeholder={i18n.t('placeholder.username')}
					bind:value={username}
					class="px-2 py-1 input w-full variant-outline-primary outline-none border-none"
				/>
			</div>
		</div>
		<div class="flex flex-col items-start gap-1">
			<label class="required ml-3" for="password-input">
				{i18n.t('label.password')}
			</label>
			<div class="flex gap-0 items-center input w-full">
				<span class="px-2">
					<Lock />
				</span>
				<input
					required
					type="password"
					id="password-input"
					placeholder={i18n.t('placeholder.password')}
					bind:value={password}
					class="px-2 py-1 input w-full variant-outline-primary outline-none border-none"
				/>
			</div>
		</div>
	</section>
	<footer class="card-footer flex justify-center">
		<button class="btn variant-ghost-primary">
			{i18n.t('button.login')}
		</button>
	</footer>
</form>
