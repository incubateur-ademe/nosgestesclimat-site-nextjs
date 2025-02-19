import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
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

  const [isGuardInit, setIsGuardInit] = useState(false)
  const [isGuardRedirecting, setIsGuardRedirecting] = useState(false)

  const { simulationIdInQueryParams } = useSimulationIdInQueryParams()

  const prevSimulationIdInQueryParams = useRef(simulationIdInQueryParams)

  useEffect(() => {
    // we only run the guard at mount
    if (isGuardInit) return
    setIsGuardInit(true)

    // if we are in debug mode we do nothing
    if (isDebug) {
      return
    }

    // If the simulationIdInQueryParams is set, it means that the simulation is not loaded yet
    if (simulationIdInQueryParams) {
      return
    }

    // if the user has completed the test, we redirect him to the results page
    if (progression === 1 && !questionInQueryParams) {
      goToEndPage()
      setIsGuardRedirecting(true)
      return
    }

    // if the user has not seen the test intro, we redirect him to the tutorial page
    if (!tutorials.testIntro) {
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
  ])

  // After fetching the simulation, we redirect the user to the end page if he has completed the test
  useEffect(() => {
    if (prevSimulationIdInQueryParams.current === simulationIdInQueryParams) {
      return
    }

    if (progression === 1 && !questionInQueryParams) {
      goToEndPage()
      setIsGuardRedirecting(true)
      return
    }
  }, [
    prevSimulationIdInQueryParams,
    simulationIdInQueryParams,
    progression,
    questionInQueryParams,
    goToEndPage,
  ])

  return { isGuardInit, isGuardRedirecting }
}
