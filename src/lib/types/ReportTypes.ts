export interface IRequestModification {
	id_request: number;
	modified_key: string;
	old_value: string;
	new_value: string;
	modification_datetime: string | Date;
}
export interface IRoadmapProgram {
	start: string | Date;
	id_group: number;
	country: string;
	tourist_amount: number;
	program_name: string;
	end_time: string | Date;
}
export interface IRoadmap {
	programs: IRoadmapProgram[];
	plate_number: string;
	brand: string;
	available_km: number;
	km_remaining: number;
	driver_name: string;
}
