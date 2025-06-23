import { Config } from 'next-i18n-router/dist/types'
import { NextRequest } from 'next/server'

export const LOCALE_EN_KEY = 'en'
export const LOCALE_ES_KEY = 'es'
export const LOCALE_FR_KEY = 'fr'

export type Locale = 'fr' | 'en' | 'es'

const i18nConfig: Config = {
  locales: [LOCALE_FR_KEY, LOCALE_EN_KEY, LOCALE_ES_KEY] as Locale[],
  defaultLocale: LOCALE_FR_KEY as Locale,
  cookieOptions: {
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 31536000,
    secure: process.env.NEXT_PUBLIC_ENV === 'production',
  },
  localeDetector: (request: NextRequest, config: Config): string => {
    // Check for NEXT_LOCALE cookie
    const nextLocale = request.cookies.get('NEXT_LOCALE')?.value
    if (nextLocale && config.locales.includes(nextLocale)) {
      return nextLocale
    }

    // Check for lang query parameter
    const langParam = request.nextUrl.searchParams.get('lang')
    if (langParam && config.locales.includes(langParam)) {
      return langParam
    }

    // Check browser language
    const acceptLanguage = request.headers.get('accept-language')
    if (acceptLanguage) {
      const browserLang = acceptLanguage.split(',')[0].split('-')[0]
      if (config.locales.includes(browserLang)) {
        return browserLang
      }
    }

    // Return default locale
    return config.defaultLocale
  },
}

export default i18nConfig
