'use client'

import { useSimulateurGuard } from '@/hooks/navigation/useSimulateurGuard'
import { useTrackSimulateur } from '@/hooks/tracking/useTrackSimulateur'
import Faq from './_components/Faq'
import Simulateur from './_components/Simulateur'

export default function SimulateurPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardInit, isGuardRedirecting } = useSimulateurGuard()

  // We track the progression of the user in the simulation
  useTrackSimulateur()

  if (!isGuardInit || isGuardRedirecting) return null

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Simulateur />

      <Faq />
    </div>
  )
}
