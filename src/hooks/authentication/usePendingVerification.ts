import { reconcileOnAuth } from '@/helpers/user/reconcileOnAuth'
import { useUser } from '@/publicodes-state'
import { captureException } from '@sentry/nextjs'
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
  const {
    user,
    updatePendingVerification,
    updateEmail,
    updateUserId,
    updateSimulations,
    setCurrentSimulationId,
  } = useUser()

  let pendingVerification = user?.pendingVerification

  if (
    pendingVerification &&
    dayjs(pendingVerification.expirationDate).isBefore(dayjs())
  ) {
    pendingVerification = undefined
  }

  const handleVerificationCompleted = useCallback(
    async (serverUserId: string) => {
      if (!pendingVerification) {
        return
      }

      try {
        updateEmail(pendingVerification?.email)
        updateUserId(serverUserId)

        await reconcileOnAuth({
          serverUserId,
          updateSimulations,
          setCurrentSimulationId,
        })

        updatePendingVerification(undefined)

        onComplete?.(pendingVerification?.email)
      } catch (error) {
        captureException(error)
      }
    },
    [
      onComplete,
      pendingVerification,
      setCurrentSimulationId,
      updateEmail,
      updatePendingVerification,
      updateSimulations,
      updateUserId,
    ]
  )

  return {
    pendingVerification,
    resetVerification: () => updatePendingVerification(undefined),
    registerVerification: (verification: PendingVerification) =>
      updatePendingVerification(verification),
    completeVerification: handleVerificationCompleted,
  } as const
}
