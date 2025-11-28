'use server'
import { cookies } from 'next/headers'
import {
  InternalServerError,
  NotFoundError,
  TooManyRequestsError,
  UnauthorizedError,
  UnknownError,
} from '../error'

export async function fetchWithJWTCookie(url: string) {
  const ngcCookie = (await cookies()).get('ngcjwt')
  if (!ngcCookie) {
    throw new UnauthorizedError()
  }

  const response = await fetch(url, {
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

  return response.json()
}
