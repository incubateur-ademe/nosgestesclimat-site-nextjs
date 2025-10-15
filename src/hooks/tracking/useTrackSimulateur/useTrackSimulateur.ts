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
  simulationSimulationHalfCompleted,
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
import { useCallback, useEffect } from 'react'
import { useGTM } from '../../useGTM'
import { useTrackTimeOnSimulation } from '../useTrackTimeOnSimulation'
import {
  getSimulationEvents,
  markCategoryEventAsTracked,
  markEventAsTracked,
} from './helpers/trackingLocalStorage'

export function useTrackSimulateur() {
  const {
    isFirstQuestionOfCategory,
    isLastQuestionOfCategory,
    currentCategory,
    relevantAnsweredQuestions,
  } = useFormState()

  const simulation = useCurrentSimulation()

  const { user } = useUser()

  const { progression, isCompleted, id } = simulation || {}

  const { isGTMAvailable } = useGTM()

  const { getNumericValue } = useEngine()

  const { trackTimeOnSimulation } = useTrackTimeOnSimulation()

  // Get tracked events for current simulation
  const trackedEvents = simulation ? getSimulationEvents(simulation.id) : {}

  const trackSimulation = useCallback(async () => {
    await saveSimulationForTracking({
      simulation: {
        ...simulation,
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
      user,
    })
  }, [simulation, user])

  // Track all users that start a new simulation
  useEffect(() => {
    if (
      progression === 0 &&
      !trackedEvents.progression0 &&
      id &&
      !isCompleted
    ) {
      trackSimulation()
      markEventAsTracked(id, 'progression0')

      trackEvent(simulationSimulationFirstQuestionSeen)

      trackPosthogEvent(
        captureSimulationFirstQuestionSeen({
          question:
            relevantAnsweredQuestions[relevantAnsweredQuestions.length - 1],
        })
      )
    }
  }, [
    progression,
    trackSimulation,
    trackedEvents.progression0,
    relevantAnsweredQuestions,
    simulation,
    isCompleted,
    id,
  ])

  // Track users that have answered at least one question
  useEffect(() => {
    if (
      progression > 0 &&
      !trackedEvents.progressionStarted &&
      id &&
      !isCompleted
    ) {
      // Track for all users when the first answer is recorded
      trackSimulation()

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

      markEventAsTracked(id, 'progressionStarted')
    }
  }, [
    relevantAnsweredQuestions,
    progression,
    isGTMAvailable,
    trackSimulation,
    trackedEvents.progressionStarted,
    id,
    isCompleted,
  ])

  useEffect(() => {
    if (
      progression >= 0.5 &&
      !trackedEvents.progressionHalf &&
      id &&
      !isCompleted
    ) {
      trackEvent(simulationSimulationHalfCompleted)
      markEventAsTracked(id, 'progressionHalf')
    }
  }, [progression, trackedEvents.progressionHalf, id, isCompleted])

  useEffect(() => {
    if (
      progression === 1 &&
      !trackedEvents.progressionCompleted &&
      id &&
      !isCompleted
    ) {
      // Track all users that have completed their simulation
      trackSimulation()

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

      markEventAsTracked(id, 'progressionCompleted')
    }
  }, [
    progression,
    trackSimulation,
    trackTimeOnSimulation,
    getNumericValue,
    isGTMAvailable,
    trackedEvents.progressionCompleted,
    id,
    isCompleted,
  ])

  useEffect(() => {
    if (!currentCategory || isCompleted || !id) return

    if (
      isFirstQuestionOfCategory &&
      !trackedEvents.categoriesStarted?.[currentCategory]
    ) {
      trackEvent(simulationCategoryStarted(currentCategory))
      markCategoryEventAsTracked(id, 'categoriesStarted', currentCategory)
    }

    if (
      isLastQuestionOfCategory &&
      !trackedEvents.categoriesCompleted?.[currentCategory]
    ) {
      trackEvent(simulationCategoryCompleted(currentCategory))
      markCategoryEventAsTracked(id, 'categoriesCompleted', currentCategory)
    }
  }, [
    currentCategory,
    isFirstQuestionOfCategory,
    isLastQuestionOfCategory,
    isCompleted,
    id,
    trackedEvents.categoriesStarted,
    trackedEvents.categoriesCompleted,
  ])
}
