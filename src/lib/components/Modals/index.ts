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
import LanguageSelection from './Lang/LangSelection.svelte';
import ChangePassword from './User/ChangePassword.svelte';
import EditCar from './Car/EditCar.svelte';
import DeleteConfirmation from './DeleteConfirmation.svelte';
import EditDriver from './Driver/EditDriver.svelte';
import EditGroup from './Group/EditGroup.svelte';
import EditProgram from './Program/EditProgram.svelte';
import EditProgramSpecific from './Program/EditProgramSpecific.svelte';
import EditRequest from './Request/EditRequest.svelte';
import EditSituation from './Situation/EditSituation.svelte';
import EditSituationCar from './Situation/EditSituationCar.svelte';
import EditSituationDriver from './Situation/EditSituationDriver.svelte';
import EditUser from './User/EditUser.svelte';

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
	EDIT_DRIVER = 'editDriver',
	EDIT_CAR = 'editCar',
	EDIT_GROUP = 'editGroup',
	EDIT_REQUEST = 'editRequest',
	EDIT_PROGRAM = 'editProgram',
	EDIT_PROGRAM_SPECIFIC = 'editProgramSpecific',
	EDIT_SITUATION = 'editSituation',
	EDIT_SITUATION_CAR = 'editSituationCar',
	EDIT_SITUATION_DRIVER = 'editSituationDriver',
	CHANGE_PASSWORD = 'changePassword',
	LANGUAGE_SELECTION = 'languageSelection',
	DELETE_CONFIRMATION = 'deleteConfirmation'
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
	[Modals.CHANGE_PASSWORD]: { ref: ChangePassword },
	[Modals.EDIT_DRIVER]: { ref: EditDriver },
	[Modals.EDIT_CAR]: { ref: EditCar },
	[Modals.EDIT_GROUP]: { ref: EditGroup },
	[Modals.EDIT_REQUEST]: { ref: EditRequest },
	[Modals.EDIT_PROGRAM]: { ref: EditProgram },
	[Modals.EDIT_PROGRAM_SPECIFIC]: { ref: EditProgramSpecific },
	[Modals.EDIT_SITUATION]: { ref: EditSituation },
	[Modals.EDIT_SITUATION_CAR]: { ref: EditSituationCar },
	[Modals.EDIT_SITUATION_DRIVER]: { ref: EditSituationDriver },
	[Modals.LANGUAGE_SELECTION]: { ref: LanguageSelection },
	[Modals.DELETE_CONFIRMATION]: { ref: DeleteConfirmation }
};

export default modalRegistry;
