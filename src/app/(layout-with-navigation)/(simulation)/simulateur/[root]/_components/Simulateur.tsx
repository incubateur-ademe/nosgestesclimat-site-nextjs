'use client'

import Total from '@/components/total/Total'
import {
  matomoEventCloseQuestionsList,
  matomoEventOpenQuestionsList,
} from '@/constants/matomo'
import { useSimulateurGuard } from '@/hooks/navigation/useSimulateurGuard'
import { useDebug } from '@/hooks/useDebug'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'
import Charts from './simulateur/Charts'
import Form from './simulateur/Form'
import Summary from './simulateur/Summary'

export default function Simulateur() {
  // Guarding the route and redirecting if necessary
  const { isInit } = useSimulateurGuard()

  const isDebug = useDebug()

  const [isQuestionListOpen, setIsQuestionListOpen] = useState(false)
  const toggleQuestionList = () => {
    setIsQuestionListOpen((prevIsQuestionListOpen) => {
      trackEvent(
        prevIsQuestionListOpen
          ? matomoEventCloseQuestionsList
          : matomoEventOpenQuestionsList
      )
      return !prevIsQuestionListOpen
    })
  }

  if (!isInit) return null

  return (
    <>
      <Total toggleQuestionList={toggleQuestionList} />
      <div className={isQuestionListOpen && !isDebug ? 'hidden' : 'block'}>
        <Form />
        <Charts />
      </div>
      <Summary
        toggleQuestionList={toggleQuestionList}
        isQuestionListOpen={isQuestionListOpen}
      />
    </>
  )
}
