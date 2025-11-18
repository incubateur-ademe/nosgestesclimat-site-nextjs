import {
  captureSimulationCompleted,
  captureSimulationStarted,
} from '@/constants/tracking/posthogTrackers'
import {
  gtmSimulationCompleted,
  gtmSimulationStarted,
  simulationCategoryCompleted,
  simulationCategoryStarted,
  simulationSimulationCompleted,
  simulationSimulationStarted,
} from '@/constants/tracking/simulation'
import {
  useCurrentSimulation,
  useEngine,
  useFormState,
} from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { trackGTMEvent } from '@/utils/analytics/trackGTMEvent'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import { useEffect } from 'react'
import { useGTM } from '../useGTM'
import { useTrackTimeOnSimulation } from './useTrackTimeOnSimulation'

const FIRST_QUESTION = 'first_question'
const TEST_COMPLETED = 'test_completed'

const getTrackingKey = (simulationId: string, eventType: string): string => {
  return `ngc_tracking_${eventType}_${simulationId}`
}

const getTrackingState = (simulationId: string, eventType: string): boolean => {
  if (typeof window === 'undefined') return false
  const key = getTrackingKey(simulationId, eventType)
  return safeLocalStorage.getItem(key) === 'true'
}

const setTrackingState = (
  simulationId: string,
  eventType: string,
  value: boolean
): void => {
  if (typeof window === 'undefined') return
  const key = getTrackingKey(simulationId, eventType)
  safeLocalStorage.setItem(key, value.toString())
}

export function useTrackSimulator() {
  const currentSimulation = useCurrentSimulation()
  const simulationId = currentSimulation.id

  const {
    isFirstQuestionOfCategory,
    isLastQuestionOfCategory,
    currentCategory,
    relevantAnsweredQuestions,
  } = useFormState()

  const { progression, foldedSteps } = currentSimulation

  const { isGTMAvailable } = useGTM()

  const { getNumericValue } = useEngine()

  const { trackTimeOnSimulation } = useTrackTimeOnSimulation()

  // Track users that have answered at first question
  useEffect(() => {
    if (
      progression > 0 &&
      foldedSteps.length === 1 &&
      !getTrackingState(simulationId, FIRST_QUESTION)
    ) {
      trackEvent(simulationSimulationStarted)

      // Track GTM event if available
      if (isGTMAvailable) {
        trackGTMEvent(gtmSimulationStarted)
      }

      trackPosthogEvent(
        captureSimulationStarted({
          question:
            relevantAnsweredQuestions[relevantAnsweredQuestions.length - 1],
        })
      )

      setTrackingState(simulationId, FIRST_QUESTION, true)
    }
  }, [
    relevantAnsweredQuestions,
    progression,
    foldedSteps,
    isGTMAvailable,
    simulationId,
    currentSimulation,
  ])

  useEffect(() => {
    if (progression === 1 && !getTrackingState(simulationId, TEST_COMPLETED)) {
      const timeSpentOnSimulation = trackTimeOnSimulation()

      const bilan = getNumericValue('bilan')

      // Track Matomo event
      trackEvent(simulationSimulationCompleted(bilan))

      // Track GTM event if available
      if (isGTMAvailable) {
        trackGTMEvent(gtmSimulationCompleted)
      }

      trackPosthogEvent(
        captureSimulationCompleted({
          bilanCarbone: getNumericValue('bilan'),
          bilanEau: getNumericValue('bilan', 'eau'),
          timeSpentOnSimulation,
        })
      )

      setTrackingState(simulationId, TEST_COMPLETED, true)
    }
  }, [
    progression,
    trackTimeOnSimulation,
    getNumericValue,
    isGTMAvailable,
    simulationId,
    currentSimulation,
  ])

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
