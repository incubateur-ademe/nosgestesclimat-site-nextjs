'use client'

import '@/locales/initClient'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocale } from './useLocale'

export function useClientTranslation(): ReturnType<typeof useTranslation> {
  const locale = useLocale()
  const prevLocale = useRef(locale)

  const transObject = useTranslation('translation')

  useEffect(() => {
    if (locale !== prevLocale.current) {
      transObject.i18n.changeLanguage(locale)
    }
    prevLocale.current = locale
  }, [locale, transObject])

  if (typeof window === 'undefined') {
    return {
      ...transObject,
      // @ts-expect-error This is a workaround to avoid hydration errors
      t: (key: string, options?: Record<string, unknown>) => key,
    }
  }

  return transObject
}
