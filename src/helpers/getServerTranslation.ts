import initI18next from '@/locales/initServer'
import { currentLocale } from 'next-i18n-router'

export async function getServerTranslation(
  namespace?: string,
  options?: { keyPrefix: string }
) {
  const language = currentLocale()

  const i18nextInstance = await initI18next(language || '')

  i18nextInstance.getFixedT(
    language || '',
    'translation',
    options?.keyPrefix ?? ''
  )

  return {
    t: i18nextInstance.getFixedT(
      language || '',
      Array.isArray(namespace) ? namespace[0] : namespace,
      options?.keyPrefix ?? ''
    ),
    i18n: i18nextInstance,
  }
}
