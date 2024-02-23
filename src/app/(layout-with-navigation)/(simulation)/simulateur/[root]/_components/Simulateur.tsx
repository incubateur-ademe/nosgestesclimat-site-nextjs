'use client'

import { PreventNavigationContext } from '@/app/_components/mainLayoutProviders/PreventNavigationProvider'
import Total from '@/components/total/Total'
import {
  matomoEventCloseQuestionsList,
  matomoEventOpenQuestionsList,
} from '@/constants/matomo'
import { formatResultToDetailParam } from '@/helpers/url/formatResultToDetailParam'
import { useDebug } from '@/hooks/useDebug'
import { useEngine, useForm, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import Charts from './simulateur/Charts'
import Form from './simulateur/Form'
import Summary from './simulateur/Summary'

export default function Simulateur() {
  const [isInit, setIsInit] = useState(false)

  const urlParams = new URLSearchParams(window.location.search)
  const questionFromUrl = urlParams.get('question')

  const router = useRouter()

  const isDebug = useDebug()

  const { tutorials } = useUser()

  const { categories, progression } = useForm()

  const { getValue } = useEngine()

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

  useEffect(() => {
    if (!tutorials.testIntro && !isDebug) {
      router.replace('/tutoriel')
    } else {
      setIsInit(true)
    }
  }, [tutorials, router, isDebug])

  // Redirect to results page if test is completed
  useEffect(() => {
    if (progression === 1 && !isDebug && !questionFromUrl) {
      const detailsParamString = formatResultToDetailParam({
        categories,
        getValue,
      })

      router.replace(
        `/fin${detailsParamString ? `?${detailsParamString}` : ''}`
      )
    }
  }, [progression, router, isDebug, categories, getValue, questionFromUrl])

  const { handleUpdateShouldPreventNavigation } = useContext(
    PreventNavigationContext
  )

  useEffect(() => {
    handleUpdateShouldPreventNavigation(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
