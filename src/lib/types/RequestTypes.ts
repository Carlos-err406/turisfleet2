import type { ICar } from './CarTypes';
import type { IDriver } from './DriverTypes';
import type { IGroup } from './GroupService';
import type { ISpecificProgram } from './ProgramTypes';

interface IRequestBase {
	date: string | Date;
	tourist_amount: number;
}
export interface IRequestCreate extends IRequestBase {
	id_group: number;
	id_specific_program: number;
}
export interface IRequest extends IRequestBase {
	id_request: number;
	specific_program: ISpecificProgram;
	group: IGroup;
	car: ICar;
	copilot?: IDriver;
	driver: IDriver;
	return_date: string | Date;
}
export interface IRequestEdit {
	date: string | Date;
	tourist_amount: number;
	id_specific_program: number;
}
