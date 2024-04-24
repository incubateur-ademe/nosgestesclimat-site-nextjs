import { Simulation } from '@/publicodes-state/types'

type Props = {
  simulation: any
}
type Return = Simulation

export function convertSimulation({ simulation }: Props): Return {
  // If the value inside the situation is an object {valeur: value}, we want to convert it to value
  Object.keys(simulation.situation).map((key) => {
    if (simulation.situation[key]?.valeur !== undefined) {
      simulation.situation[key] = simulation.situation[key].valeur
    }
  })

  // If group or poll is defined, we convert it to groups or polls and delete it
  if (simulation.group) {
    simulation.groups = [simulation.group]
    delete simulation.group
  }
  if (simulation.poll) {
    simulation.polls = [simulation.poll]
    delete simulation.poll
  }

  return simulation
}
