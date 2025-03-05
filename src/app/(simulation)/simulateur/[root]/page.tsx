'use client'

import Total from '@/components/total/Total'
import {
  simulateurCloseSommaire,
  simulateurOpenSommaire,
} from '@/constants/tracking/pages/simulateur'
import { useSimulateurGuard } from '@/hooks/navigation/useSimulateurGuard'
import { useTrackSimulateur } from '@/hooks/tracking/useTrackSimulateur'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useCallback, useState } from 'react'
import Simulateur from './_components/Simulateur'

export default function SimulateurPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardInit, isGuardRedirecting } = useSimulateurGuard()

  // We track the progression of the user in the simulation
  useTrackSimulateur()

  const [isQuestionListOpen, setIsQuestionListOpen] = useState(false)
  const toggleQuestionList = useCallback(() => {
    setIsQuestionListOpen((prevIsQuestionListOpen) => {
      trackEvent(
        prevIsQuestionListOpen
          ? simulateurCloseSommaire
          : simulateurOpenSommaire
      )
      return !prevIsQuestionListOpen
    })
  }, [])

  return (
    <div className="flex h-screen flex-1 flex-col overflow-scroll">
      <Total
        toggleQuestionList={toggleQuestionList}
      />

      <Simulateur
        toggleQuestionList={toggleQuestionList}
        isQuestionListOpen={isQuestionListOpen}
        isLoading={!isGuardInit || isGuardRedirecting}
      />
    </div>
  )
}
