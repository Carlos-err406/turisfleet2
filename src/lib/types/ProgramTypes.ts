export interface IProgramCreate {
	program_name: string;
}
export interface IProgram extends IProgramCreate {
	id_program: number;
}
export interface IProgramEdit extends IProgramCreate {}

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
