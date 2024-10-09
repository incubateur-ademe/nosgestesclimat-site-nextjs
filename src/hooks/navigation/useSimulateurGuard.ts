import { LoadSimulationContext } from '@/app/_components/mainLayoutProviders/LoadSimulationContext'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
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

  const isCorrectSimulationSet = useContext(LoadSimulationContext)

  useEffect(() => {
    // we only run the guard at mount
    if (isGuardInit) return
    setIsGuardInit(true)

    // if we are in debug mode we do nothing
    if (isDebug) {
      return
    }

    // We wait for the simulation to be set
    if (!isCorrectSimulationSet) {
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
    isCorrectSimulationSet,
  ])

  return { isGuardInit, isGuardRedirecting }
}
