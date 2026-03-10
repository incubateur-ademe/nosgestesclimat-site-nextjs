import { overrideServerUserId } from '@/actions/overrideServerUserId'
import { useEffect } from 'react'

export function useHandleSyncUserIdCookie({
  initialUserId,
  currentUserId,
}: {
  initialUserId: string
  currentUserId: string
}) {
  useEffect(() => {
    if (initialUserId !== currentUserId) {
      void overrideServerUserId(currentUserId)
    }
  }, [initialUserId, currentUserId])
}
