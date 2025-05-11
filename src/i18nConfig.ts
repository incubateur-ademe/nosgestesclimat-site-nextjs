export type Locale = 'fr' | 'en' | 'es'

const i18nConfig = {
  locales: ['fr', 'en', 'es'] as Locale[],
  defaultLocale: 'fr',
  serverSetCookie: 'never' as const,
}

export default i18nConfig
