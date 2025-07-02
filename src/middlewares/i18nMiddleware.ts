import i18nConfig from '@/i18nConfig'
import { i18nRouter } from 'next-i18n-router'
import { type NextRequest, NextResponse } from 'next/server'

function i18nMiddleware(request: NextRequest) {
  const response = i18nRouter(request, i18nConfig)
  const langParam = request.nextUrl.searchParams.get('lang')
  const { locales, defaultLocale } = i18nConfig

  if (langParam && locales.includes(langParam)) {
    // Récupérer le segment de locale courant dans l'URL
    const pathname = request.nextUrl.pathname
    const pathSegments = pathname.split('/').filter(Boolean)
    const currentLocale = locales.includes(pathSegments[0])
      ? pathSegments[0]
      : defaultLocale

    // Si la locale demandée est différente de la locale courante, on redirige
    if (langParam !== currentLocale) {
      // On reconstruit l'URL avec la bonne locale
      const newPathSegments = [...pathSegments]
      if (locales.includes(newPathSegments[0])) {
        newPathSegments[0] = langParam
      } else {
        newPathSegments.unshift(langParam)
      }
      const newPath = '/' + newPathSegments.join('/')
      const url = new URL(request.url)
      url.pathname = newPath
      url.searchParams.delete('lang')
      const redirectResponse = NextResponse.redirect(url, 307)
      redirectResponse.cookies.set('NEXT_LOCALE', langParam, {
        ...i18nConfig.cookieOptions,
        maxAge: i18nConfig.cookieOptions?.maxAge || 31536000,
      })
      return redirectResponse
    }
    // Si la locale est déjà correcte, on nettoie juste l'URL et on met à jour le cookie
    if (request.nextUrl.searchParams.has('lang')) {
      const url = new URL(request.url)
      url.searchParams.delete('lang')
      const cleanResponse = NextResponse.redirect(url, 307)
      cleanResponse.cookies.set('NEXT_LOCALE', langParam, {
        ...i18nConfig.cookieOptions,
        maxAge: i18nConfig.cookieOptions?.maxAge || 31536000,
      })
      return cleanResponse
    }
  }

  return response
}

export default i18nMiddleware
