import type { ICar } from '$lib/services/CarService';
import type { Dayjs } from 'dayjs';

export interface CarAndDate {
	car: ICar;
	date: string | Date | Dayjs;
}
