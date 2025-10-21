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
import { useEffect, useRef, useState } from 'react'
import { useGTM } from '../useGTM'
import { useTrackTimeOnSimulation } from './useTrackTimeOnSimulation'

export function useTrackSimulator() {
  const [hasTrackedSimulatorSeen, setHasTrackedSimulatorSeen] = useState(false)
  const [hasTrackedFirstQuestion, setHasTrackedFirstQuestion] = useState(false)
  const [hasTrackedTestCompleted, setHasTrackedTestCompleted] = useState(false)

  const {
    isFirstQuestionOfCategory,
    isLastQuestionOfCategory,
    currentCategory,
    relevantAnsweredQuestions,
  } = useFormState()

  const currentSimulation = useCurrentSimulation()

  const simulation = useRef(currentSimulation)

  const userId = useRef(useUser().user.userId)

  const { progression, foldedSteps } = currentSimulation

  const { isGTMAvailable } = useGTM()

  const { getNumericValue } = useEngine()

  const { trackTimeOnSimulation } = useTrackTimeOnSimulation()

  const trackSimulation = (progression: number) =>
    saveSimulationForTracking({
      simulation: {
        ...simulation.current,
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
      userId: userId.current,
    })

  console.log('ICI', { progression, hasTrackedSimulatorSeen })
  // Track all users that start a new simulation
  useEffect(() => {
    if (
      progression === 0 &&
      foldedSteps.length === 0 &&
      !hasTrackedSimulatorSeen
    ) {
      console.log('TRACKING SEEN')
      trackSimulation(progression)

      trackEvent(simulationSimulationFirstQuestionSeen)

      trackPosthogEvent(
        captureSimulationFirstQuestionSeen({
          question:
            relevantAnsweredQuestions[relevantAnsweredQuestions.length - 1],
        })
      )

      setHasTrackedSimulatorSeen(true)
    }
  }, [
    progression,
    foldedSteps,
    relevantAnsweredQuestions,
    hasTrackedSimulatorSeen,
  ])

  // Track users that have answered at first question
  useEffect(() => {
    if (
      progression > 0 &&
      foldedSteps.length === 1 &&
      !hasTrackedFirstQuestion
    ) {
      console.log('TRACKING FIRST')

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

      setHasTrackedFirstQuestion(true)
    }
  }, [
    relevantAnsweredQuestions,
    progression,
    foldedSteps,
    isGTMAvailable,
    hasTrackedFirstQuestion,
  ])

  useEffect(() => {
    if (progression === 1 && !hasTrackedTestCompleted) {
      console.log('TRACKING COMPLETED')

      // Track all users that have completed their simulation
      trackSimulation(progression)

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

      setHasTrackedTestCompleted(true)
    }
  }, [
    progression,
    trackTimeOnSimulation,
    getNumericValue,
    isGTMAvailable,
    hasTrackedTestCompleted,
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
