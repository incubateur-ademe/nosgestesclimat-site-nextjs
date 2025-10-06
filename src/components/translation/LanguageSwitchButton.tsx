'use client'

import { FAQ_PATH } from '@/constants/urls/paths'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Emoji from '@/design-system/utils/Emoji'
import type { LangButtonsConfigType } from '@/helpers/language/getLangButtonsDisplayed'
import i18nConfig, { type Locale } from '@/i18nConfig'
import { useCurrentLocale } from 'next-i18n-router/client'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

const NO_ES_PATHNAMES = new Set([FAQ_PATH])

// Helper function to safely escape regex special characters
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Helper function to safely remove locale from pathname
function removeLocaleFromPathname(
  pathname: string,
  locales: readonly string[]
): string {
  if (!pathname || typeof pathname !== 'string') {
    return pathname
  }

  // Create a safe regex pattern by escaping each locale
  const escapedLocales = locales.map(escapeRegex).join('|')
  const localePattern = new RegExp(`^/(${escapedLocales})(/|$)`)

  return pathname.replace(localePattern, '/')
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
  const originalPathname = usePathname()

  // Create a safe copy of the pathname to avoid any potential mutations
  const pathname = String(originalPathname)

  // Safely get pathname without locale for ES filtering
  const pathWithoutLocale = removeLocaleFromPathname(
    pathname,
    i18nConfig.locales
  )

  const langButtonsDisplayedWithFilteredEs = NO_ES_PATHNAMES.has(
    pathWithoutLocale
  )
    ? { ...langButtonsDisplayed, es: false }
    : langButtonsDisplayed

  const getHref = (newLocale: Locale) => {
    // Safely remove current locale from pathname
    const pathWithoutCurrentLocale = removeLocaleFromPathname(
      pathname,
      i18nConfig.locales
    )

    // Ensure path starts with / and add new locale
    const cleanPath = pathWithoutCurrentLocale.startsWith('/')
      ? pathWithoutCurrentLocale
      : `/${pathWithoutCurrentLocale}`

    return `/${newLocale}${cleanPath}`
  }

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
      {langButtonsDisplayedWithFilteredEs.fr && (
        <ButtonLink
          lang="fr"
          href={getHref('fr')}
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
      )}

      {langButtonsDisplayedWithFilteredEs.en && (
        <ButtonLink
          lang="en"
          href={getHref('en')}
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
      )}

      {langButtonsDisplayedWithFilteredEs.es && (
        <ButtonLink
          lang="es"
          href={getHref('es')}
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
      )}
    </div>
  )
}
