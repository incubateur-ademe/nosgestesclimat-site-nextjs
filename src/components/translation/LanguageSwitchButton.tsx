'use client'

import { footerClickLanguage } from '@/constants/tracking/layout'
import { FAQ_PATH } from '@/constants/urls/paths'
import Button from '@/design-system/buttons/Button'
import Emoji from '@/design-system/utils/Emoji'
import type { LangButtonsConfigType } from '@/helpers/language/getLangButtonsDisplayed'
import { updateLang } from '@/helpers/language/updateLang'
import { updateLangCookie } from '@/helpers/language/updateLangCookie'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import i18nConfig, { type Locale } from '@/i18nConfig'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useCurrentLocale } from 'next-i18n-router/client'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect } from 'react'
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
  const { t } = useClientTranslation()

  const currentLocale = useCurrentLocale(i18nConfig)

  const pathname = usePathname()

  // Check without the
  const langButtonsDisplayedWithFilteredEs = NO_ES_PATHNAMES.has(
    pathname.replace(
      `/^/(${i18nConfig.locales[1]}|${i18nConfig.locales[2]})/`,
      ''
    )
  )
    ? { ...langButtonsDisplayed, es: false }
    : langButtonsDisplayed

  useEffect(() => {
    // If the current locale is different than the NEXT_LOCALE cookie, we update it
    if (
      currentLocale &&
      document.cookie.indexOf(`NEXT_LOCALE=${currentLocale}`) === -1
    ) {
      updateLangCookie(currentLocale)
    }
  }, [currentLocale])

  const handleChange = useCallback(
    (newLocale: Locale) => {
      trackEvent(footerClickLanguage(newLocale))

      updateLang({
        newLocale,
        currentLocale: currentLocale ?? '',
      })
    },
    [currentLocale]
  )

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
        <Button
          lang="fr"
          color={currentLocale === 'fr' ? 'primary' : 'secondary'}
          onClick={() => handleChange('fr')}
          size={size}
          aria-label={t('Passer en français')}
          className="flex items-center gap-2 px-2 py-2 sm:px-4 sm:py-3"
          data-cypress-id="language-switch-button-fr">
          <span>FR</span> <Emoji>🇫🇷</Emoji>
        </Button>
      )}

      {langButtonsDisplayedWithFilteredEs.en && (
        <Button
          lang="en"
          color={currentLocale === 'en' ? 'primary' : 'secondary'}
          onClick={() => handleChange('en')}
          size={size}
          aria-label={t('Switch to english')}
          className="flex items-center gap-2 px-2 py-2 sm:px-4 sm:py-3"
          data-cypress-id="language-switch-button-en">
          <span>EN</span> <Emoji>🇬🇧</Emoji>
        </Button>
      )}

      {langButtonsDisplayedWithFilteredEs.es && (
        <Button
          lang="es"
          color={currentLocale === 'es' ? 'primary' : 'secondary'}
          onClick={() => handleChange('es')}
          size="sm"
          aria-label={t('Cambiar a español')}
          className="flex gap-2 px-2 py-2 sm:px-4 sm:py-3"
          data-cypress-id="language-switch-button-es">
          <span>ES</span> <Emoji>🇪🇸</Emoji>
        </Button>
      )}
    </div>
  )
}
