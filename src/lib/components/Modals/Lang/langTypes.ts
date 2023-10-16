export type LanguageTypes = 'en' | 'es';
export type Lang = { [key in LanguageTypes]: string };
export const LANGUAGES: Lang = { en: 'English', es: 'Español' };
