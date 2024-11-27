'use client'

import { footerClickLanguage } from '@/constants/tracking/layout'
import Button from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import { updateLang } from '@/helpers/language/updateLang'
import { updateLangCookie } from '@/helpers/language/updateLangCookie'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import i18nConfig from '@/i18nConfig'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useCurrentLocale } from 'next-i18n-router/client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export default function LanguageSwitchButton() {
  const { t } = useClientTranslation()

  const currentPathname = usePathname()

  const searchParams = useSearchParams().toString()

  const currentLocale = useCurrentLocale(i18nConfig)

  useEffect(() => {
    // If the current locale is different than the NEXT_LOCALE cookie, we update it
    if (
      currentLocale &&
      document.cookie.indexOf(`NEXT_LOCALE=${currentLocale}`) === -1
    ) {
      updateLangCookie(currentLocale)
    }
  }, [currentLocale, currentPathname])

  const handleChange = useCallback(
    (newLocale: string) => {
      trackEvent(footerClickLanguage(newLocale))

      updateLang({
        newLocale,
        currentLocale: currentLocale ?? '',
        currentPathname,
        searchParams,
      })
    },
    [currentLocale, currentPathname, searchParams]
  )

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
