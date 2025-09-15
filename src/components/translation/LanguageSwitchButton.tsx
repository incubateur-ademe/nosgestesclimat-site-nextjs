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

const FR_LOCALE = i18nConfig.locales[0] as Locale
const EN_LOCALE = i18nConfig.locales[1] as Locale
const ES_LOCALE = i18nConfig.locales[2] as Locale

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
    ? { ...langButtonsDisplayed, [ES_LOCALE]: false }
    : langButtonsDisplayed

  const getHref = (newLocale: Locale) => {
    let newPathname = String(pathname)

    if (currentLocale === i18nConfig.defaultLocale) {
      newPathname = `/${newLocale}/${newPathname}`
    } else {
      newPathname = newPathname.replace(`/${currentLocale}`, `/${newLocale}`)
    }

    return newPathname
  }

  const handleClick =
    (newLocale: Locale) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      e.stopPropagation()
      trackEvent(footerClickLanguage(newLocale))
      console.log('CLICK handleclick in LanguageSwitchButton')
      updateLangCookie(newLocale)

      // Force a complete page reload with the new locale
      const newPathname = getHref(newLocale)
      window.location.href = newPathname
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
          lang={i18nConfig.locales[0]}
          href={getHref(FR_LOCALE)}
          onClick={handleClick(FR_LOCALE)}
          color={currentLocale === FR_LOCALE ? 'primary' : 'secondary'}
          size={size}
          aria-label="Passer en français"
          title={
            currentLocale === FR_LOCALE
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
          href={getHref(EN_LOCALE)}
          onClick={handleClick(EN_LOCALE)}
          color={currentLocale === EN_LOCALE ? 'primary' : 'secondary'}
          size={size}
          aria-label="Switch to english"
          title={
            currentLocale === EN_LOCALE
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
          lang={ES_LOCALE}
          href={getHref(ES_LOCALE)}
          onClick={handleClick(ES_LOCALE)}
          color={currentLocale === ES_LOCALE ? 'primary' : 'secondary'}
          size="sm"
          aria-label="Cambiar a español"
          title={
            currentLocale === ES_LOCALE
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
