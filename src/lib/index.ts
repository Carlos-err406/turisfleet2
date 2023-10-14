// place files you want to import through the `$lib` alias in this folder.
import type { DrawerSettings } from '@skeletonlabs/skeleton';

export const getDrawerSettings = (settings?: Partial<DrawerSettings>): DrawerSettings => ({
	id: 'drawer-1',
	width: 'w-fit',
	...settings
});
