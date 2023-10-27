import type { ICar } from './CarTypes';
import type { IDriver } from './DriverTypes';

export type SituationType = 'car' | 'driver' | 'car_driver';

export interface ISituationCreate {
	situation_name: string;
	situation_type: SituationType;
}
export interface ISituation extends ISituationCreate {
	id_situation: number;
}
export interface ISituationEdit extends ISituationCreate {}

interface IDriverSituationBase {
	date: string | Date;
	return_date?: string | Date;
}
export interface IDriverSituationCreate extends IDriverSituationBase {
	id_situation: number;
}
export interface IDriverSituation extends IDriverSituationBase {
	driver: IDriver;
	situation: ISituation;
}

export interface IDriverSituationEdit extends IDriverSituationCreate {}

interface ICarSituationBase {
	date: string | Date;
	return_date?: string | Date;
}
export interface ICarSituationCreate extends ICarSituationBase {
	id_situation: number;
}
export interface ICarSituation extends ICarSituationBase {
	car: ICar;
	situation: ISituation;
}

export interface ICarSituationEdit extends ICarSituationCreate {}
