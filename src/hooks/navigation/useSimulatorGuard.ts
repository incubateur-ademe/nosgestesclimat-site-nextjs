import { getLinkToTutoriel } from '@/helpers/navigation/simulateurPages'
import { useCurrentSimulation, useEngine, useUser } from '@/publicodes-state'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useSimulationIdInQueryParams } from '../simulation/useSimulationIdInQueryParams'
import { useLocale } from '../useLocale'
import { useEndPage } from './useEndPage'

export function useSimulatorGuard() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const locale = useLocale()

  const { tutorials } = useUser()
  const { isInitialized } = useEngine()
  const { progression } = useCurrentSimulation()
  const { linkToEndPage } = useEndPage()
  const { simulationIdInQueryParams } = useSimulationIdInQueryParams()

  const isFinished = progression === 1
  useEffect(() => {
    if (simulationIdInQueryParams || isFinished || tutorials.testIntro) {
      return
    }
    router.replace(getLinkToTutoriel({ locale, searchParams }))
  }, [isInitialized])

  useEffect(() => {
    if (isFinished) {
      router.replace(linkToEndPage)
    }
  }, [isInitialized])
}
