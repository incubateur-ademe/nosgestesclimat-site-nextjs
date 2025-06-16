import { useABTesting } from '@/components/providers/ABTestingProvider'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSetCurrentSimulationFromParams } from '../simulation/useSetCurrentSimulationFromParams'
import { useSimulationIdInQueryParams } from '../simulation/useSimulationIdInQueryParams'
import { useDebug } from '../useDebug'
import { useQuestionInQueryParams } from '../useQuestionInQueryParams'
import { useEndPage } from './useEndPage'
export function useSimulateurGuard() {
  const router = useRouter()

  const { goToEndPage } = useEndPage()

  const { tutorials } = useUser()
  const { progression } = useCurrentSimulation()

  const isDebug = useDebug()

  const { questionInQueryParams } = useQuestionInQueryParams()

  const { isCorrectSimulationSet } = useSetCurrentSimulationFromParams()

  const [isGuardInit, setIsGuardInit] = useState(false)
  const [isGuardRedirecting, setIsGuardRedirecting] = useState(false)

  const { abTests } = useABTesting()

  const { simulationIdInQueryParams } = useSimulationIdInQueryParams()

  useEffect(() => {
    // we only run the guard at mount
    if (isGuardInit) return

    // if we are in debug mode we do nothing
    if (isDebug) {
      return
    }

    // If the simulationIdInQueryParams is set, it means that the simulation is not loaded yet
    if (simulationIdInQueryParams && !isCorrectSimulationSet) {
      return
    }

    // Setting the guard init to true after the simulation is loaded
    setIsGuardInit(true)

    // if the user has completed the test, we redirect him to the results page
    if (progression === 1 && !questionInQueryParams) {
      goToEndPage()
      setIsGuardRedirecting(true)
      return
    }

    // if the user has not seen the test intro, we redirect him to the tutorial page
    if (!tutorials.testIntro && !abTests['hide-tutorial']) {
      router.replace('/tutoriel')
      setIsGuardRedirecting(true)
    }
  }, [
    isGuardInit,
    tutorials,
    router,
    progression,
    goToEndPage,
    isDebug,
    questionInQueryParams,
    simulationIdInQueryParams,
    isCorrectSimulationSet,
  ])

  return { isGuardInit, isGuardRedirecting }
}
