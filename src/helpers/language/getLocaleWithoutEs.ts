import type { Locale } from '@/i18nConfig'
import i18nConfig, { LOCALE_EN_KEY, LOCALE_ES_KEY } from '@/i18nConfig'

export function getLocaleWithoutEs(locale: Locale) {
  if (!locale) return i18nConfig.defaultLocale

  if (!i18nConfig.locales.includes(locale)) {
    return LOCALE_EN_KEY
  }

  return locale === LOCALE_ES_KEY ? LOCALE_EN_KEY : locale
}
