'use client'

import TotalSticky from '@/components/total/TotalSticky'
import {
  simulateurCloseSommaire,
  simulateurOpenSommaire,
} from '@/constants/tracking/pages/simulateur'
import { useSimulateurGuard } from '@/hooks/navigation/useSimulateurGuard'
import { useTrackSimulateur } from '@/hooks/tracking/useTrackSimulateur'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'
import TotalStickyMobile from '../../fin/_components/TotalStickyMobile'
import SaveViaEmail from './_components/SaveViaEmail'
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
      <div className="-mt-10 mb-14 flex flex-col gap-8 lg:mt-0 lg:flex-row lg:gap-16">
        <TotalStickyMobile
          buttons={['save', 'summary']}
          toggleQuestionList={toggleQuestionList}
        />
        <Simulateur
          toggleQuestionList={toggleQuestionList}
          isQuestionListOpen={isQuestionListOpen}
        />
        <div className="short:gap-2 top-4 flex w-full flex-col gap-4 self-start lg:sticky lg:z-50 lg:w-[22rem]">
          <TotalSticky
            buttons={['save', 'summary']}
            toggleQuestionList={toggleQuestionList}
          />
        </div>
      </div>
      <SaveViaEmail />
    </>
  )
}
