import i18n from '$lib/i18n';
import type { SituationType } from '$lib/services/SituationService';

export const situations: { label: string; value: SituationType }[] = [
	{ label: i18n.t('label.car'), value: 'car' },
	{ label: i18n.t('label.driver'), value: 'driver' },
	{ label: i18n.t('label.car_driver'), value: 'car_driver' }
];
