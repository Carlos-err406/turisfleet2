import type { LicenseCategory } from './LicenseTypes';

export interface ICarCreate {
	plate_number: string;
	brand: string;
	seat_amount: number;
	available_km?: number;
	id_driver?: number;
	category: LicenseCategory;
}
export interface ICar extends ICarCreate {
	id_car: number;
}
export interface ICarEdit extends ICarCreate {}
