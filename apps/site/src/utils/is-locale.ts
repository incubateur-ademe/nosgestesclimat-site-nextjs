import type { Locale } from '@/i18nConfig'
import i18nConfig from '@/i18nConfig'

export function isLocale(value: string | undefined): value is Locale {
  return i18nConfig.locales.some((locale) => locale === value)
}
