import { AUTHENTICATION_URL } from '@/constants/urls/main'

/**
 * The server authentication route for the user account is proxied
 *
 * so that the jwt cookie is associated with the proper domain (site origin) instead of the server domain.
 * This way, we ensure that the cookie will be added to the request to the Next server.
 */
export async function POST(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const url = new URL(AUTHENTICATION_URL + '/login')
  url.search = searchParams.toString()

  const newRequest = new Request(url.toString(), request)
  const response = await fetch(newRequest)

  return response
}
