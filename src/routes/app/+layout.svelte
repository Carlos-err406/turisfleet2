<script>
	import Navbar from '$lib/components/Layout/Navbar/Navbar.svelte';
	import Panel from '$lib/components/Layout/Panel/Panel.svelte';
	import { PROXY_GET } from '$lib/services/Base/ProxyService';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	
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
