import { overrideServerUserId } from '@/actions/overrideServerUserId'
import { useEffect } from 'react'

export function useHandleSyncUserIdCookie(userId: string) {
  useEffect(() => {
    if (userId) {
      void overrideServerUserId(userId)
    }
  }, [userId])
}
