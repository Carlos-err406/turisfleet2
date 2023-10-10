<script>
	import { Toast, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';
	import '../app.postcss';

	initializeStores();
	getDrawerStore().close();
</script>

<Toast />
<slot />
