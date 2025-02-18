// config/i18n.ts
export const locales = ['en', 'fr', 'ar'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';

// Directory where your translation files are stored
export const localePrefix = 'always'; // 'as-needed' | 'always' | 'never'