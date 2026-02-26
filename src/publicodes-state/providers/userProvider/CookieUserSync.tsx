'use client'

import { USER_ID_COOKIE_NAME } from '@/constants/authentication/cookie'
import { useUser } from '@/publicodes-state'
import { useEffect } from 'react'

/**
 * Syncs the client-side userId (localStorage) to the cookie,
 * so it can be read by Server Components and the middleware.
 */
export default function CookieUserSync() {
  const { user } = useUser()

  useEffect(() => {
    if (user.userId) {
      document.cookie = `${USER_ID_COOKIE_NAME}=${user.userId}; path=/; max-age=31536000; SameSite=Lax`
    }
  }, [user.userId])

  return null
}
