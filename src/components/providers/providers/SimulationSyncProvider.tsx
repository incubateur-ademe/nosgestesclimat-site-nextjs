'use client'

import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import {
  useCurrentSimulation,
  useSimulation,
  useUser,
} from '@/publicodes-state'
import { captureException } from '@sentry/react'
import { createContext, useCallback, useEffect, useMemo, useRef } from 'react'

// The max rate at which we save the simulation (in ms)
const SAVE_DELAY = 3000

export type SimulationSyncContextType = {
  shouldSyncWithBackend: boolean
  isSyncedWithBackend: boolean
  resetSyncTimer: () => void
  saveDelay: number
}
export const SimulationSyncContext = createContext<SimulationSyncContextType>({
  shouldSyncWithBackend: false,
  isSyncedWithBackend: false,
  resetSyncTimer: () => null,
  saveDelay: SAVE_DELAY,
})
export default function SimulationSyncProvider({
  children,
}: {
  children: React.ReactNode
}) {
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

  const { isInitialized } = useSimulation()

  const { saveSimulation, isPending } = useSaveSimulation()

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // If the simulation is unfinished, is not in a group, poll, or is not already saved via email, we do not save it
  const shouldSyncWithBackend = useMemo<boolean>(() => {
    // Fix to avoid computedResults bilan === 0 bug
    if (progression !== 1) return false

    if (computedResults?.bilan === 0) {
      // Send an error to Sentry
      captureException(
        new Error('SimulationSyncProvider: computedResults.bilan === 0')
      )
      return false
    }

    if (groups?.length || polls?.length) {
      return true
    }

    if (user.email && savedViaEmail) {
      return true
    }

    return false
  }, [progression, user.email, groups, polls, savedViaEmail, computedResults])

  const isSyncedWithBackend = timeoutRef.current || isPending ? false : true

  const resetSyncTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [timeoutRef])

  const prevSimulation = useRef({
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
  })

  useEffect(() => {
    console.log('isInitialized', isInitialized, shouldSyncWithBackend)

    let hasChanged = false
    if (prevSimulation.current.id !== id) {
      console.log('id changed')
      hasChanged = true
    }
    if (prevSimulation.current.date !== date) {
      console.log('date changed')
      hasChanged = true
    }
    if (prevSimulation.current.situation !== situation) {
      console.log('situation changed')
      hasChanged = true
    }
    if (prevSimulation.current.foldedSteps !== foldedSteps) {
      console.log('foldedSteps changed')
      hasChanged = true
    }
    if (prevSimulation.current.actionChoices !== actionChoices) {
      console.log('actionChoices changed')
      hasChanged = true
    }
    if (prevSimulation.current.persona !== persona) {
      console.log('persona changed')
      hasChanged = true
    }
    if (prevSimulation.current.computedResults !== computedResults) {
      console.log(prevSimulation.current.computedResults, computedResults)
      console.log('computedResults changed')
      hasChanged = true
    }
    if (prevSimulation.current.progression !== progression) {
      console.log('progression changed')
      hasChanged = true
    }
    if (
      prevSimulation.current.defaultAdditionalQuestionsAnswers !==
      defaultAdditionalQuestionsAnswers
    ) {
      console.log('defaultAdditionalQuestionsAnswers changed')
      hasChanged = true
    }
    if (prevSimulation.current.polls !== polls) {
      console.log('polls changed')
      hasChanged = true
    }
    if (prevSimulation.current.groups !== groups) {
      console.log('groups changed')
      hasChanged = true
    }
    if (prevSimulation.current.savedViaEmail !== savedViaEmail) {
      console.log('savedViaEmail changed')
      hasChanged = true
    }

    console.log(hasChanged)

    prevSimulation.current = {
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
    }

    if (!shouldSyncWithBackend) {
      return
    }

    // If we are already waiting for a save, we do not start another one
    if (timeoutRef.current) {
      return
    }

    timeoutRef.current = setTimeout(() => {
      resetSyncTimer()

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
      })
    }, SAVE_DELAY)
  }, [
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
    shouldSyncWithBackend,
    resetSyncTimer,
    isInitialized,
  ])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <SimulationSyncContext.Provider
      value={{
        shouldSyncWithBackend,
        isSyncedWithBackend,
        resetSyncTimer,
        saveDelay: SAVE_DELAY,
      }}>
      {children}
    </SimulationSyncContext.Provider>
  )
}
