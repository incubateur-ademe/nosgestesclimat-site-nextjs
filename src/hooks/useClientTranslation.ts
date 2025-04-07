'use client'

import '@/locales/initClient'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocale } from './useLocale'

export function useClientTranslation(): ReturnType<typeof useTranslation> {
  const locale = useLocale()

  const transObject = useTranslation('translation')

  const prevLocale = useRef(locale)

  console.log('client translation', transObject.t('Navigation principale'))

  useEffect(() => {
    if (locale !== prevLocale.current) {
      transObject.i18n.changeLanguage(locale)
    }
    prevLocale.current = locale
  }, [locale, transObject])

  return transObject
}
