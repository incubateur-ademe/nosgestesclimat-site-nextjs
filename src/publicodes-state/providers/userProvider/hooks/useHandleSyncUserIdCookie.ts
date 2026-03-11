import { overrideServerUserId } from '@/helpers/server/dal/overrideServerUserId'
import { useEffect } from 'react'

export function useHandleSyncUserIdCookie({
  initialUserId,
  currentUserId,
}: {
  initialUserId: string | undefined
  currentUserId: string
}) {
  useEffect(() => {
    if (initialUserId && initialUserId !== currentUserId) {
      void overrideServerUserId(currentUserId)
    }
  }, [initialUserId, currentUserId])
}
