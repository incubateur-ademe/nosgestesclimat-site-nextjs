import { AUTHENTICATION_URL } from '@/constants/urls/main'

/**
 * The server authentication route for the user account is proxied
 *
 * This way, the jwt cookie is associated with the proper domain (site origin) instead of the server domain.
 * This ensure that the cookie will be added to requests to the Next server.
 */
export async function POST(request: Request) {
  console.log('request', request)
  const searchParams = new URL(request.url).searchParams
  const url = new URL(AUTHENTICATION_URL + '/login')
  url.search = searchParams.toString()

  const newRequest = new Request(url.toString(), request)
  const response = await fetch(newRequest)
  console.log('response', response)

  return response
}
