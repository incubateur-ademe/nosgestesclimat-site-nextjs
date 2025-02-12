import initI18next from '@/locales/initServer'

export async function getServerTranslation(
  language: string,
  namespace?: string,
  options?: { keyPrefix: string }
) {
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
