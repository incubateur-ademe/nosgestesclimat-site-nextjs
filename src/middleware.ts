import { middleware as withSplit } from 'next-with-split'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const res = withSplit(request)
  return res
  // return i18nRouter(request, i18nConfig)
}

// only applies this middleware to files in the app directory
export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*|_next).*)',
}
