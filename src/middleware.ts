import i18nConfig from '@/i18nConfig'
import { i18nRouter } from 'next-i18n-router'
import { middleware as withSplit } from 'next-with-split'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const resWithSplit = withSplit(request)

  if (resWithSplit) return resWithSplit

  return i18nRouter(request, i18nConfig)
}

// only applies this middleware to files in the app directory
export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*|_next).*)',
}
