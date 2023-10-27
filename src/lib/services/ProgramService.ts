import type { IPagination } from '$lib/stores/pagination';
import type {
	IProgram,
	IProgramCreate,
	IProgramEdit,
	ISpecificProgram,
	ISpecificProgramCreate
} from '$lib/types/ProgramTypes';
import { getAll, makeParams, type PaginatedResponse } from './Base/BaseService';
import { PROXY_DELETE, PROXY_GET, PROXY_POST, PROXY_PUT } from './Base/ProxyService';

//------------------
//START PROGTAMS

export const getPrograms = async (
	pagination: IPagination,
	query?: string
): Promise<PaginatedResponse<IProgram[]>> => {
	const params = { ...pagination };
	query && Object.assign(params, { query });
	return PROXY_GET('/programs', makeParams(params));
};
export const deleteProgram = async (id: number): Promise<void> => {
	return PROXY_DELETE('/programs/' + id);
};
export const createProgram = async (program: IProgramCreate): Promise<IProgram> => {
	return PROXY_POST('/programs', JSON.stringify(program));
};
export const editProgram = async (id: number, program: IProgramEdit): Promise<IProgram> => {
	return PROXY_PUT('/programs/' + id, JSON.stringify(program));
};

export const getAllPrograms = async (): Promise<IProgram[]> => {
	return getAll(getPrograms);
};
//END PROGRAMS
//------------------

//------------------
//START SPECIFIC PROGRAMS

export const getSpecificPrograms = async (
	pagination: IPagination,
	query?: string
): Promise<PaginatedResponse<ISpecificProgram[]>> => {
	const params = { ...pagination };
	query && Object.assign(params, { query });
	return PROXY_GET('/programs/specific-programs', makeParams(params));
};
export const deleteSpecificProgram = async (
	idProgram: number,
	idSpecificProgram: number
): Promise<void> => {
	return PROXY_DELETE(`/programs/${idProgram}/specific-programs/${idSpecificProgram}`);
};
export const createSpecificProgram = async (
	idProgram: number,
	specificProgram: ISpecificProgramCreate
): Promise<ISpecificProgram> => {
	return PROXY_POST(`/programs/${idProgram}/specific-programs`, JSON.stringify(specificProgram));
};
export const editSpecificProgram = async (
	idProgram: number,
	idSpecificProgram: number,
	specificProgram: IProgramEdit
): Promise<ISpecificProgram> => {
	return PROXY_PUT(
		`/programs/${idProgram}/specific-programs/${idSpecificProgram}`,
		JSON.stringify(specificProgram)
	);
};

export const getAllSpecificPrograms = async (): Promise<ISpecificProgram[]> => {
	return getAll(getSpecificPrograms);
};

//END SPECIFIC PROGRAMS
//------------------
