import { updateLang } from '@/helpers/language/updateLang'
import type { Locale } from '@/i18nConfig'
import { useEffect, useState } from 'react'
import { useIframe } from '../useIframe'
import { useLocale } from '../useLocale'

export function useSetIframeLang() {
  const [isLangSet, setIsLangSet] = useState(false)
  // If the lang is fixed by the iframe and is not the same as the current locale, we change it here
  const { iframeLang } = useIframe()

  const currentLocale = useLocale()

  useEffect(() => {
    if (iframeLang && iframeLang !== currentLocale && !isLangSet) {
      updateLang({
        newLocale: iframeLang as Locale,
        currentLocale: currentLocale ?? '',
      })
      setIsLangSet(true)
    }
  }, [iframeLang, currentLocale, isLangSet])
}
