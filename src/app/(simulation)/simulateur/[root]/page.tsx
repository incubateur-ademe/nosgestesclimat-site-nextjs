'use client'

import Total from '@/components/total/Total'
import {
  simulateurCloseSommaire,
  simulateurOpenSommaire,
} from '@/constants/tracking/pages/simulateur'
import { useSimulateurGuard } from '@/hooks/navigation/useSimulateurGuard'
import { useTrackSimulateur } from '@/hooks/tracking/useTrackSimulateur'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'
import CategoriesSummary from './_components/CategoriesSummary'
import Simulateur from './_components/Simulateur'

export default function SimulateurPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardInit, isGuardRedirecting } = useSimulateurGuard()

  // We track the progression of the user in the simulation
  useTrackSimulateur()

  const [isQuestionListOpen, setIsQuestionListOpen] = useState(false)
  const toggleQuestionList = () => {
    setIsQuestionListOpen((prevIsQuestionListOpen) => {
      trackEvent(
        prevIsQuestionListOpen
          ? simulateurCloseSommaire
          : simulateurOpenSommaire
      )
      return !prevIsQuestionListOpen
    })
  }

  if (!isGuardInit || isGuardRedirecting) return null

  return (
    <>
      <Total toggleQuestionList={toggleQuestionList} />
      <div className="-mt-10 mb-14 flex flex-col gap-8 lg:mt-0 lg:flex-row lg:gap-24">
        <Simulateur
          toggleQuestionList={toggleQuestionList}
          isQuestionListOpen={isQuestionListOpen}
        />
        <div className="top-4 flex w-full flex-col gap-4 self-start lg:sticky lg:z-50 lg:w-[20rem] short:gap-2">
          <CategoriesSummary />
        </div>
      </div>
    </>
  )
}
