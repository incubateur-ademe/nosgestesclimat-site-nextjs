import type { Locale } from '@/i18nConfig'
import initI18next from '@/locales/initServer'
import { isLocale } from '@/utils/is-locale'
import type { i18n } from 'i18next'
import { getLocale } from './getLocale'

export async function getServerTranslation({
  locale: _locale,
  namespace,
  options,
}: {
  locale?: string
  namespace?: string
  options?: { keyPrefix: string }
}) {
  const locale = _locale && isLocale(_locale) ? _locale : await getLocale()

  const i18nextInstance = initI18next(locale)

  return {
    t: getT({
      locale,
      i18nextInstance,
      namespace,
      options,
    }),
    i18n: i18nextInstance,
  }
}

// Allows to use t function in server actions
export function getT({
  locale,
  i18nextInstance,
  namespace,
  options,
}: {
  locale: Locale
  i18nextInstance: i18n
  namespace?: string
  options?: { keyPrefix: string }
}) {
  return i18nextInstance.getFixedT(locale, namespace, options?.keyPrefix ?? '')
}
