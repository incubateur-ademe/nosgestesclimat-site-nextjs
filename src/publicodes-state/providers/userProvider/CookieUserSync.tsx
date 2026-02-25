'use client'

import { USER_ID_COOKIE_NAME } from '@/constants/authentication/cookie'
import { useUser } from '@/publicodes-state'
import { useEffect } from 'react'

function getCookie(name: string): string | undefined {
  const match = new RegExp(`(?:^|; )${name}=([^;]*)`).exec(document.cookie)
  return match?.[1]
}

/**
 * Syncs the server-generated userId cookie with the client-side localStorage.
 * The cookie (set by middleware) is the source of truth for the userId.
 */
export default function CookieUserSync() {
  const { user, updateUserId } = useUser()

  useEffect(() => {
    const cookieUserId = getCookie(USER_ID_COOKIE_NAME)

    // If the cookie has a userId and it differs from localStorage, sync it
    if (cookieUserId && cookieUserId !== user.userId) {
      updateUserId(cookieUserId)
    }
  }, [user.userId, updateUserId])

  return null
}
