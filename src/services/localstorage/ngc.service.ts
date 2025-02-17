import { STORAGE_KEY } from '@/constants/storage'
import type { LocalStorage } from '@/publicodes-state/types'
import { captureException } from '@sentry/nextjs'

export function getLocalState() {
  // Check if the local storage is available
  if (typeof localStorage === 'undefined') {
    return
  }
  let parsedState: LocalStorage | undefined
  try {
    parsedState = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? '{}'
    ) as LocalStorage
  } catch (error) {
    captureException(error)
  }
  return parsedState
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
