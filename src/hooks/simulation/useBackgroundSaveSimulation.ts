import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { useEffect, useRef } from 'react'
import { useSaveSimulation } from './useSaveSimulation'

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
    const shouldBeSaved = user.email || groups?.length || polls?.length

    if (!shouldBeSaved) {
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
      5000
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
