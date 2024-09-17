'use client'

import { footerClickLanguage } from '@/constants/tracking/layout'
import Button from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useIframe } from '@/hooks/useIframe'
import i18nConfig from '@/i18nConfig'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useCurrentLocale } from 'next-i18n-router/client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export default function LanguageSwitchButton() {
  const { t } = useClientTranslation()

  const currentPathname = usePathname()

  const searchParams = useSearchParams()?.toString()

  const currentLocale = useCurrentLocale(i18nConfig)

  function updateCookie(locale: string) {
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = '; expires=' + date.toUTCString()
    document.cookie = `NEXT_LOCALE=${locale};expires=${expires}; path=/; SameSite=None; Secure`
  }

  useEffect(() => {
    // If the current locale is different than the NEXT_LOCALE cookie, we update it
    if (
      currentLocale &&
      document.cookie.indexOf(`NEXT_LOCALE=${currentLocale}`) === -1
    ) {
      updateCookie(currentLocale)
    }
  }, [currentLocale, currentPathname])

  const handleChange = useCallback(
    (newLocale: string) => {
      trackEvent(footerClickLanguage(newLocale))
      // set cookie for next-i18n-router
      updateCookie(newLocale)

      if (currentLocale === i18nConfig.defaultLocale) {
        window.location.href =
          '/' +
          newLocale +
          currentPathname +
          (searchParams?.length ?? 0 > 0 ? `?${searchParams}` : '')
      } else {
        window.location.href =
          currentPathname?.replace(`/${currentLocale}`, `/${newLocale}`) +
          (searchParams?.length ?? 0 > 0 ? `?${searchParams}` : '')
      }
    },
    [currentLocale, currentPathname, searchParams]
  )

  // If the lang is fixed by the iframe and is not the same as the current locale, we change it here
  const { iframeLang } = useIframe()
  useEffect(() => {
    if (iframeLang && iframeLang !== currentLocale) {
      handleChange(iframeLang)
    }
  }, [iframeLang, currentLocale, handleChange])

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        lang="fr"
        color={currentLocale === 'fr' ? 'primary' : 'secondary'}
        onClick={() => handleChange('fr')}
        size="sm"
        aria-label={t('Passer en français')}
        className="flex items-center gap-2 px-4 py-3"
        data-cypress-id="language-switch-button-fr">
        <span>FR</span> <Emoji>🇫🇷</Emoji>
      </Button>
      <Button
        lang="en"
        color={currentLocale === 'en' ? 'primary' : 'secondary'}
        onClick={() => handleChange('en')}
        size="sm"
        aria-label={t('Switch to english')}
        className="flex items-center gap-2 px-4 py-3"
        data-cypress-id="language-switch-button-en">
        <span>EN</span> <Emoji>🇬🇧</Emoji>
      </Button>

      <Button
        lang="es"
        color={currentLocale === 'es' ? 'primary' : 'secondary'}
        onClick={() => handleChange('es')}
        size="sm"
        aria-label={t('Cambiar a español')}
        className="flex gap-2 px-4 py-3"
        data-cypress-id="language-switch-button-es">
        <span>ES</span> <Emoji>🇪🇸</Emoji>
      </Button>
    </div>
  )
}
