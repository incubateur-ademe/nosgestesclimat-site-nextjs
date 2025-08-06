import type { Config } from 'next-i18n-router/dist/types'
import type { NextRequest } from 'next/server'

export const LOCALE_EN_KEY = 'en'
export const LOCALE_ES_KEY = 'es'
export const LOCALE_FR_KEY = 'fr'

export const NEXT_LOCALE_COOKIE_NAME = 'NEXT_LOCALE'

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
    const langParam = request.nextUrl.searchParams.get('lang')

    // Check first for lang param (prioritized for iframes)
    if (langParam && config.locales.includes(langParam)) {
      return langParam
    }

    // Check for NEXT_LOCALE cookie
    const nextLocale = request.cookies.get(NEXT_LOCALE_COOKIE_NAME)?.value
    if (nextLocale && config.locales.includes(nextLocale)) {
      return nextLocale
    }

    // Check if this is an iframe request
    const isIframeRequest =
      request.nextUrl.searchParams.has('iframe') ||
      (request.headers.get('referer') &&
        request.headers.get('referer')?.includes('iframe=true'))

    // Check browser language (only for non-iframe requests)
    if (!isIframeRequest) {
      const acceptLanguage = request.headers.get('accept-language')
      if (acceptLanguage) {
        const browserLang = acceptLanguage.split(',')[0].split('-')[0]
        if (config.locales.includes(browserLang)) {
          return browserLang
        }
      }
    }

    // Return default locale
    return config.defaultLocale
  },
}

export default i18nConfig
