'use client'

import ButtonAnchor from '@/design-system/buttons/ButtonAnchor'
import Emoji from '@/design-system/utils/Emoji'
import type { LangButtonsConfigType } from '@/helpers/language/getLangButtonsDisplayed'
import { updateLangCookie } from '@/helpers/language/updateLangCookie'
import i18nConfig, { type Locale } from '@/i18nConfig'
import { useCurrentLocale } from 'next-i18n-router/client'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

// Fonction utilitaire pour générer l'URL de langue sans utiliser usePathname
function generateLanguageUrl(newLocale: Locale, currentLocale: string): string {
  if (typeof window === 'undefined') {
    return '#'
  }

  const url = new URL(window.location.href)
  const { pathname } = url

  // Si la nouvelle locale est la locale par défaut
  if (newLocale === i18nConfig.defaultLocale) {
    // Enlever le préfixe de l'ancienne locale si elle existe
    if (currentLocale !== i18nConfig.defaultLocale) {
      url.pathname = pathname.replace(`/${currentLocale}`, '')
    }
    // Sinon, on garde le pathname tel quel
  } else {
    // Si on vient de la locale par défaut, ajouter le préfixe
    if (currentLocale === i18nConfig.defaultLocale) {
      url.pathname = `/${newLocale}${pathname}`
    } else {
      // Remplacer l'ancien préfixe par le nouveau
      url.pathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    }
  }

  return url.toString()
}

export default function LanguageSwitchButton({
  langButtonsDisplayed = {
    fr: true,
    en: true,
  },
  size = 'sm',
  className,
}: {
  langButtonsDisplayed?: LangButtonsConfigType
  size?: 'xs' | 'sm'
  className?: string
}) {
  const currentLocale = useCurrentLocale(i18nConfig)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // If the current locale is different than the NEXT_LOCALE cookie, we update it
    if (
      currentLocale &&
      !document.cookie.includes(`NEXT_LOCALE=${currentLocale}`)
    ) {
      updateLangCookie(currentLocale)
    }
  }, [currentLocale])

  const handleLanguageClick = (newLocale: Locale) => {
    trackFooterClickLanguage(newLocale)
    updateLangCookie(newLocale)
  }

  if (Object.entries(langButtonsDisplayed ?? {}).every(([, value]) => !value)) {
    return null
  }

  return (
    <div
      className={twMerge(
        'flex flex-wrap items-center gap-1 sm:gap-2',
        className
      )}>
      {langButtonsDisplayed.fr && (
        <ButtonAnchor
          href={
            isClient
              ? generateLanguageUrl(
                  'fr',
                  currentLocale || i18nConfig.defaultLocale
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
      )}

      {langButtonsDisplayed.en && (
        <ButtonAnchor
          href={
            isClient
              ? generateLanguageUrl(
                  'en',
                  currentLocale || i18nConfig.defaultLocale
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
      )}
    </div>
  )
}
