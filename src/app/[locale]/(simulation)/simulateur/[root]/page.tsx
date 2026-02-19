'use client'

import TopBar from '@/components/simulation/TopBar'
import { useSimulateurGuard } from '@/hooks/navigation/useSimulateurGuard'
import { useTrackSimulator } from '@/hooks/tracking/useTrackSimulator'
import { useIframe } from '@/hooks/useIframe'
import { useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Simulateur from './_components/Simulateur'

export default function SimulateurPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardInit, isGuardRedirecting } = useSimulateurGuard()

  const { isIframe } = useIframe()

  // We track the progression of the user in the simulation
  useTrackSimulator()

  const [isQuestionListOpen, setIsQuestionListOpen] = useState(false)
  const toggleQuestionList = useCallback(() => {
    setIsQuestionListOpen((prevIsQuestionListOpen) => {
      return !prevIsQuestionListOpen
    })
  }, [])

  return (
    <div
      className={twMerge(
        'flex h-screen flex-1 flex-col overflow-scroll',
        isIframe && 'h-auto md:h-screen'
      )}>
      <TopBar toggleQuestionList={toggleQuestionList} />

      <Simulateur
        toggleQuestionList={toggleQuestionList}
        isQuestionListOpen={isQuestionListOpen}
        isLoading={!isGuardInit || isGuardRedirecting}
      />
    </div>
  )
}
