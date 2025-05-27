export const LOCALE_EN_KEY = 'en'
export const LOCALE_ES_KEY = 'es'
export const LOCALE_FR_KEY = 'fr'

export type Locale = 'fr' | 'en' | 'es'

const i18nConfig = {
  locales: [LOCALE_FR_KEY, LOCALE_EN_KEY, LOCALE_ES_KEY] as Locale[],
  defaultLocale: LOCALE_FR_KEY,
  cookieOptions: {
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 31536000,
    secure: process.env.NEXT_PUBLIC_ENV === 'production',
  },
}

export default i18nConfig
