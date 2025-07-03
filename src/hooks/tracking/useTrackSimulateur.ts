import { captureSimulationStarted } from '@/constants/tracking/posthogTrackers'
import {
  simulationCategoryCompleted,
  simulationCategoryStarted,
  simulationSimulationHalfCompleted,
  simulationSimulationStarted,
} from '@/constants/tracking/simulation'
import { useCurrentSimulation, useFormState } from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { useEffect, useRef } from 'react'

export function useTrackSimulateur() {
  const {
    isFirstQuestionOfCategory,
    isLastQuestionOfCategory,
    currentCategory,
    relevantAnsweredQuestions,
  } = useFormState()

  const { progression } = useCurrentSimulation()

  const prevProgression = useRef(progression)

  useEffect(() => {
    if (prevProgression.current === 0 && progression > 0) {
      trackEvent(simulationSimulationStarted)
      trackPosthogEvent(
        captureSimulationStarted({
          question:
            relevantAnsweredQuestions[relevantAnsweredQuestions.length - 1],
        })
      )
    }
    if (prevProgression.current < 0.5 && progression >= 0.5) {
      trackEvent(simulationSimulationHalfCompleted)
    }
    prevProgression.current = progression
  }, [relevantAnsweredQuestions, progression])

  useEffect(() => {
    if (!currentCategory) return

    if (isFirstQuestionOfCategory) {
      trackEvent(simulationCategoryStarted(currentCategory))
    }

    if (isLastQuestionOfCategory) {
      trackEvent(simulationCategoryCompleted(currentCategory))
    }
  }, [currentCategory, isFirstQuestionOfCategory, isLastQuestionOfCategory])
}
