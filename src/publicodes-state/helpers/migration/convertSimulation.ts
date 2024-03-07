import { Simulation } from '@/publicodes-state/types'

type Props = {
  simulation: any
}
type Return = Simulation

export function convertSimulation({ simulation }: Props): Return {
  // If the value inside the situation is an object {valeur: value}, we want to convert it to value
  Object.keys(simulation.situation).map((key) => {
    console.log(key)
    if (simulation.situation[key]?.valeur !== undefined) {
      simulation.situation[key] = simulation.situation[key].valeur
    }
  })

  return simulation
}
