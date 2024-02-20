import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebug } from '../useDebug'
import { useQuestionInQueryParams } from '../useQuestionInQueryParams'
import { useEndPage } from './useEndPage'

export function useSimulateurGuard() {
  const router = useRouter()

  const { goToEndPage } = useEndPage()

  const { tutorials, getCurrentSimulation } = useUser()
  const currentSimulation = getCurrentSimulation()

  const isDebug = useDebug()

  const { questionInQueryParams } = useQuestionInQueryParams()

  const [isGuardInit, setIsGuardInit] = useState(false)
  const [isGuardRedirecting, setIsGuardRedirecting] = useState(false)

  useEffect(() => {
    // we only run the guard at mount
    if (isGuardInit) return
    setIsGuardInit(true)

    // it should not happen because a new simulation is set in Providers.tsx
    if (!currentSimulation) {
      router.push('/404') // TODO: should throw an error
      setIsGuardRedirecting(true)
      return
    }

    // if we are in debug mode we do nothing
    if (isDebug) {
      return
    }

    // if the user has completed the test, we redirect him to the results page
    if (currentSimulation.progression === 1 && !questionInQueryParams) {
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
    currentSimulation,
    goToEndPage,
    isDebug,
    questionInQueryParams,
  ])

  return { isGuardInit, isGuardRedirecting }
}
