'use client'

import TopBar from '@/components/simulation/TopBar'
import {
  simulateurCloseSommaire,
  simulateurOpenSommaire,
} from '@/constants/tracking/pages/simulateur'
import { useSimulateurGuard } from '@/hooks/navigation/useSimulateurGuard'
import { useTrackSimulateur } from '@/hooks/tracking/useTrackSimulateur'
import { useIframe } from '@/hooks/useIframe'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import SaveModal from './_components/SaveModal'
import Simulateur from './_components/Simulateur'

export default function SimulateurPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardInit, isGuardRedirecting } = useSimulateurGuard()

  const { isIframe } = useIframe()

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

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
  const toggleSaveModal = useCallback(() => {
    setIsSaveModalOpen((prevIsSaveModalOpen) => !prevIsSaveModalOpen)
  }, [])

  const [isBackHomeModalOpen, setIsBackHomeModalOpen] = useState(false)
  const toggleBackHomeModal = useCallback(() => {
    setIsBackHomeModalOpen((isBackHomeModalOpen) => !isBackHomeModalOpen)
  }, [])

  return (
    <div
      className={twMerge(
        'flex h-screen flex-1 flex-col overflow-scroll',
        isIframe && 'h-auto md:h-screen'
      )}>
      <TopBar
        toggleQuestionList={toggleQuestionList}
        toggleBackHomeModal={toggleBackHomeModal}
        toggleSaveModal={toggleSaveModal}
      />

      <Simulateur
        toggleQuestionList={toggleQuestionList}
        isQuestionListOpen={isQuestionListOpen}
        isLoading={!isGuardInit || isGuardRedirecting}
      />

      <SaveModal
        isOpen={isSaveModalOpen || isBackHomeModalOpen}
        closeModal={isSaveModalOpen ? toggleSaveModal : toggleBackHomeModal}
        mode={isSaveModalOpen ? 'save' : 'backHome'}
      />
    </div>
  )
}
