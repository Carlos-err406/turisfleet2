import type { LicenseCategory } from './LicenseTypes';

export interface IDriverCreate {
	id_number: string;
	name: string;
	address: string;
	license_categories: LicenseCategory[];
}
export interface IDriver extends IDriverCreate {
	id_driver: number;
}

export interface IDriverEdit extends IDriverCreate {}
