'use client'

import { footerClickLanguage } from '@/constants/tracking/layout'
import { FAQ_PATH } from '@/constants/urls/paths'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Emoji from '@/design-system/utils/Emoji'
import type { LangButtonsConfigType } from '@/helpers/language/getLangButtonsDisplayed'
import { updateLangCookie } from '@/helpers/language/updateLangCookie'
import i18nConfig, { type Locale } from '@/i18nConfig'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useCurrentLocale } from 'next-i18n-router/client'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

const NO_ES_PATHNAMES = new Set([FAQ_PATH])

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

  // Check without the
  const langButtonsDisplayedWithFilteredEs = NO_ES_PATHNAMES.has(
    pathname.replace(new RegExp(`^/(${i18nConfig.locales.join('|')})`), '')
  )
    ? { ...langButtonsDisplayed, es: false }
    : langButtonsDisplayed

  const handleChange = (newLocale: Locale) => {
    trackEvent(footerClickLanguage(newLocale))
    console.log('Changing locale for => ', newLocale)
    updateLangCookie(newLocale)
  }

  const getHref = (newLocale: Locale) => {
    let newPathname = pathname
    if (currentLocale === i18nConfig.defaultLocale) {
      newPathname = `/${newLocale}/${pathname}`
    } else {
      newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    }

    return newPathname
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
          onClick={() => handleChange('fr')}
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
          onClick={() => handleChange('en')}
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
          onClick={() => handleChange('es')}
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
