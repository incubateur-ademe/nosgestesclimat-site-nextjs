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
    secure: true, // Required when using SameSite=None
  },
  localeDetector: false,
}

export default i18nConfig
