import { reconcileOnAuth } from '@/helpers/user/reconcileOnAuth'
import { useUser } from '@/publicodes-state'
import dayjs from 'dayjs'
import { useCallback } from 'react'

export interface PendingVerification {
  expirationDate: Date
  email: string
}

export function usePendingVerification({
  onComplete,
}: {
  onComplete?: (email?: string) => void
}) {
  const { user, updatePendingVerification, updateEmail } = useUser()
  let pendingVerification = user?.pendingVerification

  if (
    pendingVerification &&
    dayjs(pendingVerification.expirationDate).isBefore(dayjs())
  ) {
    pendingVerification = undefined
  }

  const handleVerificationCompleted = useCallback(async () => {
    if (!pendingVerification) {
      return
    }
    updateEmail(pendingVerification?.email)
    await reconcileOnAuth({
      serverUserId: user.userId,
    })
    updatePendingVerification(undefined)
    onComplete?.(pendingVerification?.email)
  }, [
    user.userId,
    updatePendingVerification,
    pendingVerification,
    updateEmail,
    onComplete,
  ])

  return {
    pendingVerification,
    resetVerification: () => updatePendingVerification(undefined),
    registerVerification: (verification: PendingVerification) =>
      updatePendingVerification(verification),
    completeVerification: handleVerificationCompleted,
  } as const
}
