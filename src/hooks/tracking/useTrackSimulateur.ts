import {
  simulationCategoryCompleted,
  simulationCategoryStarted,
  simulationSimulationHalfCompleted,
  simulationSimulationStarted,
} from '@/constants/tracking/simulation'
import { useCurrentSimulation, useForm } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect, useRef } from 'react'

export function useTrackSimulateur() {
  const {
    isFirstQuestionOfCategory,
    isLastQuestionOfCategory,
    currentCategory,
  } = useForm()

  const { progression } = useCurrentSimulation()

  const prevProgression = useRef(progression)

  useEffect(() => {
    if (prevProgression.current === 0 && progression > 0) {
      trackEvent(simulationSimulationStarted)
    }
    if (prevProgression.current < 0.5 && progression >= 0.5) {
      trackEvent(simulationSimulationHalfCompleted)
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
