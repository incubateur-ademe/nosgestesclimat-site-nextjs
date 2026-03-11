import { setAnonSessionCookie } from '@/helpers/server/actions/setAnonSessionCookie'
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
      void setAnonSessionCookie(currentUserId)
    }
  }, [initialUserId, currentUserId])
}
