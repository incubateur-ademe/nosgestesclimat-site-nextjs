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

  const { locales } = i18nConfig

  if (langParam && locales.includes(langParam)) {
    const response = NextResponse.next()
    setLocaleCookie(response, langParam)
    return response
  }

  const result = i18nRouter(request, i18nConfig)

  return result
}

export default i18nMiddleware
