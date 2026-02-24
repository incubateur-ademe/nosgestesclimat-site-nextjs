'use client'

import { SIMULATOR_PATH } from '@/constants/urls/paths'
import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useLayoutEffect } from 'react'

export default function SimulationResolverFallback({
  locale,
}: {
  locale: string
}) {
  const router = useRouter()
  const { simulations, currentSimulationId, isInitialized, user } = useUser()

  useLayoutEffect(() => {
    if (!isInitialized) return

    // Try to find the current simulation ID
    let targetId = currentSimulationId

    // If not set, take the most recent one from the list
    if (!targetId && simulations.length > 0) {
      // Simulations in the store are usually ordered by date or the last created is at the end?
      // Actually, useUser's simulations are just the array from localStorage.
      targetId = simulations[simulations.length - 1].id
    }

    if (targetId) {
      // Redirect to the resultats page with the userId in query params as a fallback for the server
      router.replace(
        `/${locale}/simulation/${targetId}/resultats?userId=${user.userId}`
      )
    } else {
      // If no simulation found at all, go back to the start
      router.replace(`/${locale}${SIMULATOR_PATH}`)
    }
  }, [
    isInitialized,
    simulations,
    currentSimulationId,
    locale,
    router,
    user.userId,
  ])

  return null
}
