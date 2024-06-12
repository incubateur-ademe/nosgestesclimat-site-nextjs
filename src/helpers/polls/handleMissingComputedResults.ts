import { getDisposableEngine } from '@/publicodes-state/helpers/getDisposableEngine'
import { Rules } from '@/publicodes-state/types'
import { SimulationRecap } from '@/types/organisations'
import { getComputedResults } from '../simulation/getComputedResults'

type Props = {
  simulationRecaps: SimulationRecap[]
  rules: Rules
  categories: string[]
}

export function handleMissingComputedResults({
  simulationRecaps,
  rules,
  categories,
}: Props) {
  return simulationRecaps.map((simulationRecap: SimulationRecap) => {
    if (simulationRecap.bilan !== 0) return simulationRecap

    const { safeEvaluate } = getDisposableEngine({
      rules,
      situation: simulationRecap.situation,
    })

    const computedResults = getComputedResults(categories, safeEvaluate)

    return {
      ...simulationRecap,
      bilan: computedResults.bilan,
      categories: computedResults.categories,
    }
  })
}
