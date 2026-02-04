'use server'

import { AUTHENTICATION_COOKIE_NAME } from '@/constants/authentication/cookie'
import { SERVER_URL } from '@/constants/urls/main'
import { cookies } from 'next/headers'
import {
  ForbiddenError,
  InternalServerError,
  InvalidInputError,
  NotFoundError,
  TooManyRequestsError,
  UnauthorizedError,
  UnknownError,
} from '../error'

export async function fetchServer<T = unknown>(
  url: string,
  {
    method = 'GET',
    body,
    auth = true,
  }: {
    method?: 'GET' | 'POST' | 'PUT'
    auth?: boolean
    body?: Record<string, unknown>
  } = {}
): Promise<T> {
  if (!url.startsWith(SERVER_URL)) {
    throw new InternalServerError()
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (auth) {
    const cookieStore = await cookies()
    const ngcCookie = cookieStore.get(AUTHENTICATION_COOKIE_NAME)
    if (!ngcCookie) {
      throw new UnauthorizedError()
    }
    headers.cookie = `${ngcCookie.name}=${ngcCookie.value}`
  }

  const response = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers,
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
      case 400:
        const error = (await response.json()) as unknown
        throw new InvalidInputError(error)
      case 500:
        throw new InternalServerError()
      default:
        throw new UnknownError(response.status, await response.text())
    }
  }

  return response.json() as T
}
