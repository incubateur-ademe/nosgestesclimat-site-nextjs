'use server'

import { CHECK_USER_EXISTS_URL } from '@/constants/urls/main'
import type { AuthenticatedUser } from '@/types/authentication'
import { captureException } from '@sentry/nextjs'
import { cookies } from 'next/headers'
import { cache } from 'react'

export const getAuthentifiedUser = cache(
  async (): Promise<AuthenticatedUser | undefined> => {
    try {
      const cookieStore = await cookies()
      const ngcjwt = cookieStore.get('ngcjwt')

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
)
