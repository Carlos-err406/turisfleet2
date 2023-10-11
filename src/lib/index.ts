// place files you want to import through the `$lib` alias in this folder.
import type { DrawerSettings } from '@skeletonlabs/skeleton';
import AuthService from './services/AuthService';
export const authService = AuthService.getInstance()

export const drawerSettings = (settings?: Partial<DrawerSettings>): DrawerSettings => ({
	id: 'drawer-1',
	width: 'w-fit',
	...settings
});

export enum Modals {
	CREATE_USER = 'createUser',
	CREATE_DRIVER = 'createDriver',
	CREATE_CAR = 'createCar',
	CREATE_GROUP = 'createGroup',
	CREATE_SITUATION = 'createSituation',
	CREATE_SITUATION_CAR = 'createSituationCar',
	CREATE_SITUATION_DRIVER = 'createSituationDriver',
	CREATE_REQUEST = 'createRequest',
	CREATE_PROGRAM = 'createProgram',
	CREATE_PROGRAM_SPECIFIC = 'createProgramSpecific'
}

