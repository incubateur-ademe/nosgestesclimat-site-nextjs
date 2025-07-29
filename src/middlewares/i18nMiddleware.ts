import i18nConfig, { NEXT_LOCALE_COOKIE_NAME } from '@/i18nConfig'
import { i18nRouter } from 'next-i18n-router'
import { type NextRequest, NextResponse } from 'next/server'

// Helper function to get current locale from URL path
function getCurrentLocale(
  pathname: string,
  locales: readonly string[],
  defaultLocale: string
): string {
  const pathSegments = pathname.split('/').filter(Boolean)
  return locales.includes(pathSegments[0]) ? pathSegments[0] : defaultLocale
}

// Helper function to build URL with new locale
function buildUrlWithLocale(
  pathname: string,
  newLocale: string,
  locales: readonly string[]
): string {
  const pathSegments = pathname.split('/').filter(Boolean)

  if (locales.includes(pathSegments[0])) {
    pathSegments[0] = newLocale
  } else {
    pathSegments.unshift(newLocale)
  }

  return '/' + pathSegments.join('/')
}

// Helper function to set locale cookie
function setLocaleCookie(response: NextResponse, locale: string): void {
  response.cookies.set(NEXT_LOCALE_COOKIE_NAME, locale, {
    ...i18nConfig.cookieOptions,
    maxAge: i18nConfig.cookieOptions?.maxAge || 31536000,
  })
}

function i18nMiddleware(request: NextRequest) {
  const langParam = request.nextUrl.searchParams.get('lang')
  const { locales, defaultLocale } = i18nConfig

  // Check if this is an iframe request (either via iframe param or referer)
  const isIframeRequest =
    request.nextUrl.searchParams.has('iframe') ||
    (request.headers.get('referer') &&
      request.headers.get('referer')?.includes('iframe=true'))

  // Special handling for iframe without cookies (e.g., incognito mode)
  if (isIframeRequest && request.cookies.getAll().length === 0) {
    // Try to get locale from pathname first
    const pathnameLocale = getCurrentLocale(
      request.nextUrl.pathname,
      locales,
      defaultLocale
    )

    // If we have a lang param, use it
    if (langParam && locales.includes(langParam)) {
      const response = NextResponse.next()
      setLocaleCookie(response, langParam)
      return response
    }

    // If we have a locale in pathname, use it
    if (pathnameLocale !== defaultLocale) {
      const response = NextResponse.next()
      setLocaleCookie(response, pathnameLocale)
      return response
    }

    // If no specific locale found, let i18nRouter handle it but set cookie based on referer
    const referer = request.headers.get('referer')
    if (referer && referer.includes('lang=fr')) {
      const response = NextResponse.next()
      setLocaleCookie(response, i18nConfig.defaultLocale)
      return response
    }
  }

  // Handle locale change via query parameter
  if (langParam && locales.includes(langParam)) {
    const currentLocale = getCurrentLocale(
      request.nextUrl.pathname,
      locales,
      defaultLocale
    )

    // Redirect if locale needs to change
    if (langParam !== currentLocale) {
      const newPath = buildUrlWithLocale(
        request.nextUrl.pathname,
        langParam,
        locales
      )
      const url = new URL(request.url)
      url.pathname = newPath
      url.searchParams.delete('lang')

      const redirectResponse = NextResponse.redirect(url, 307)
      setLocaleCookie(redirectResponse, langParam)

      return redirectResponse
    }

    // Clean URL if locale is already correct (non-default locales)
    if (request.nextUrl.searchParams.has('lang')) {
      const url = new URL(request.url)
      url.searchParams.delete('lang')

      const cleanResponse = NextResponse.redirect(url, 307)
      setLocaleCookie(cleanResponse, langParam)

      return cleanResponse
    }
  }

  const result = i18nRouter(request, i18nConfig)

  return result
}

export default i18nMiddleware
