'use client'

import ChevronRight from '@/components/icons/ChevronRight'
import { footerClickLanguage } from '@/constants/tracking/layout'
import { captureFooterClickLanguage } from '@/constants/tracking/posthogTrackers'
import DropdownMenu from '@/design-system/layout/DropdownMenu'
import Emoji from '@/design-system/utils/Emoji'
import { updateLangCookie } from '@/helpers/language/updateLangCookie'
import { useAlternateLanguagePaths } from '@/hooks/useAlternateLanguagePaths'
import i18nConfig, { type Locale } from '@/i18nConfig'
import {
  trackMatomoEvent__deprecated,
  trackPosthogEvent,
} from '@/utils/analytics/trackEvent'
import { useCurrentLocale } from 'next-i18n-router/client'
import Link from 'next/link'
import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  size?: 'xs' | 'sm'
  className?: string
}

const LANGUAGES: readonly {
  locale: Locale
  label: string
  flag: string
}[] = [
  { locale: 'fr', label: 'FR', flag: '🇫🇷' },
  { locale: 'en', label: 'EN', flag: '🇬🇧' },
]

const getLanguageTitle = (locale: Locale): string => {
  if (locale === 'fr') {
    return 'FR - Sélectionner la langue française'
  } else {
    return 'EN - Select English language'
  }
}

// Keep the current origin and search params, swap only the pathname for
// the one declared by the page's hreflang metadata — handles pages whose
// slugs differ per locale (e.g. action detail pages)
const generateLanguageUrl = (alternatePath: string): string => {
  const url = new URL(window.location.href)

  url.pathname = alternatePath

  return url.toString()
}

const handleLanguageClick = (newLocale: Locale) => {
  trackMatomoEvent__deprecated(footerClickLanguage(newLocale))
  trackPosthogEvent(captureFooterClickLanguage({ locale: newLocale }))
  updateLangCookie(newLocale)
}

export default function LanguageSwitchButton({
  size = 'sm',
  className,
}: Props) {
  const currentLocale = useCurrentLocale(i18nConfig)
  const alternatePaths = useAlternateLanguagePaths()

  useEffect(() => {
    // If the current locale is different than the NEXT_LOCALE cookie, we update it
    if (
      currentLocale &&
      !document.cookie.includes(`NEXT_LOCALE=${currentLocale}`)
    ) {
      updateLangCookie(currentLocale)
    }
  }, [currentLocale])

  const currentLanguage =
    LANGUAGES.find((language) => language.locale === currentLocale) ??
    LANGUAGES[0]

  const activeLocale: Locale =
    currentLocale === 'fr' || currentLocale === 'en'
      ? currentLocale
      : i18nConfig.defaultLocale

  return (
    <div className={twMerge('max-tiny:mr-1 mr-2', className)}>
      <DropdownMenu
        panelClassName="max-w-24 min-w-24"
        trigger={({ isOpen, buttonRef, buttonId, panelId, onToggle }) => (
          <button
            ref={buttonRef}
            id={buttonId}
            color="secondary"
            aria-expanded={isOpen}
            aria-controls={panelId}
            aria-label={
              activeLocale === 'en'
                ? 'Select language'
                : 'Sélectionner la langue'
            }
            lang={activeLocale}
            title={getLanguageTitle(activeLocale)}
            data-testid="language-switch-button"
            className="hover:bg-primary-100 active:bg-primary-200 transitions-colors inline-flex items-center gap-2 rounded-lg px-2 py-2 sm:px-4 sm:py-3"
            onClick={onToggle}>
            <Emoji>{currentLanguage.flag}</Emoji>
            <span className="text-primary-700 capitalize">
              {currentLanguage.label}
            </span>{' '}
            <ChevronRight
              className={twMerge(
                'ml-1 inline-block w-1.5 transition-transform',
                isOpen ? 'rotate-[-90deg]' : 'rotate-90'
              )}
            />
          </button>
        )}>
        {({ closeMenu, getItemClassName }) => {
          const availableLanguages = LANGUAGES.filter(
            (language) => alternatePaths[language.locale]
          )

          const notActiveLanguage = LANGUAGES.filter(
            (language) => language.locale !== activeLocale
          )[0]

          return (
            <li key={notActiveLanguage.locale}>
              <Link
                href={generateLanguageUrl(
                  alternatePaths[notActiveLanguage.locale]!
                )}
                lang={notActiveLanguage.locale}
                data-testid={`language-switch-button-${notActiveLanguage.locale}`}
                title={getLanguageTitle(notActiveLanguage.locale)}
                onClick={() => {
                  handleLanguageClick(notActiveLanguage.locale)
                  closeMenu()
                }}
                className={getItemClassName({
                  index: 0,
                  itemsCount: 1,
                })}>
                <Emoji>{notActiveLanguage.flag}</Emoji>

                <span className="text-primary-700 font-normal capitalize">
                  {notActiveLanguage.label}
                </span>
              </Link>
            </li>
          )
        }}
      </DropdownMenu>
    </div>
  )
}
