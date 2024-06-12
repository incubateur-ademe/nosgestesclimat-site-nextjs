'use client'

import { getComputedResults } from '@/helpers/simulation/getComputedResults'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useRules } from '@/hooks/useRules'
import {
  useCurrentSimulation,
  useSimulation,
  useUser,
} from '@/publicodes-state'
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

  const { data: rules } = useRules()

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

  const { categories, safeEvaluate } = useSimulation()

  const { saveSimulation, isPending } = useSaveSimulation()

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // If the simulation is not in a group, poll, or we don't have an email, we do not save it
  const shouldSyncWithBackend = useMemo<boolean>(() => {
    // We do not saved unfinished simulations
    // Fix to avoid computedResults bilan === 0 bug
    if (progression !== 1 || computedResults?.bilan === 0) return false

    return user.email || groups?.length || polls?.length ? true : false
  }, [progression, user.email, groups, polls, computedResults?.bilan])

  const isSyncedWithBackend = timeoutRef.current || isPending ? false : true

  const resetSyncTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [timeoutRef])

  useEffect(() => {
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
          // Fix to avoid computedResults bilan === 0 bug
          computedResults:
            computedResults?.bilan === 0
              ? getComputedResults({
                  situation,
                  categories,
                  rules,
                })
              : computedResults,
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
    categories,
    safeEvaluate,
    rules,
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
