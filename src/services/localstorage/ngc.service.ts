import { STORAGE_KEY } from '@/constants/storage'
import type { LocalStorage } from '@/publicodes-state/types'

export function getLocalState() {
  // Check if the local storage is available
  if (typeof window === 'undefined' || !window.localStorage) {
    return
  }

  return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as LocalStorage
}

export function getProgression() {
  const state = getLocalState()

  if (!state?.simulations || !state.currentSimulationId) {
    return 0
  }

  return (
    state?.simulations?.find(
      (simulation) => simulation.id === state.currentSimulationId
    )?.progression ?? 0
  )
}
