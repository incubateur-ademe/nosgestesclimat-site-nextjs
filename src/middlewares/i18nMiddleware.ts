import i18nConfig from '@/i18nConfig'
import { i18nRouter } from 'next-i18n-router'
import { NextRequest } from 'next/server'

function i18nMiddleware(request: NextRequest) {
  // if (!request.nextUrl.href.match('/((?!api|static|.*\\..*|_next).*)')) {
  //   return NextResponse.next()
  // }

  return i18nRouter(request, i18nConfig)
}

export default i18nMiddleware
