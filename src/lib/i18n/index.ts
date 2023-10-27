import { lang } from '$lib/stores';
import rosetta from 'rosetta';
import { get } from 'svelte/store';

import en from './locales/en';
import es from './locales/es';

const i18n = rosetta({ en });
i18n.set('es', es);

i18n.locale(get(lang));

export default i18n;
export const getTranslatedHeader = (header: string) =>
	i18n.t(`table.header.${header}`) || `i18n - ${header}`;
