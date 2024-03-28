import {
  simulationCategoryCompleted,
  simulationCategoryStarted,
  simulationSimulationHalfCompleted,
  simulationSimulationStarted,
} from '@/constants/tracking/simulation'
import { useForm } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect, useRef } from 'react'

export function useTrackSimulateur() {
  const {
    progression,
    isFirstQuestionOfCategory,
    isLastQuestionOfCategory,
    currentCategory,
  } = useForm()

  const prevProgression = useRef(progression)

  useEffect(() => {
    if (prevProgression.current === 0 && progression > 0) {
      trackEvent(simulationSimulationStarted)
      return
    }
    if (prevProgression.current < 0.5 && progression >= 0.5) {
      trackEvent(simulationSimulationHalfCompleted)
      return
    }
    prevProgression.current = progression
  }, [progression])

  useEffect(() => {
    if (isFirstQuestionOfCategory) {
      trackEvent(simulationCategoryStarted(currentCategory || ''))
    }
    if (isLastQuestionOfCategory) {
      trackEvent(simulationCategoryCompleted(currentCategory || ''))
    }
  }, [currentCategory, isFirstQuestionOfCategory, isLastQuestionOfCategory])
}
