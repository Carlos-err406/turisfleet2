<script>
	import { AppShell } from '@skeletonlabs/skeleton';
	import Navbar from '$lib/components/Layout/Navbar/Navbar.svelte';
	import Panel from '$lib/components/Layout/Panel/Panel.svelte';
</script>

<AppShell class="bg-blue-200/30">
	<svelte:fragment slot="header">
		<Navbar />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Panel />
	</svelte:fragment>
	<main class="px-2">
		<slot />
	</main>
</AppShell>
