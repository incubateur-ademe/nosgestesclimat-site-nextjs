'use client'

import { compareTwoSimulations } from '@/helpers/simulation/compareTwoSimulations'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useCurrentSimulation, useEngine } from '@/publicodes-state'
import { createContext, useCallback, useEffect, useMemo, useRef } from 'react'

// The max rate at which we save the simulation (in ms)
const SAVE_DELAY = 3000

interface SimulationSyncContextType {
  shouldSyncWithBackend: boolean
  resetSyncTimer: () => void
}
export const SimulationSyncContext = createContext<SimulationSyncContextType>({
  shouldSyncWithBackend: false,
  resetSyncTimer: () => null,
})
export default function SimulationSyncProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    id,
    date,
    situation,
    extendedSituation,
    foldedSteps,
    actionChoices,
    persona,
    computedResults,
    progression,
    additionalQuestionsAnswers,
    polls,
    groups,
  } = useCurrentSimulation()

  const { isInitialized } = useEngine()

  const { saveSimulation } = useSaveSimulation()

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Save all simulations started when engine is initialized
  const shouldSyncWithBackend = useMemo<boolean>(() => {
    if (!isInitialized) return false

    return true
  }, [isInitialized])

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
    extendedSituation,
    foldedSteps,
    actionChoices,
    persona,
    computedResults,
    progression,
    additionalQuestionsAnswers,
    polls,
    groups,
  })

  useEffect(() => {
    const hasChanged = compareTwoSimulations(prevSimulation.current, {
      id,
      date,
      situation,
      extendedSituation,
      foldedSteps,
      actionChoices,
      persona,
      computedResults,
      progression,
      additionalQuestionsAnswers,
      polls,
      groups,
    })

    prevSimulation.current = {
      id,
      date,
      situation,
      extendedSituation,
      foldedSteps,
      actionChoices,
      persona,
      computedResults,
      progression,
      additionalQuestionsAnswers,
      polls,
      groups,
    }

    // If there is no change, we do not start a save
    if (!hasChanged) {
      return
    }

    // If we should not save the simulation, we do not start a save
    if (!shouldSyncWithBackend) {
      return
    }

    // Reset any existing timeout before creating a new one
    resetSyncTimer()

    timeoutRef.current = setTimeout(() => {
      resetSyncTimer()

      saveSimulation({
        simulation: {
          id,
          date,
          situation,
          extendedSituation,
          foldedSteps,
          actionChoices,
          persona,
          computedResults,
          progression,
          additionalQuestionsAnswers,
          polls,
          groups,
        },
      })
    }, SAVE_DELAY)
  }, [
    id,
    date,
    situation,
    extendedSituation,
    foldedSteps,
    actionChoices,
    persona,
    computedResults,
    progression,
    additionalQuestionsAnswers,
    polls,
    groups,
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
        resetSyncTimer,
      }}>
      {children}
    </SimulationSyncContext.Provider>
  )
}
