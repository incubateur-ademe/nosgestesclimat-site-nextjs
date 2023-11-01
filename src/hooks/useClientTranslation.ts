'use client'

import { useIsClient } from '@/app/_components/IsClientCtxProvider'
import '@/locales/initClient'
import { useEffect, useState } from 'react'
import { useTranslation as useLibTranslation } from 'react-i18next'
import { useLocale } from './useLocale'

export function useClientTranslation() {
  const locale = useLocale()
  const transObject = useLibTranslation('translation')

  const { i18n } = transObject

  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)

  const isClient = useIsClient()

  // Sets the active language if different than the resolved language
  useEffect(() => {
    if (activeLng === i18n.resolvedLanguage || !isClient) return

    setActiveLng(i18n.resolvedLanguage)
  }, [activeLng, i18n.resolvedLanguage, isClient])

  if (!isClient && i18n.resolvedLanguage !== locale) {
    i18n.changeLanguage(locale)
  }

  return transObject
}
