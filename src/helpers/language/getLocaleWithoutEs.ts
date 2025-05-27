import type { Locale } from '@/i18nConfig'
import i18nConfig from '@/i18nConfig'

export function getLocaleWithoutEs(locale: Locale) {
  if (!locale) return i18nConfig.defaultLocale

  return locale === 'es' ? 'en' : locale
}
