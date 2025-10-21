import {
  captureSimulationCompleted,
  captureSimulationFirstQuestionSeen,
  captureSimulationStarted,
} from '@/constants/tracking/posthogTrackers'
import {
  gtmSimulationCompleted,
  gtmSimulationStarted,
  simulationCategoryCompleted,
  simulationCategoryStarted,
  simulationSimulationCompleted,
  simulationSimulationFirstQuestionSeen,
  simulationSimulationStarted,
} from '@/constants/tracking/simulation'
import { saveSimulationForTracking } from '@/helpers/simulation/saveSimulationForTracking'
import {
  useCurrentSimulation,
  useEngine,
  useFormState,
  useUser,
} from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { trackGTMEvent } from '@/utils/analytics/trackGTMEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useEffect, useRef } from 'react'
import { useGTM } from '../useGTM'
import { useTrackTimeOnSimulation } from './useTrackTimeOnSimulation'

const SIMULATOR_SEEN = 'simulator_seen'
const FIRST_QUESTION = 'first_question'
const TEST_COMPLETED = 'test_completed'

const getTrackingKey = (simulationId: string, eventType: string): string => {
  return `ngc_tracking_${eventType}_${simulationId}`
}

const getTrackingState = (simulationId: string, eventType: string): boolean => {
  if (typeof window === 'undefined') return false
  const key = getTrackingKey(simulationId, eventType)
  return sessionStorage.getItem(key) === 'true'
}

const setTrackingState = (
  simulationId: string,
  eventType: string,
  value: boolean
): void => {
  if (typeof window === 'undefined') return
  const key = getTrackingKey(simulationId, eventType)
  sessionStorage.setItem(key, value.toString())
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

  const simulationRef = useRef(currentSimulation)

  const userIdRef = useRef(useUser().user.userId)

  const { progression, foldedSteps } = currentSimulation

  const { isGTMAvailable } = useGTM()

  const { getNumericValue } = useEngine()

  const { trackTimeOnSimulation } = useTrackTimeOnSimulation()

  const trackSimulation = (progression: number) =>
    saveSimulationForTracking({
      simulation: {
        ...simulationRef.current,
        progression,
        computedResults: {
          carbone: {
            bilan: 0,
            categories: {
              transport: 0,
              alimentation: 0,
              logement: 0,
              divers: 0,
              'services sociétaux': 0,
            } as Record<DottedName, number>,
            subcategories: {
              'divers . ameublement': 0,
            } as Record<DottedName, number>,
          },
          eau: {
            bilan: 0,
            categories: {
              transport: 0,
              alimentation: 0,
              logement: 0,
              divers: 0,
              'services sociétaux': 0,
            } as Record<DottedName, number>,
            subcategories: {
              'divers . ameublement': 0,
            } as Record<DottedName, number>,
          },
        },
      },
      userId: userIdRef.current,
    })

  // Track all users that start a new simulation
  useEffect(() => {
    if (
      progression === 0 &&
      foldedSteps.length === 0 &&
      !getTrackingState(simulationId, SIMULATOR_SEEN)
    ) {
      setTrackingState(simulationId, SIMULATOR_SEEN, true)

      trackSimulation(progression)

      trackEvent(simulationSimulationFirstQuestionSeen)

      trackPosthogEvent(
        captureSimulationFirstQuestionSeen({
          question:
            relevantAnsweredQuestions[relevantAnsweredQuestions.length - 1],
        })
      )
    }
  }, [progression, foldedSteps, relevantAnsweredQuestions, simulationId])

  // Track users that have answered at first question
  useEffect(() => {
    if (
      progression > 0 &&
      foldedSteps.length === 1 &&
      !getTrackingState(simulationId, FIRST_QUESTION)
    ) {
      // Track for all users when the first answer is recorded
      trackSimulation(progression)

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
  ])

  useEffect(() => {
    if (progression === 1 && !getTrackingState(simulationId, TEST_COMPLETED)) {
      // Skip saving completed event for simulations with groups or polls to avoid overwriting data
      const hasGroupOrPoll =
        (currentSimulation.groups?.length ?? 0) > 0 ||
        (currentSimulation.polls?.length ?? 0) > 0

      if (!hasGroupOrPoll) {
        // Track all users that have completed their simulation
        trackSimulation(progression)
      }

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
