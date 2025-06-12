export const LOCALE_EN_KEY = 'en'
export const LOCALE_ES_KEY = 'es'
export const LOCALE_FR_KEY = 'fr'

export type Locale = 'fr' | 'en' | 'es'

interface Request {
  cookies: {
    get: (name: string) => { value: string } | undefined
  }
  headers: {
    get: (name: string) => string | null
  }
  nextUrl: {
    searchParams: {
      get: (name: string) => string | null
    }
  }
}

interface Config {
  locales: readonly string[]
  defaultLocale: string
}

const i18nConfig = {
  locales: [LOCALE_FR_KEY, LOCALE_EN_KEY, LOCALE_ES_KEY] as Locale[],
  defaultLocale: LOCALE_FR_KEY as Locale,
  cookieOptions: {
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 31536000,
    secure: process.env.NEXT_PUBLIC_ENV === 'production',
  },
  localeDetector: (request: Request, config: Config): string => {
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
