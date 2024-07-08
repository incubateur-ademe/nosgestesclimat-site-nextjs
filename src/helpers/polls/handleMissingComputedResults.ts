import { ComputedResults, Situation } from '@/publicodes-state/types'
import { SimulationRecap } from '@/types/organisations'
import { captureException } from '@sentry/react'

type Props = {
  simulationRecaps: SimulationRecap[]
  getComputedResults: (situation: Situation) => ComputedResults
}

export function handleMissingComputedResults({
  simulationRecaps,
  getComputedResults,
}: Props) {
  return simulationRecaps.map((simulationRecap: SimulationRecap) => {
    if (simulationRecap.bilan !== 0) return simulationRecap

    // Send an error to Sentry
    captureException(
      new Error('handleMissingComputedResults: computedResults.bilan === 0')
    )

    const computedResults = getComputedResults(simulationRecap.situation)

    return {
      ...simulationRecap,
      bilan: computedResults.bilan,
      categories: computedResults.categories,
    }
  })
}
