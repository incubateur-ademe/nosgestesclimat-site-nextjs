import {
  getMatomoEventParcoursTestCategoryStarted,
  matomoEvent50PercentProgress,
  matomoEvent90PercentProgress,
  matomoEventFirstAnswer,
} from '@/constants/matomo'
import { useForm } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect, useRef } from 'react'

export function useTrackSimulateur() {
  const { progression, isFirstQuestionOfCategory, currentCategory } = useForm()

  const prevProgression = useRef(progression)

  useEffect(() => {
    if (prevProgression.current === 0 && progression > 0) {
      trackEvent(matomoEventFirstAnswer)
      return
    }
    if (prevProgression.current < 0.5 && progression >= 0.5) {
      trackEvent(matomoEvent50PercentProgress)
      return
    }
    if (prevProgression.current < 0.9 && progression >= 0.9) {
      trackEvent(matomoEvent90PercentProgress)
      return
    }
    prevProgression.current = progression
  }, [progression])

  useEffect(() => {
    if (isFirstQuestionOfCategory) {
      trackEvent(getMatomoEventParcoursTestCategoryStarted(currentCategory))
    }
  }, [currentCategory, isFirstQuestionOfCategory])
}
