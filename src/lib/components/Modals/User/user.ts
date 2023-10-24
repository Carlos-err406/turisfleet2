import type { DropdownOption } from '$lib/components/Inputs/Dropdown.svelte';
import i18n from '$lib/i18n';

export const roles: DropdownOption[] = [
	{ label: i18n.t('label.administrator'), value: 'administrator' },
	{ label: i18n.t('label.support'), value: 'support' },
	{ label: i18n.t('label.agent'), value: 'agent' },
	{ label: i18n.t('label.driver'), value: 'driver' }
];
