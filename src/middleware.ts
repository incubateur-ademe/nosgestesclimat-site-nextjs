import i18nMiddleware from '@/middlewares/i18nMiddleware'
import splitTestingMiddleware from '@/middlewares/splitTestingMiddleware'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const middlewares = [i18nMiddleware, splitTestingMiddleware]

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  for await (const middlewareFunction of middlewares) {
    const middlewareResponse = await middlewareFunction(request)
    if (isRedirecting(middlewareResponse)) {
      return middlewareResponse
    }
    if (isRewriting(middlewareResponse)) {
      return middlewareResponse
    }
  }
  return response
}
function isRedirecting(response: NextResponse): boolean {
  return response.status === 307 || response.status === 308
}
function isRewriting(response: NextResponse): boolean {
  return response.headers.has('x-middleware-rewrite')
}
