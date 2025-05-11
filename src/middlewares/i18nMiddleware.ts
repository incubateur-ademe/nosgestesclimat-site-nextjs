import i18nConfig, { type Locale } from '@/i18nConfig'
import { i18nRouter } from 'next-i18n-router'
import { type NextRequest, NextResponse } from 'next/server'

function i18nMiddleware(request: NextRequest) {
  // Check if we're on the root path
  if (request.nextUrl.pathname === '/') {
    // Get the locale from cookie
    const cookie = request.cookies.get('NEXT_LOCALE')
    const locale = cookie?.value

    // If we have a valid locale in cookie and it's not the default locale
    if (
      locale &&
      locale !== i18nConfig.defaultLocale &&
      i18nConfig.locales.includes(locale as Locale)
    ) {
      // Redirect to the localized version of the root path
      return NextResponse.redirect(new URL(`/${locale}`, request.url))
    }
  }

  return i18nRouter(request, i18nConfig)
}

export default i18nMiddleware
