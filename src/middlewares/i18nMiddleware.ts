import i18nConfig from '@/i18nConfig'
import { i18nRouter } from 'next-i18n-router'
import { type NextRequest, NextResponse } from 'next/server'

function i18nMiddleware(request: NextRequest) {
  const langParam = request.nextUrl.searchParams.get('lang')

  // If lang parameter is present and valid, we need to ensure the cookie is updated
  if (langParam && i18nConfig.locales.includes(langParam)) {
    const response = i18nRouter(request, i18nConfig)

    // Force update the NEXT_LOCALE cookie with the lang parameter value
    const updatedResponse = NextResponse.next()

    // Copy all headers and status from the original response
    response.headers.forEach((value, key) => {
      updatedResponse.headers.set(key, value)
    })

    // Set the cookie with the lang parameter value
    updatedResponse.cookies.set('NEXT_LOCALE', langParam, {
      ...i18nConfig.cookieOptions,
      maxAge: i18nConfig.cookieOptions?.maxAge || 31536000,
    })

    return updatedResponse
  }

  return i18nRouter(request, i18nConfig)
}

export default i18nMiddleware
