'use client'

import { useUser } from '@/publicodes-state'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

// Allows passing the userId in query params as a fallback for the server
// in case the user directly accesses the resultats page without letting the
// userId cookie be set
export default function SimulationResolverFallback({
  locale,
}: {
  locale: string
}) {
  const { currentSimulationId, isInitialized, user } = useUser()

  useEffect(() => {
    if (!isInitialized) return

    if (currentSimulationId) {
      // Redirect to the resultats page with the userId in query params as a fallback
      // using router.replace or .push doesn't work
      redirect(
        `/${locale}/simulation/${currentSimulationId}/resultats?userId=${user.userId}`
      )
    }
  }, [isInitialized, currentSimulationId, locale, user.userId])

  return null
}
