import { PUBLIC_APP_NAME } from '$env/static/public';
import { createOneFromToast } from '$lib';
import { Modals } from '$lib/components/Modals';
import i18n, { getTranslatedHeader } from '$lib/i18n';
import { getFlashStore } from '$lib/stores/flashes';
import type { ModalStore, ToastStore } from '@skeletonlabs/skeleton';
import dayjs, { Dayjs } from 'dayjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { driverService } from '.';
import type { IDriver } from './DriverService';

const DOWNLOAD_PDFS = true;
const OPEN_PDFS = true;

const triggerNoDataForReport = (toastStore: ToastStore, message: string) => {
	toastStore.trigger({
		message: message,
		background: 'variant-filled-surface',
		hideDismiss: true
	});
};

export const driversListReport = async () => {
	// export const driversListReport = async (toastStore: ToastStore) => {
	type FlattenDataType = IDriver & { license_categories_flat: string };
	const data: IDriver[] = await driverService.getAllDrivers();
	if (data.length === 0) {
		// triggerNoDataForReport(toastStore, i18n.t('flashes.noDriversForReport'));
		alert('no drivers');
		return;
	}
	const headers: (keyof FlattenDataType)[] = [
		'name',
		'id_number',
		'license_categories_flat',
		'address'
	];
	const flattenData: FlattenDataType[] = data.map((value) => ({
		...value,
		license_categories_flat: value.license_categories.join(', ')
	}));

	const title = i18n.t('label.reports.driversList');
	generatePDF(flattenData, title);
};

export const carsListReport = () => {
	const data: any[] = [];
	const title = i18n.t('label.reports.carsList');
	generatePDF(data, title);
};

export const requestsOnDateReport = (date: Dayjs) => {
	const formattedDate = date.format('DD-MM-YYYY');
	const title = i18n.t('label.reports.requestOnDate') + ` (${formattedDate})`;
	const data: any[] = [];
	generatePDF(data, title);
};

export const carSituationsReport = () => {
	const title = i18n.t('label.reports.carSituations');
	const data: any[] = [];
	generatePDF(data, title);
};

export const driverSituationsReport = () => {
	const title = i18n.t('label.reports.driverSituations');
	const data: any[] = [];
	generatePDF(data, title);
};

export const carDriverRelationReport = () => {
	const title = i18n.t('label.reports.carDriverRelation');
	const data: any[] = [];
	generatePDF(data, title);
};

export const dragsListReport = () => {
	const title = i18n.t('label.reports.dragsList');
	const data: any[] = [];
	generatePDF(data, title);
};

export const routingSheetsReport = () => {
	const title = i18n.t('label.reports.routingSheets');
	const data: any[] = [];
	generatePDF(data, title);
};

//TODO request interface tho it should be the id
export const requestModificationsReport = (request: any) => {
	console.log(request);
	const title = i18n.t('label.reports.requestModifications');
	const data: any[] = [];
	generatePDF(data, title);
};

export const generatePDF = (data: any[], title: string) => {
	// export const generatePDF = (data: any[], headers: string[], title: string) => {
	const doc = new jsPDF();
	doc.setFont('Helvetica', 'normal');
	doc.setTextColor(0, 0, 0);
	const img = document.createElement('img');
	img.src = '/logo.png';
	doc.addImage(img, 'png', 75, 5, 25, 25);
	doc.text(PUBLIC_APP_NAME, 105, 20);
	doc.text(title, 10, 50);
	if (data && data.length > 0) {
		const headers = Object.keys(data[0]);
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
