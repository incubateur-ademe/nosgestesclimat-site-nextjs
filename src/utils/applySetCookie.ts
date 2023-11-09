import {
  RequestCookies,
  ResponseCookies,
} from 'next/dist/server/web/spec-extension/cookies'
import { NextResponse, type NextRequest } from 'next/server'

function applySetCookie(req: NextRequest, res: NextResponse): void {
  const setCookies = new ResponseCookies(res.headers)
  const newReqHeaders = new Headers(req.headers)
  const newReqCookies = new RequestCookies(newReqHeaders)

  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie))

  return NextResponse.next({
    request: { headers: newReqHeaders },
  }).headers.forEach((value, key) => {
    if (
      key === 'x-middleware-override-headers' ||
      key.startsWith('x-middleware-request-')
    ) {
      res.headers.set(key, value)
    }
  })
}

export default applySetCookie
