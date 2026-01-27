'use server'

import { AUTHENTICATION_COOKIE_NAME } from '@/constants/authentication/cookie'
import { cookies } from 'next/headers'
import {
  InternalServerError,
  NotFoundError,
  TooManyRequestsError,
  UnauthorizedError,
  UnknownError,
} from '../error'

export const handleResponseError = async (response: Response) => {
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
export async function fetchWithJWTCookie<T = unknown>(
  url: string,
  {
    method = 'GET',
    body,
  }: {
    method?: 'GET' | 'POST' | 'PUT'
    setCookies?: boolean
    body?: string
  } = {}
): Promise<T> {
  const cookieStore = await cookies()

  const ngcCookie = cookieStore.get(AUTHENTICATION_COOKIE_NAME)

  if (!ngcCookie) {
    throw new UnauthorizedError()
  }

  const response = await fetch(url, {
    method,
    body,
    headers: {
      cookie: `${ngcCookie.name}=${ngcCookie.value}`,
    },
    credentials: 'include',
  })

  if (!response.ok) {
    await handleResponseError(response)
  }

  if (method === 'POST') {
    return {} as T
  }
  return response.json()
}

export async function fetchWithoutJWTCookie<T = unknown>(
  url: string,
  {
    method = 'GET',
    body,
  }: { method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; body?: string } = {}
): Promise<T> {
  const response = await fetch(url, {
    method,
    body,
  })

  if (!response.ok) {
    await handleResponseError(response)
  }

  return response.json()
}
