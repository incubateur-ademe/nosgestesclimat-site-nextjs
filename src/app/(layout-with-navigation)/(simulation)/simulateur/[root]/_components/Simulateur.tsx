'use client'

import { PreventNavigationContext } from '@/app/_components/mainLayoutProviders/PreventNavigationProvider'
import Total from '@/components/total/Total'
import {
  matomoEventCloseQuestionsList,
  matomoEventOpenQuestionsList,
} from '@/constants/matomo'
import { useDebug } from '@/hooks/useDebug'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useContext, useEffect, useState } from 'react'
import Charts from './simulateur/Charts'
import Form from './simulateur/Form'
import Summary from './simulateur/Summary'

export default function Simulateur() {
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

  const { handleUpdateShouldPreventNavigation } = useContext(
    PreventNavigationContext
  )

  useEffect(() => {
    handleUpdateShouldPreventNavigation(true)
  }, [])

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
