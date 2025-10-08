'use client'

import { FAQ_PATH } from '@/constants/urls/paths'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Emoji from '@/design-system/utils/Emoji'
import type { LangButtonsConfigType } from '@/helpers/language/getLangButtonsDisplayed'
import i18nConfig, { type Locale } from '@/i18nConfig'
import { useCurrentLocale } from 'next-i18n-router/client'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

const NO_ES_PATHNAMES = new Set([FAQ_PATH])

// Helper function to safely remove locale from pathname using string methods instead of regex
function removeLocaleFromPathname(
  pathname: string,
  locales: readonly string[]
): string {
  if (!pathname || typeof pathname !== 'string') {
    return pathname
  }

  // Use string methods instead of regex for more predictable behavior
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(`/${locale}`.length)
    }
    if (pathname === `/${locale}`) {
      return '/'
    }
  }

  return pathname
}

export default function LanguageSwitchButton({
  langButtonsDisplayed = {
    fr: true,
    en: true,
    es: true,
  },
  size = 'sm',
  className,
}: {
  langButtonsDisplayed?: LangButtonsConfigType
  size?: 'xs' | 'sm'
  className?: string
}) {
  const currentLocale = useCurrentLocale(i18nConfig)
  const pathname = usePathname()

  // Stable function to get href for a locale - memoized to prevent unnecessary re-renders
  const getHref = useCallback(
    (newLocale: Locale) => {
      // Get pathname without current locale
      const pathWithoutCurrentLocale = removeLocaleFromPathname(
        pathname,
        i18nConfig.locales
      )

      // Ensure path starts with / and add new locale
      const cleanPath = pathWithoutCurrentLocale.startsWith('/')
        ? pathWithoutCurrentLocale
        : `/${pathWithoutCurrentLocale}`

      return `/${newLocale}${cleanPath}`
    },
    [pathname]
  )

  // // Memoize the pathname without locale for ES filtering - only recalculate when pathname changes
  // const pathWithoutLocale = useMemo(() => {
  //   return removeLocaleFromPathname(pathname, i18nConfig.locales)
  // }, [pathname])

  // // Memoize the filtered language buttons - only recalculate when pathname or config changes
  // const langButtonsDisplayedWithFilteredEs = useMemo(
  //   () =>
  //     NO_ES_PATHNAMES.has(pathWithoutLocale)
  //       ? { ...langButtonsDisplayed, es: false }
  //       : langButtonsDisplayed,
  //   [pathWithoutLocale, langButtonsDisplayed]
  // )

  // Early return if no buttons should be displayed
  if (
    Object.entries(langButtonsDisplayed ?? {}).every(([_, value]) => !value)
  ) {
    return null
  }

  return (
    <div
      className={twMerge(
        'flex flex-wrap items-center gap-1 sm:gap-2',
        className
      )}>
      {/* {langButtonsDisplayedWithFilteredEs.fr && ( */}
      <ButtonLink
        lang="fr"
        // href={getHref('fr')}
        href="/"
        color={currentLocale === 'fr' ? 'primary' : 'secondary'}
        size={size}
        aria-label="Passer en français"
        title={
          currentLocale === 'fr'
            ? 'FR - Langue active'
            : 'FR - Sélectionner la langue française'
        }
        className="flex items-center gap-2 px-2 py-2 sm:px-4 sm:py-3"
        data-cypress-id="language-switch-button-fr">
        <span>FR</span> <Emoji>🇫🇷</Emoji>
      </ButtonLink>
      {/* )} */}

      {/* {langButtonsDisplayedWithFilteredEs.en && ( */}
      <ButtonLink
        lang="en"
        // href={getHref('en')}
        href="/en"
        color={currentLocale === 'en' ? 'primary' : 'secondary'}
        size={size}
        aria-label="Switch to english"
        title={
          currentLocale === 'en'
            ? 'EN - Active language'
            : 'EN - Select English language'
        }
        className="flex items-center gap-2 px-2 py-2 sm:px-4 sm:py-3"
        data-cypress-id="language-switch-button-en">
        <span>EN</span> <Emoji>🇬🇧</Emoji>
      </ButtonLink>
      {/* )} */}

      {/* {langButtonsDisplayedWithFilteredEs.es && ( */}
      <ButtonLink
        lang="es"
        // href={getHref('es')}
        href="/es"
        color={currentLocale === 'es' ? 'primary' : 'secondary'}
        size="sm"
        aria-label="Cambiar a español"
        title={
          currentLocale === 'es'
            ? 'ES - Activa el idioma español'
            : 'ES - Seleccionar el idioma español'
        }
        className="flex gap-2 px-2 py-2 sm:px-4 sm:py-3"
        data-cypress-id="language-switch-button-es">
        <span>ES</span> <Emoji>🇪🇸</Emoji>
      </ButtonLink>
      {/* )} */}
    </div>
  )
}
