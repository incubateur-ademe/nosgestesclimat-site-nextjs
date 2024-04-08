import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { useEffect, useRef } from 'react'
import { useSaveSimulation } from './useSaveSimulation'

// The max rate at which we save the simulation (in ms)
const SAVE_DELAY = 5000

export function useBackgroundSaveSimulation() {
  const { user } = useUser()

  const {
    id,
    date,
    situation,
    foldedSteps,
    actionChoices,
    persona,
    computedResults,
    progression,
    defaultAdditionalQuestionsAnswers,
    polls,
    groups,
    savedViaEmail,
  } = useCurrentSimulation()

  const { saveSimulation } = useSaveSimulation()

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // If the simulation is not in a group, poll, or we don't have an email, we do not save it
    const shouldBeSaved = user.email || groups?.length || polls?.length
    if (!shouldBeSaved) {
      return
    }
    // If we are already waiting for a save, we do not start another one
    if (timeoutRef.current) {
      return
    }

    timeoutRef.current = setTimeout(
      () =>
        saveSimulation({
          simulation: {
            id,
            date,
            situation,
            foldedSteps,
            actionChoices,
            persona,
            computedResults,
            progression,
            defaultAdditionalQuestionsAnswers,
            polls,
            groups,
            savedViaEmail,
          },
        }),
      SAVE_DELAY
    )
  }, [
    user,
    id,
    date,
    situation,
    foldedSteps,
    actionChoices,
    persona,
    computedResults,
    progression,
    defaultAdditionalQuestionsAnswers,
    polls,
    groups,
    savedViaEmail,
    saveSimulation,
  ])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])
}
