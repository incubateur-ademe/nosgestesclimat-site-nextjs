import { useCookieManagement } from '@/components/cookies/useCookieManagement'
import {
  captureSimulationCompleted,
  captureSimulationFirstQuestionSeen,
  captureSimulationStarted,
} from '@/constants/trackers'
import {
  useCurrentSimulation,
  useEngine,
  useFormState,
} from '@/publicodes-state'
import { trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { trackGTMEvent } from '@/utils/analytics/trackGTMEvent'
import {
  getIsEventTracked,
  markAsEventTracked,
} from '@/utils/analytics/trackUniqueEvent'
import { useEffect } from 'react'
import { useTrackTimeOnSimulation } from './useTrackTimeOnSimulation'

const FIRST_QUESTION_SEEN = 'first_question_seen'
const FIRST_QUESTION_ANSWERED = 'first_question_answered'
const TEST_COMPLETED = 'test_completed'

export function useTrackSimulator() {
  const currentSimulation = useCurrentSimulation()
  const simulationId = currentSimulation.id

  const { relevantAnsweredQuestions, remainingQuestions } = useFormState()

  const { progression, foldedSteps } = currentSimulation

  const { cookieState } = useCookieManagement()

  const { getNumericValue } = useEngine()

  const { trackTimeOnSimulation } = useTrackTimeOnSimulation()

  // Track users that have seen the first question
  useEffect(() => {
    if (
      progression === 0 &&
      foldedSteps.length === 0 &&
      !getIsEventTracked(FIRST_QUESTION_SEEN, simulationId)
    ) {
      trackPosthogEvent(
        captureSimulationFirstQuestionSeen({
          question: remainingQuestions[0],
        })
      )

      markAsEventTracked(FIRST_QUESTION_SEEN, simulationId)
    }
  }, [remainingQuestions, progression, foldedSteps, simulationId])

  // Track users that have answered at first question
  useEffect(() => {
    if (
      progression > 0 &&
      foldedSteps.length === 1 &&
      !getIsEventTracked(FIRST_QUESTION_ANSWERED, simulationId)
    ) {
      // Track GTM event if available
      if (cookieState.googleTag === 'accepted') {
        trackGTMEvent({ event: 'start-form' })
      }

      trackPosthogEvent(
        captureSimulationStarted({
          question:
            relevantAnsweredQuestions[relevantAnsweredQuestions.length - 1],
        })
      )

      markAsEventTracked(FIRST_QUESTION_ANSWERED, simulationId)
    }
  }, [
    relevantAnsweredQuestions,
    progression,
    foldedSteps,
    simulationId,
    currentSimulation,
    cookieState,
  ])

  useEffect(() => {
    if (progression === 1 && !getIsEventTracked(TEST_COMPLETED, simulationId)) {
      const timeSpentOnSimulation = trackTimeOnSimulation()

      // Track GTM event if available
      if (cookieState.googleTag === 'accepted') {
        trackGTMEvent({ event: 'simulation-completed' })
      }

      trackPosthogEvent(
        captureSimulationCompleted({
          bilanCarbone: getNumericValue('bilan'),
          bilanEau: getNumericValue('bilan', 'eau'),
          timeSpentOnSimulation,
        })
      )

      markAsEventTracked(TEST_COMPLETED, simulationId)
    }
  }, [
    progression,
    trackTimeOnSimulation,
    getNumericValue,
    simulationId,
    currentSimulation,
    cookieState,
  ])
}
