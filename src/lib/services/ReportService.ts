import { PUBLIC_APP_NAME } from '$env/static/public';
import i18n from '$lib/i18n';
import { lang } from '$lib/stores';
import dayjs, { Dayjs } from 'dayjs';
import { get } from 'svelte/store';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const DOWNLOAD_PDFS = true;
const OPEN_PDFS = true;

export const driversListReport = () => {
	const data: any[] = [];
	const title = i18n.t('label.reports.driversList');
	generatePDF(data, title, DOWNLOAD_PDFS, OPEN_PDFS);
};

export const carsListReport = () => {
	const data: any[] = [];
	const title = i18n.t('label.reports.carsList');
	generatePDF(data, title, DOWNLOAD_PDFS, OPEN_PDFS);
};

export const requestsOnDateReport = (date: Dayjs) => {
	const formattedDate = date.format('DD-MM-YYYY');
	const title = i18n.t('label.reports.requestOnDate') + ` (${formattedDate})`;
	const data: any[] = [];
	generatePDF(data, title, DOWNLOAD_PDFS, OPEN_PDFS);
};

export const carSituationsReport = () => {
	const title = i18n.t('label.reports.carSituations');
	const data: any[] = [];
	generatePDF(data, title, DOWNLOAD_PDFS, OPEN_PDFS);
};

export const driverSituationsReport = () => {
	const title = i18n.t('label.reports.driverSituations');
	const data: any[] = [];
	generatePDF(data, title, DOWNLOAD_PDFS, OPEN_PDFS);
};

export const carDriverRelationReport = () => {
	const title = i18n.t('label.reports.carDriverRelation');
	const data: any[] = [];
	generatePDF(data, title, DOWNLOAD_PDFS, OPEN_PDFS);
};

export const dragsListReport = () => {
	const title = i18n.t('label.reports.dragsList');
	const data: any[] = [];
	generatePDF(data, title, DOWNLOAD_PDFS, OPEN_PDFS);
};

export const routingSheetsReport = () => {
	const title = i18n.t('label.reports.routingSheets');
	const data: any[] = [];
	generatePDF(data, title, DOWNLOAD_PDFS, OPEN_PDFS);
};

//TODO request interface tho it should be the id
export const requestModificationsReport = (request: any) => {
	console.log(request);
	const title = i18n.t('label.reports.requestModifications');
	const data: any[] = [];
	generatePDF(data, title, DOWNLOAD_PDFS, OPEN_PDFS);
};

export const generatePDF = (data: any[], title: string, download = true, open = false) => {
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
			head: [headers],
			body,
			startY: 60,
			theme: 'striped'
		});
	}
	download && doc.save(dayjs().unix() + ' - ' + title + '.pdf');
	open && window.open(doc.output('bloburl'), '_blank');
};
