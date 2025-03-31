import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSimulationIdInQueryParams } from '../simulation/useSimulationIdInQueryParams'

export function useEndGuard() {
  const router = useRouter()

  const { tutorials } = useUser()
  const { progression } = useCurrentSimulation()

  const { simulationIdInQueryParams } = useSimulationIdInQueryParams()

  const [isGuardInit, setIsGuardInit] = useState(false)
  const [isGuardRedirecting, setIsGuardRedirecting] = useState(false)

  useEffect(() => {
    // we only run the guard at mount
    if (isGuardInit) return
    setIsGuardInit(true)

    // if there is a simulation id in the query params we do nothing
    if (simulationIdInQueryParams) {
      return
    }

    // if the simulation is finished we do nothing
    if (progression === 1) {
      return
    }

    // if the user didn't see the tutoriel we redirect him to the tutorial page
    if (!tutorials.testIntro) {
      router.replace('/tutoriel')
      setIsGuardRedirecting(true)
      return
    }

    // we redirect the user to the test page
    router.replace(getLinkToSimulateur())
    setIsGuardRedirecting(true)
  }, [isGuardInit, simulationIdInQueryParams, progression, router, tutorials])

  return { isGuardInit, isGuardRedirecting }
}
