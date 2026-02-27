'use client'

import { syncUserIdCookie } from '@/actions/syncUserIdCookie'
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
      void syncUserIdCookie(user.userId)
    }
  }, [user.userId])

  return null
}
