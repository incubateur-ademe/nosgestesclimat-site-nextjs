export type Locale = 'fr' | 'en' | 'es'

const i18nConfig = {
  locales: ['fr', 'en', 'es'] as Locale[],
  defaultLocale: 'fr',
  cookieOptions: {
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 31536000,
    secure: process.env.NEXT_PUBLIC_ENV === 'production',
  },
}

export default i18nConfig
