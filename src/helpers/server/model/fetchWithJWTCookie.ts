'use server'

import { AUTHENTICATION_COOKIE_NAME } from '@/constants/authentication/cookie'
import { cookies } from 'next/headers'
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  TooManyRequestsError,
  UnauthorizedError,
  UnknownError,
} from '../error'

export async function fetchWithJWTCookie<T = unknown>(
  url: string,
  { method = 'GET' }: { method?: 'GET' | 'POST' } = {}
) {
  const cookieStore = await cookies()

  const ngcCookie = cookieStore.get(AUTHENTICATION_COOKIE_NAME)

  if (!ngcCookie) {
    throw new UnauthorizedError()
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
        throw new ForbiddenError()
      case 429:
        throw new TooManyRequestsError()
      case 500:
        throw new InternalServerError()
      default:
        throw new UnknownError(response.status, await response.text())
    }
  }

  if (method === 'POST') {
    return {} as Promise<T>
  }
  return response.json() as Promise<T>
}
