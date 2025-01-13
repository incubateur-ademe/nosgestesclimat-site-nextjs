import { STORAGE_KEY } from '@/constants/storage'
import type { LocalStorage } from '@/publicodes-state/types'

export function getLocalState() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as LocalStorage
}

export function getProgression() {
  const state = getLocalState()

  return (
    state?.simulations?.filter(
      (simulation) => simulation.id === state.currentSimulationId
    )?.[0] ?? 0
  )
}

export function getUser() {
  const state = getLocalState()

  return state.user
}
