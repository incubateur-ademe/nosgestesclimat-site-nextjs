import i18nConfig from '@/i18nConfig'

export function getCMSLocale(locale: string) {
  // If spanish, return english
  if (locale === i18nConfig.locales[2]) {
    return i18nConfig.locales[1]
  }

  return locale
}
