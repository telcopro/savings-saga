import { en } from './en';
import { sv } from './sv';
import { de } from './de';

export const translations = {
  en,
  sv,
  de
};

export type Language = 'en' | 'sv' | 'de';
export type TranslationKey = keyof typeof translations.en;