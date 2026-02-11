'use client'

import { footerClickLanguage } from '@/constants/tracking/layout'
import ButtonAnchor from '@/design-system/buttons/ButtonAnchor'
import Emoji from '@/design-system/utils/Emoji'
import { updateLangCookie } from '@/helpers/language/updateLangCookie'
import { useIsClient } from '@/hooks/useIsClient'
import i18nConfig, { type Locale } from '@/i18nConfig'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useCurrentLocale } from 'next-i18n-router/client'
import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
interface Props {
  size?: 'xs' | 'sm'
  className?: string
}

const generateLanguageUrl = (
  newLocale: Locale,
  currentLocale: string
): string => {
  if (typeof window === 'undefined') {
    return '#'
  }

  const url = new URL(window.location.href)
  const { pathname } = url

  // Reset to default locale
  if (
    newLocale === i18nConfig.defaultLocale &&
    currentLocale !== i18nConfig.defaultLocale
  ) {
    url.pathname = pathname.replace(`/${currentLocale}`, '')
  } else {
    // Add locale prefix
    if (currentLocale === i18nConfig.defaultLocale) {
      url.pathname = `/${newLocale}${pathname}`
    } else {
      url.pathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    }
  }

  return url.toString()
}

const handleLanguageClick = (newLocale: Locale) => {
  trackEvent(footerClickLanguage(newLocale))
  updateLangCookie(newLocale)
}

export default function LanguageSwitchButtonClient({
  size = 'sm',
  className,
}: Props) {
  const currentLocale = useCurrentLocale(i18nConfig)
  const isClient = useIsClient()

  useEffect(() => {
    // If the current locale is different than the NEXT_LOCALE cookie, we update it
    if (
      currentLocale &&
      !document.cookie.includes(`NEXT_LOCALE=${currentLocale}`)
    ) {
      updateLangCookie(currentLocale)
    }
  }, [currentLocale])

  return (
    <div
      className={twMerge(
        'flex flex-wrap items-center gap-1 sm:gap-2',
        className
      )}>
      <ButtonAnchor
        href={
          isClient
            ? generateLanguageUrl(
                'fr',
                currentLocale ?? i18nConfig.defaultLocale
              )
            : '#'
        }
        color={currentLocale === 'fr' ? 'primary' : 'secondary'}
        onClick={() => handleLanguageClick('fr')}
        size={size}
        aria-label="Passer en français"
        title={
          currentLocale === 'fr'
            ? 'FR - Langue active'
            : 'FR - Sélectionner la langue française'
        }
        className="flex items-center gap-2 px-2 py-2 sm:px-4 sm:py-3"
        data-testid="language-switch-button-fr">
        <span>FR</span> <Emoji>🇫🇷</Emoji>
      </ButtonAnchor>

      <ButtonAnchor
        href={
          isClient
            ? generateLanguageUrl(
                'en',
                currentLocale ?? i18nConfig.defaultLocale
              )
            : '#'
        }
        color={currentLocale === 'en' ? 'primary' : 'secondary'}
        onClick={() => handleLanguageClick('en')}
        size={size}
        aria-label="Switch to english"
        title={
          currentLocale === 'en'
            ? 'EN - Active language'
            : 'EN - Select English language'
        }
        className="flex items-center gap-2 px-2 py-2 sm:px-4 sm:py-3"
        data-testid="language-switch-button-en">
        <span>EN</span> <Emoji>🇬🇧</Emoji>
      </ButtonAnchor>
    </div>
  )
}
