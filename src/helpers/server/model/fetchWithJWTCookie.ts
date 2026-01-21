'use server'
import { cookies } from 'next/headers'
import {
  InternalServerError,
  NotFoundError,
  TooManyRequestsError,
  UnauthorizedError,
  UnknownError,
} from '../error'

export async function fetchWithJWTCookie(
  url: string,
  { method = 'GET' }: { method?: 'GET' | 'POST'; setCookies?: boolean } = {}
) {
  const cookieStore = await cookies()
  const ngcCookie = cookieStore.get('ngcjwt')

  if (!ngcCookie) {
    return null
  }

  const response = await fetch(url, {
    method,
    headers: {
      cookie: `${ngcCookie.name}=${ngcCookie.value}`,
    },
    credentials: 'include',
  })

  if (!response.ok) {
    switch (response.status) {
      case 404:
        throw new NotFoundError()
      case 401:
        throw new UnauthorizedError()
      case 403:
        throw new UnauthorizedError()
      case 429:
        throw new TooManyRequestsError()
      case 500:
        throw new InternalServerError()
      default:
        throw new UnknownError(response.status, await response.text())
    }
  }

  if (method === 'POST') {
    return {}
  }
  return response.json()
}
