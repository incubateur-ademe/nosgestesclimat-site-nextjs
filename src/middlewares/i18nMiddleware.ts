import i18nConfig from '@/i18nConfig'
import { i18nRouter } from 'next-i18n-router'
import { type NextRequest } from 'next/server'

function i18nMiddleware(request: NextRequest) {
  const response = i18nRouter(request, i18nConfig)

  const detectedLocale =
    response.headers.get('x-next-i18n-router-locale') ||
    i18nConfig.defaultLocale

  const existingCookie = request.cookies.get('NEXT_LOCALE')?.value

  if (!existingCookie || existingCookie !== detectedLocale) {
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = '; expires=' + date.toUTCString()

    const cookieString = `NEXT_LOCALE=${detectedLocale};expires=${expires}; path=/; SameSite=None; Secure`

    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      expires: date,
      path: '/',
      sameSite: 'none',
      secure: true,
    })

    console.log('�� Setting NEXT_LOCALE cookie in middleware:', {
      detectedLocale,
      existingCookie,
      cookieString,
    })
  }

  return response
}

export default i18nMiddleware
