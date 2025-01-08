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
import SaveModal from './_components/SaveModal'
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

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
  const toggleSaveModal = useCallback(() => {
    setIsSaveModalOpen((prevIsSaveModalOpen) => !prevIsSaveModalOpen)
  }, [])

  const [isBackHomeModalOpen, setIsBackHomeModalOpen] = useState(false)
  const toggleBackHomeModal = useCallback(() => {
    setIsBackHomeModalOpen((isBackHomeModalOpen) => !isBackHomeModalOpen)
  }, [])

  return (
    <div className="flex h-screen flex-1 flex-col overflow-scroll">
      <Total
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
        isOpen={isSaveModalOpen}
        closeModal={toggleSaveModal}
        mode="save"
      />
      <SaveModal
        isOpen={isBackHomeModalOpen}
        closeModal={toggleBackHomeModal}
        mode="backHome"
      />
    </div>
  )
}
