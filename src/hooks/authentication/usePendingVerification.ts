import {
  loadServerSimulation,
  syncLocalSimulation,
} from '@/helpers/user/reconcileOnAuth'
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
    simulations,
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
    async (userId: string) => {
      if (!pendingVerification) {
        return
      }

      try {
        if (userId === user.userId) {
          // We only sync if localuserId is the same as distant userId
          await syncLocalSimulation({
            simulations,
            userId,
          })
        }

        await loadServerSimulation({
          userId,
          updateSimulations,
          setCurrentSimulationId,
        })

        updateEmail(pendingVerification?.email)
        updateUserId(userId)
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
      simulations,
      updateEmail,
      updatePendingVerification,
      updateSimulations,
      updateUserId,
      user.userId,
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
