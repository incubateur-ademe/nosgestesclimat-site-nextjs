'use client'

import { defaultMetric } from '@/constants/model/metric'
import { compareTwoSimulations } from '@/helpers/simulation/compareTwoSimulations'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useCurrentSimulation, useEngine, useUser } from '@/publicodes-state'
import { createContext, useCallback, useEffect, useMemo, useRef } from 'react'

// The max rate at which we save the simulation (in ms)
const SAVE_DELAY = 3000

type SimulationSyncContextType = {
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
    extendedSituation,
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

  const { isInitialized } = useEngine()

  const { saveSimulation, isPending } = useSaveSimulation()

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // If the simulation is unfinished, is not in a group, poll, or is not already saved via email, we do not save it
  const shouldSyncWithBackend = useMemo<boolean>(() => {
    if (!isInitialized) return false

    if (computedResults[defaultMetric].bilan === 0) {
      return false
    }

    // Auto save for groups
    if (groups?.length && progression === 1) {
      return true
    }

    if (user.email && savedViaEmail) {
      return true
    }

    return false
  }, [
    progression,
    user.email,
    groups,
    savedViaEmail,
    computedResults,
    isInitialized,
  ])

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
    extendedSituation,
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
    const simulationToCompare = {
      ...prevSimulation.current,
      savedViaEmail: undefined,
    }

    const hasChanged = compareTwoSimulations(simulationToCompare, {
      id,
      date,
      situation,
      extendedSituation,
      foldedSteps,
      actionChoices,
      persona,
      computedResults,
      progression,
      defaultAdditionalQuestionsAnswers,
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
      defaultAdditionalQuestionsAnswers,
      polls,
      groups,
      savedViaEmail,
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
    extendedSituation,
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
