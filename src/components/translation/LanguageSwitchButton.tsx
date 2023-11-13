'use client'

import Button from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useIframe } from '@/hooks/useIframe'
import i18nConfig from '@/i18nConfig'
import { useCurrentLocale } from 'next-i18n-router/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function LanguageSwitchButton() {
  const { t } = useClientTranslation()

  const router = useRouter()

  const currentPathname = usePathname()

  const searchParams = useSearchParams().toString()

  const currentLocale = useCurrentLocale(i18nConfig)

  // If the lang is fixed by the iframe and is not the same as the current locale, we change it here
  const { iframeLang } = useIframe()
  useEffect(() => {
    if (iframeLang && iframeLang !== currentLocale) {
      handleChange(iframeLang)
    }
  }, [iframeLang, currentLocale])

  const handleChange = (newLocale: string) => {
    // set cookie for next-i18n-router
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = '; expires=' + date.toUTCString()
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

    if (currentLocale === i18nConfig.defaultLocale) {
      router.push(
        '/' +
          newLocale +
          currentPathname +
          (searchParams.length > 0 ? `?=${searchParams}` : '')
      )
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`) +
          (searchParams.length > 0 ? `?=${searchParams}` : '')
      )
    }

    router.refresh()
  }

  return (
    <div className="flex gap-2">
      <Button
        lang="fr"
        color={currentLocale === 'fr' ? 'primary' : 'secondary'}
        onClick={() => handleChange('fr')}
        size="sm"
        aria-label={t('Passer en français')}
        className="flex gap-2 px-4 py-3"
        data-cypress-id="language-switch-button-fr">
        <span>FR</span> <span aria-hidden>🇫🇷</span>
      </Button>
      <Button
        lang="en"
        color={currentLocale === 'en' ? 'primary' : 'secondary'}
        onClick={() => handleChange('en')}
        size="sm"
        aria-label={t('Switch to english')}
        className="flex gap-2 px-4 py-3"
        data-cypress-id="language-switch-button-en">
        <span>EN</span> <span aria-hidden>🇬🇧</span>
      </Button>
    </div>
  )
}
