import { getLinkToTutoriel } from '@/helpers/navigation/simulateurPages'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSetCurrentSimulationFromParams } from '../simulation/useSetCurrentSimulationFromParams'
import { useSimulationIdInQueryParams } from '../simulation/useSimulationIdInQueryParams'
import { useDebug } from '../useDebug'
import { useLocale } from '../useLocale'
import { useQuestionInQueryParams } from '../useQuestionInQueryParams'
import { useEndPage } from './useEndPage'

export function useSimulateurGuard() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const locale = useLocale()

  const { goToEndPage } = useEndPage()

  const { tutorials } = useUser()
  const { progression } = useCurrentSimulation()

  const isDebug = useDebug()

  const { questionInQueryParams } = useQuestionInQueryParams()

  const { isCorrectSimulationSet } = useSetCurrentSimulationFromParams()

  const [isGuardInit, setIsGuardInit] = useState(false)
  const [isGuardRedirecting, setIsGuardRedirecting] = useState(false)

  const { simulationIdInQueryParams } = useSimulationIdInQueryParams()

  // Check if user is coming from profile modification
  const isFromProfile = searchParams.get('fromProfile') === 'true'

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

    // If the user has completed the test, we redirect him to the results page
    // when visiting /simulateur/bilan without search params
    // But not if they're coming from profile modification
    if (progression === 1 && !questionInQueryParams && !isFromProfile) {
      goToEndPage()
      setIsGuardRedirecting(true)
      return
    }

    // if the user has not seen the test intro, we redirect him to the tutorial page
    if (!tutorials.testIntro) {
      router.replace(
        getLinkToTutoriel({ locale, currentSearchParams: searchParams })
      )
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
    locale,
    isFromProfile,
    searchParams,
  ])

  return { isGuardInit, isGuardRedirecting }
}
