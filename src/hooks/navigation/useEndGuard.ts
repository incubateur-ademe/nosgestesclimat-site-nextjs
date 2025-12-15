import { getSearchParamsClientSide } from '@/helpers/getSearchParamsClientSide'
import {
  getLinkToSimulateur,
  getLinkToTutoriel,
} from '@/helpers/navigation/simulateurPages'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSetCurrentSimulationFromParams } from '../simulation/useSetCurrentSimulationFromParams'
import { useSimulationIdInQueryParams } from '../simulation/useSimulationIdInQueryParams'
import { useLocale } from '../useLocale'

export function useEndGuard() {
  const router = useRouter()
  const searchParams = getSearchParamsClientSide()

  const locale = useLocale()

  const { tutorials } = useUser()
  const { progression } = useCurrentSimulation()

  const { isCorrectSimulationSet } = useSetCurrentSimulationFromParams()

  const { simulationIdInQueryParams } = useSimulationIdInQueryParams()

  const [isGuardInit, setIsGuardInit] = useState(false)
  const [isGuardRedirecting, setIsGuardRedirecting] = useState(false)

  useEffect(() => {
    // we only run the guard at mount
    if (isGuardInit) return
    setIsGuardInit(true)

    // if there is a simulation id in the query params we do nothing
    if (simulationIdInQueryParams && !isCorrectSimulationSet) {
      return
    }

    // if the simulation is finished we do nothing
    if (progression === 1) {
      return
    }

    // if the user didn't see the tutoriel we redirect him to the tutorial page
    if (!tutorials.testIntro) {
      router.replace(getLinkToTutoriel({ locale, searchParams }))
      setIsGuardRedirecting(true)
      return
    }

    // we redirect the user to the test page
    router.replace(getLinkToSimulateur({ searchParams }))
    setIsGuardRedirecting(true)
  }, [
    isGuardInit,
    simulationIdInQueryParams,
    isCorrectSimulationSet,
    progression,
    router,
    tutorials,
    locale,
    searchParams,
  ])

  return { isGuardInit, isGuardRedirecting }
}
