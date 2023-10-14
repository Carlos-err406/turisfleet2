import type { ModalComponent } from '@skeletonlabs/skeleton';
import CreateCar from './Car/CreateCar.svelte';
import CreateDriver from './Driver/CreateDriver.svelte';
import CreateGroup from './Group/CreateGroup.svelte';
import CreateProgram from './Program/CreateProgram.svelte';
import CreateSpecificProgram from './Program/CreateProgramSpecific.svelte';
import CreateRequest from './Request/CreateRequest.svelte';
import CreateSituation from './Situation/CreateSituation.svelte';
import CreateSituationCar from './Situation/CreateSituationCar.svelte';
import CreateSituationDriver from './Situation/CreateSituationDriver.svelte';
import CreateUser from './User/CreateUser.svelte';
import EditUser from './User/EditUser.svelte';
import ChangePassword from './User/ChangePassword.svelte';

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
	CREATE_PROGRAM_SPECIFIC = 'createProgramSpecific',
	EDIT_USER = 'editUser',
	CHANGE_PASSWORD = "changePassword",
}

const modalRegistry: Record<Modals, ModalComponent> = {
	[Modals.CREATE_USER]: { ref: CreateUser },
	[Modals.CREATE_DRIVER]: { ref: CreateDriver },
	[Modals.CREATE_CAR]: { ref: CreateCar },
	[Modals.CREATE_GROUP]: { ref: CreateGroup },
	[Modals.CREATE_REQUEST]: { ref: CreateRequest },
	[Modals.CREATE_PROGRAM]: { ref: CreateProgram },
	[Modals.CREATE_SITUATION]: { ref: CreateSituation },
	[Modals.CREATE_SITUATION_CAR]: { ref: CreateSituationCar },
	[Modals.CREATE_SITUATION_DRIVER]: { ref: CreateSituationDriver },
	[Modals.CREATE_PROGRAM_SPECIFIC]: { ref: CreateSpecificProgram },
	[Modals.EDIT_USER]: { ref: EditUser },
	[Modals.CHANGE_PASSWORD]: { ref: ChangePassword }
};

export default modalRegistry;
