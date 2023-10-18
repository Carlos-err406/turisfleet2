import type { IPagination } from '$lib/stores/pagination';
import type { CollectLineNumbers } from 'vitest';
import { getAll, makeParams } from './Base/BaseService';
import { PROXY_DELETE, PROXY_GET, PROXY_POST, PROXY_PUT } from './Base/ProxyService';

//------------------
//START PROGTAMS
export interface IProgramCreate {
	program_name: string;
}
export interface IProgram extends IProgramCreate {
	id_program: number;
}
export interface IProgramEdit extends IProgramCreate {}

export const getPrograms = async (pagination: IPagination): Promise<IProgram[]> => {
	return PROXY_GET('/programs', makeParams(pagination));
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
interface ISpecificProgramBase {
	description: string;
	start: string;
	duration: string;
	km: number;
}
export interface ISpecificProgramCreate extends ISpecificProgramBase {}
export interface ISpecificProgram extends ISpecificProgramBase {
	id_specific_program: number;
	program: IProgram;
}
export interface ISpecificProgramEdit extends ISpecificProgramCreate {}

export const getSpecificPrograms = async (pagination: IPagination): Promise<ISpecificProgram[]> => {
	return PROXY_GET('/programs/specific-programs', makeParams(pagination));
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

//END SPECIFIC PROGRAMS
//------------------
