'use client'

import {
  getMatomoEventParcoursTestCategoryStarted,
  matomoEvent50PercentProgress,
  matomoEvent90PercentProgress,
  matomoEventFirstAnswer,
} from '@/constants/matomo'
import { useForm } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect, useRef } from 'react'

// TODO: It should be a hook instead of a component
export default function Tracking() {
  const { progression, isFirstQuestionOfCategory, currentCategory } = useForm()

  const prevProgression = useRef(progression)

  useEffect(() => {
    if (prevProgression.current === 0 && progression > 0) {
      trackEvent(matomoEventFirstAnswer)
    }
    if (prevProgression.current < 0.5 && progression >= 0.5) {
      trackEvent(matomoEvent50PercentProgress)
    }
    if (prevProgression.current < 0.9 && progression >= 0.9) {
      trackEvent(matomoEvent90PercentProgress)
    }
    prevProgression.current = progression
  }, [progression])

  useEffect(() => {
    if (isFirstQuestionOfCategory) {
      trackEvent(getMatomoEventParcoursTestCategoryStarted(currentCategory))
    }
  }, [currentCategory, isFirstQuestionOfCategory])

  return null
}
