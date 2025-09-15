import type { Config } from 'next-i18n-router/dist/types'

export const LOCALE_EN_KEY = 'en'
export const LOCALE_ES_KEY = 'es'
export const LOCALE_FR_KEY = 'fr'

export const NEXT_LOCALE_COOKIE_NAME = 'NEXT_LOCALE'

export type Locale = 'fr' | 'en' | 'es'

const i18nConfig: Config = {
  locales: [LOCALE_FR_KEY, LOCALE_EN_KEY, LOCALE_ES_KEY] as Locale[],
  defaultLocale: LOCALE_FR_KEY as Locale,
  cookieOptions: {
    sameSite: 'none' as const,
    path: '/',
    maxAge: 31536000,
    secure: true,
    //domain: '.nosgestesclimat.fr',
  },
  // localeDetector: (request: NextRequest, config: Config): string => {
  //   // Check for NEXT_LOCALE cookie
  //   const nextLocale = request.cookies.get(NEXT_LOCALE_COOKIE_NAME)?.value
  //   console.log('�� Cookie NEXT_LOCALE:', nextLocale) // Debug

  //   if (nextLocale && config.locales.includes(nextLocale)) {
  //     return nextLocale
  //   }

  //   // Check browser language
  //   const acceptLanguage = request.headers.get('accept-language')
  //   console.log('🌐 Accept-Language:', acceptLanguage) // Debug

  //   if (acceptLanguage) {
  //     const browserLang = acceptLanguage.split(',')[0].split('-')[0]
  //     if (config.locales.includes(browserLang)) {
  //       console.log('⚠️ Using browser language:', browserLang) // Debug
  //       return browserLang
  //     }
  //   }

  //   console.log('🇫🇷 Using default locale') // Debug
  //   return config.defaultLocale
  // },
}

export default i18nConfig
