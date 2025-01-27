import { NextResponse, type NextRequest } from 'next/server'

function sondagesMiddleware(request: NextRequest) {
  if (request.headers.get('host')?.startsWith('sondages.nosgestesclimat.fr')) {
    const url = request.nextUrl.clone()
    url.pathname = '/organisations'
    return NextResponse.rewrite(url)
  }
  return NextResponse.next()
}

export default sondagesMiddleware
