import { PUBLIC_APP_NAME } from '$env/static/public';
import i18n, { getTranslatedHeader } from '$lib/i18n';
import type { ToastStore } from '@skeletonlabs/skeleton';
import dayjs, { Dayjs } from 'dayjs';
import jsPDF, { type jsPDFOptions } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { carService, driverService, requestService, situationService } from '.';
import type { ICar } from './CarService';
import type { IDriver } from './DriverService';
import type { ICarSituation, IDriverSituation } from './SituationService';
import { PROXY_GET } from '$lib/services/Base/ProxyService';
import type { IRequest } from './RequestService';
import type { CarAndDate } from '$lib/components/Modals/Reports/types';
import { makeParams } from './Base/BaseService';
const DOWNLOAD_PDFS = true;
const OPEN_PDFS = true;

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
export const triggerNoDataForReport = (toastStore: ToastStore, message: string) => {
	toastStore.trigger({
		message: message,
		background: 'variant-filled-surface',
		hideDismiss: true
	});
};

export const driversListReport = async (toastStore: ToastStore) => {
	const data: IDriver[] = await driverService.getAllDrivers();
	if (data.length === 0) {
		triggerNoDataForReport(toastStore, i18n.t('flashes.noDriversForReport'));
		return;
	}
	type FlattenDataType = IDriver & { license_categories_flat: string };
	const headers: (keyof FlattenDataType)[] = ['name', 'id_number', 'license_categories', 'address'];
	const flattenData: FlattenDataType[] = data.map((value) => ({
		...value,
		license_categories_flat: value.license_categories.join(', ')
	}));

	const title = i18n.t('label.reports.driversList');
	generatePDF(flattenData, headers, title);
};

export const carsListReport = async (toastStore: ToastStore) => {
	const data: ICar[] = await carService.getAllCars();
	if (data.length === 0) {
		triggerNoDataForReport(toastStore, i18n.t('flashes.noCarsForReport'));
		return;
	}
	const headers: (keyof ICar)[] = [
		'plate_number',
		'brand',
		'category',
		'seat_amount',
		'available_km'
	];
	const title = i18n.t('label.reports.carsList');
	generatePDF(data, headers, title);
};

export const requestsOnDateReport = async (toastStore: ToastStore, date: Dayjs) => {
	const formattedDate = date.format('DD-MM-YYYY');
	const title = i18n.t('label.reports.requestOnDate') + ` (${formattedDate})`;
	const requests: IRequest[] = await requestService.getAllRequestsOnDate(date);
	if (requests.length === 0) {
		triggerNoDataForReport(toastStore, i18n.t('flashes.noRequestsForReport'));
		return;
	}
	type FlattenDataType = IRequest & {
		car_flat: string;
		country: string;
		description: string;
		program_name: string;
		driver_flat: string;
		copilot_flat?: string;
	};
	const headers: (keyof FlattenDataType)[] = [
		'return_date',
		'country',
		'description',
		'program_name',
		'tourist_amount',
		'car_flat',
		'driver_flat',
		'copilot_flat'
	];
	const flattenData: FlattenDataType[] = requests.map((value) => ({
		...value,
		return_date: dayjs(value.return_date).format('YYYY-MM-DD'),
		car_flat: `[${value.car.plate_number}] ${value.car.brand}`,
		country: value.group.country,
		description: value.specific_program.description,
		program_name: value.specific_program.program.program_name,
		driver_flat: `${value.driver.name}`,
		copilot_flat: value.copilot?.name
	}));
	generatePDF(flattenData, headers, title, undefined, { orientation: 'landscape' });
};

export const carSituationsReport = async (toastStore: ToastStore) => {
	const data: ICarSituation[] = await situationService.getAllCarSituations();
	if (data.length === 0) {
		triggerNoDataForReport(toastStore, i18n.t('flashes.noCarSituationsForReport'));
		return;
	}
	const title = i18n.t('label.reports.carSituations');
	type FlattenDataType = ICarSituation & {
		brand: string;
		plate_number: string;
		situation_name: string;
	};
	const headers: (keyof FlattenDataType)[] = [
		'plate_number',
		'brand',
		'situation_name',
		'date',
		'return_date'
	];
	const flattenData = data.map((value) => ({
		...value,
		plate_number: value.car.plate_number,
		brand: value.car.brand,
		situation_name: value.situation.situation_name
	}));
	generatePDF(flattenData, headers, title);
};

export const driverSituationsReport = async (toastStore: ToastStore) => {
	const data: IDriverSituation[] = await situationService.getAllDriverSituations();
	if (data.length === 0) {
		triggerNoDataForReport(toastStore, i18n.t('flashes.noDriverSituationsForReport'));
		return;
	}
	const title = i18n.t('label.reports.driverSituations');
	type FlattenDataType = IDriverSituation & {
		name: string;
		id_number: string;
		situation_name: string;
	};
	const headers: (keyof FlattenDataType)[] = [
		'name',
		'id_number',
		'situation_name',
		'date',
		'return_date'
	];
	const flattenData = data.map((value) => ({
		...value,
		name: value.driver.name,
		id_number: value.driver.id_number,
		situation_name: value.situation.situation_name
	}));
	generatePDF(flattenData, headers, title);
};

export const carDriverRelationReport = async (toastStore: ToastStore) => {
	interface Row {
		driver_name: string;
		brand: string;
		plate_number: string;
	}
	const data: Row[] = await PROXY_GET('/cars/drivers');
	if (data.length === 0) {
		triggerNoDataForReport(toastStore, i18n.t('flashes.noDataForThisReport'));
		return;
	}
	const headers: (keyof Row)[] = ['driver_name', 'brand', 'plate_number'];
	const title = i18n.t('label.reports.carDriverRelation');
	generatePDF(data, headers, title);
};

export const dragsListReport = async (toastStore: ToastStore, request: IRequest) => {
	const title = i18n.t('label.reports.dragsList');
	const data: ICar[] = await PROXY_GET(`/requests/${request.id_request}/drag-list`);
	if (data.length === 0) {
		triggerNoDataForReport(toastStore, i18n.t('flashes.noDataForThisReport'));
		return;
	}
	const headers: (keyof ICar)[] = ['plate_number', 'brand', 'category', 'seat_amount'];

	generatePDF(data, headers, title);
};

export const routingSheetsReport = async (toastStore: ToastStore, carAndDate: CarAndDate) => {
	const roadmap: IRoadmap = await PROXY_GET(
		`/cars/${carAndDate.car.id_car}/roadmap`,
		makeParams({ date: dayjs(carAndDate.date).format('YYYY-MM-DD') })
	);
	console.log(roadmap?.programs?.length === 0)
	if (roadmap?.programs?.length === 0) {
		triggerNoDataForReport(toastStore, i18n.t('flashes.noDataForThisReport'));
		return
	}
	const title = i18n.t('label.reports.routingSheets');
	const extraData: { label: string; value: string }[] = [
		{ label: i18n.t('label.car'), value: `[${roadmap.plate_number}] ${roadmap.brand}` },
		{ label: i18n.t('label.driver'), value: roadmap.driver_name },
		{ label: i18n.t('label.remainingKM'), value: String(roadmap.km_remaining) },
		{ label: i18n.t('label.availableKM'), value: String(roadmap.available_km) }
	];
	const headers: (keyof IRoadmapProgram)[] = [
		'start',
		'country',
		'tourist_amount',
		'program_name',
		'end_time'
	];
	generatePDF(roadmap.programs, headers, title, extraData);
};

//TODO request interface tho it should be the id
export const requestModificationsReport = async (toastStore: ToastStore, request: IRequest) => {
	const title = i18n.t('label.reports.requestModifications');
	const data: any[] = [];
	//TODO
	// generatePDF(data, title);
};

export const generatePDF = (
	data: any[],
	headers: string[],
	title: string,
	extraData?: { label: string; value: string }[],
	options?: jsPDFOptions
) => {
	const doc = new jsPDF(options);
	doc.setFont('Helvetica', 'normal');
	doc.setTextColor(0, 0, 0);
	const img = document.createElement('img');
	img.src = '/logo.png';
	doc.addImage(img, 'png', 75, 5, 25, 25);
	doc.text(PUBLIC_APP_NAME, 105, 20);
	doc.text(title, 10, 50);
	let initialPosition = { x: 10, y: 70 };
	if (extraData) {
		extraData.forEach((value) => {
			doc.text(`${value.label}: ${value.value}`, initialPosition.x, initialPosition.y);
			initialPosition.y += 10;
		});
	}
	if (data && data.length > 0) {
		const body = data.map((row) => headers.map((header) => row[header]));
		autoTable(doc, {
			head: [headers.map((header) => getTranslatedHeader(header))],
			body,
			startY: initialPosition.y,
			theme: 'striped'
		});
	}
	DOWNLOAD_PDFS && doc.save(dayjs().unix() + ' - ' + title + '.pdf');
	OPEN_PDFS && window.open(doc.output('bloburl'), '_blank');
};
