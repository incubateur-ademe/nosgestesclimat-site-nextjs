import i18nConfig from '@/i18nConfig'
import { i18nRouter } from 'next-i18n-router'
import { type NextRequest } from 'next/server'

function i18nMiddleware(request: NextRequest) {
  const response = i18nRouter(request, i18nConfig)

  const detectedLocale =
    response.headers.get('x-next-i18n-router-locale') ||
    i18nConfig.defaultLocale

  const existingCookie = request.cookies.get('NEXT_LOCALE')

  if (!existingCookie || existingCookie.value !== detectedLocale) {
    const date = new Date()
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000)

    // const host = request.headers.get('host') || ''
    // const domain = host.startsWith('www.')
    //   ? `.${host.substring(4)}`
    //   : `.${host}`

    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      expires: date,
      path: '/',
      sameSite: 'lax',
      secure: true,
      // domain: domain,
    })
  }

  return response
}

export default i18nMiddleware
