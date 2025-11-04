'use server'

import { CHECK_USER_EXISTS_URL } from '@/constants/urls/main'
import type { AuthenticatedUser } from '@/types/authentication'
import { captureException } from '@sentry/nextjs'
import { cookies } from 'next/headers'

export async function getIsUserAuthenticated(): Promise<
  AuthenticatedUser | undefined
> {
  try {
    const cookieStore = cookies()
    const ngcjwt = (await cookieStore).get('ngcjwt')

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (ngcjwt) {
      headers['Cookie'] = `ngcjwt=${ngcjwt.value}`
    }

    const response = await fetch(CHECK_USER_EXISTS_URL, {
      method: 'GET',
      headers,
    })

    if (response.ok) {
      const data = await response.json()

      return data
    }

    return undefined
  } catch (error) {
    captureException(error)
    return undefined
  }
}
