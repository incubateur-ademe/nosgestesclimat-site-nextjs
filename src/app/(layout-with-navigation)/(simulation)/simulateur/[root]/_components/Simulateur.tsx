'use client'

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
import { useEffect, useState } from 'react'
import Charts from './simulateur/Charts'
import Form from './simulateur/Form'
import Summary from './simulateur/Summary'

export default function Simulateur() {
  const [isInit, setIsInit] = useState(false)

  const router = useRouter()

  const isDebug = useDebug()

  const { tutorials } = useUser()

  const { currentQuestion, categories } = useForm()

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
    const detailsParamString = formatResultToDetailParam({
      categories,
      getValue,
    })

    if (!currentQuestion && !isDebug) {
      router.replace(
        `/fin${detailsParamString ? `?${detailsParamString}` : ''}`
      )
    }
  }, [currentQuestion, router, isDebug, categories, getValue])

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
