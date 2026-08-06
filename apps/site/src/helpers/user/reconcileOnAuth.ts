import { STORAGE_KEY } from '@/constants/storage'
import type { Simulation } from '@/helpers/server/model/simulations'
import { uploadLocalSimulations } from '@/services/simulations/upload-local-simulations'
import type { CookieState } from '@/services/tracking/cookieStateStore'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import posthog from 'posthog-js'
import { sanitizeSimulation } from '../simulation/sanitizeSimulation'

const LIMIT_DATE = new Date('2025-11-27')

/**
 * localStorage data is not trusted: legacy simulations may hold an outdated
 * `computedResults` shape (without `carbone`). Only upload simulations whose
 * results are displayable, so that no bad data can reach the database.
 * The server also validates this shape on POST as a second line of defense.
 */
const hasDisplayableComputedResults = (simulation: Simulation): boolean =>
  typeof (simulation.computedResults as { carbone?: { bilan?: number } })
    .carbone?.bilan === 'number'

async function uploadHistoricalSimulations() {
  const storage = JSON.parse(safeLocalStorage.getItem(STORAGE_KEY) || '{}')
  const simulations = ((storage?.simulations ?? []) as Simulation[])
    .filter((simulation) => new Date(simulation.date) < LIMIT_DATE)
    .filter(hasDisplayableComputedResults)
    .map((simulation) => sanitizeSimulation(simulation))

  if (simulations.length === 0) return

  return await uploadLocalSimulations(simulations)
}

export async function reconcileUserOnAuth({
  cookieState,
  userId,
}: {
  userId: string
  cookieState: CookieState
}) {
  await uploadHistoricalSimulations()

  if (cookieState.posthog === 'accepted') {
    posthog.identify(userId)
  }
}
