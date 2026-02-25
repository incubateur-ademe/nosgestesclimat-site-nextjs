'use client'

import { USER_ID_COOKIE_NAME } from '@/constants/authentication/cookie'
import { useUser } from '@/publicodes-state'
import { useEffect } from 'react'

/**
 * This component is responsible for syncing the user ID from the client-side state
 * (localStorage) to a cookie, so it can be accessed by Server Components.
 */
export default function CookieUserSync() {
  const { user } = useUser()

  useEffect(() => {
    if (user.userId) {
      // Set the cookie with a long expiration (1 year)
      // Path=/ ensures it's available across the whole site
      // SameSite=Lax is a sensible default for this kind of tracking
      document.cookie = `${USER_ID_COOKIE_NAME}=${user.userId}; path=/; max-age=31536000; SameSite=Lax`
    }
  }, [user.userId])

  return null
}
