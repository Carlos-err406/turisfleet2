<!-- <script lang="ts">
	import { goto } from '$app/navigation';
	import { triggerErrorToast } from '$lib/CustomError';
	import { driverService, userService } from '$lib/services';
	import type { IDriver } from '$lib/services/DriverService';
	import type { IUser } from '$lib/services/UserService';
	import { loggedUser } from '$lib/stores';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	let toastStore = getToastStore();
	let driverData: IDriver;
	let userData: IUser;
	onMount(async () => {
		if (!$loggedUser) {
			await goto('/auth/login');
			return;
		}
		try {
			[driver] = await Promise.all([
				driverService.getDriver($loggedUser.id_user),
				userService.getUser($loggedUser.id_user)
			]);
		} catch (e) {
			triggerErrorToast(toastStore, e);
		}
	});
</script>

Driver Data
{JSON.stringify(driverData)}

User Data
{userData} -->
