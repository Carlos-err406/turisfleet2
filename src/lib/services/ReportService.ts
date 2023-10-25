import { PUBLIC_APP_NAME } from '$env/static/public';
import i18n, { getTranslatedHeader } from '$lib/i18n';
import type { ToastStore } from '@skeletonlabs/skeleton';
import dayjs, { Dayjs } from 'dayjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { carService, driverService, situationService } from '.';
import type { ICar } from './CarService';
import type { IDriver } from './DriverService';
import type { ICarSituation, IDriverSituation } from './SituationService';
import { PROXY_GET } from '$lib/services/Base/ProxyService';
const DOWNLOAD_PDFS = true;
const OPEN_PDFS = true;

const triggerNoDataForReport = (toastStore: ToastStore, message: string) => {
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

//TODO
export const requestsOnDateReport = async (toastStore: ToastStore, date: Dayjs) => {
	const formattedDate = date.format('DD-MM-YYYY');
	const title = i18n.t('label.reports.requestOnDate') + ` (${formattedDate})`;
	const data: any[] = [];
	// generatePDF(data, title);
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

//TODO
export const dragsListReport = async (toastStore: ToastStore) => {
	const title = i18n.t('label.reports.dragsList');
	const data: any[] = [];
	// generatePDF(data, title);
};

//TODO
export const routingSheetsReport = async (toastStore: ToastStore) => {
	const title = i18n.t('label.reports.routingSheets');
	const data: any[] = [];
	// generatePDF(data, title);
};

//TODO request interface tho it should be the id
export const requestModificationsReport = async (toastStore: ToastStore, request: any) => {
	console.log(request);
	const title = i18n.t('label.reports.requestModifications');
	const data: any[] = [];
	// generatePDF(data, title);
};

export const generatePDF = (data: any[], headers: string[], title: string) => {
	const doc = new jsPDF();
	doc.setFont('Helvetica', 'normal');
	doc.setTextColor(0, 0, 0);
	const img = document.createElement('img');
	img.src = '/logo.png';
	doc.addImage(img, 'png', 75, 5, 25, 25);
	doc.text(PUBLIC_APP_NAME, 105, 20);
	doc.text(title, 10, 50);
	if (data && data.length > 0) {
		const body = data.map((row) => headers.map((header) => row[header]));
		autoTable(doc, {
			head: [headers.map((header) => getTranslatedHeader(header))],
			body,
			startY: 60,
			theme: 'striped'
		});
	}
	DOWNLOAD_PDFS && doc.save(dayjs().unix() + ' - ' + title + '.pdf');
	OPEN_PDFS && window.open(doc.output('bloburl'), '_blank');
};
