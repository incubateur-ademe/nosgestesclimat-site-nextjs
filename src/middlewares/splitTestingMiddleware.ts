import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

function splitTestingMiddleware(request: NextRequest) {
  const rewriteTo = `https://nosgestesclimat.fr${request.nextUrl.href.replace(
    request.nextUrl.origin,
    ''
  )}`
  const isExternal = rewriteTo.startsWith('http')
  if (isExternal) return NextResponse.rewrite(rewriteTo)

  return NextResponse.next()
}

export default splitTestingMiddleware
