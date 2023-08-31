import '@/locales/initClient'
import { useEffect, useState } from 'react'
import { useTranslation as useLibTranslation } from 'react-i18next'
import { useLocale } from './useLocale'

const runsOnServerSide = typeof window === 'undefined'

export function useClientTranslation() {
  const [initChangeLang, setInitChangeLang] = useState(false)
  const locale = useLocale()
  const transObject = useLibTranslation('translation')

  const { i18n } = transObject

  useEffect(() => {
    if (!initChangeLang) {
      i18n.changeLanguage(locale || '')
      setInitChangeLang(true)
    }
  }, [locale, initChangeLang, i18n])

  if (runsOnServerSide && locale && i18n.resolvedLanguage !== locale) {
    i18n.changeLanguage(locale)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return

      setActiveLng(i18n.resolvedLanguage)
    }, [activeLng, i18n.resolvedLanguage])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!locale || i18n.resolvedLanguage === locale) return

      i18n.changeLanguage(locale)
    }, [locale, i18n])
  }

  return transObject
}
