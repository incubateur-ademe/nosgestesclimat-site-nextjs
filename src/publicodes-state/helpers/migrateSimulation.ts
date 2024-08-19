import { Migration, migrateSituation } from '@publicodes/tools/migration'
import { ComputedResults, Simulation } from '../types'

export function migrateSimulation(
  simulation: Simulation & {
    group?: string
    poll?: string
    computedResults: any
  },
  migrationInstructions: Migration | undefined
): Simulation {
  if (migrationInstructions) {
    simulation.situation = migrateSituation(
      simulation.situation,
      migrationInstructions
    )

    // NOTE: folded steps (i.e. answered rules) are can be map to a situation,
    // where the keys are the rule names and the value is undefined.
    simulation.foldedSteps = Object.keys(
      migrateSituation(
        Object.fromEntries(
          simulation.foldedSteps.map((step) => [step, undefined])
        ),
        migrationInstructions
      )
    )
  }

  // If group or poll is defined, we convert it to groups or polls and delete it
  if (simulation.group) {
    simulation.groups = [simulation.group]
    delete simulation.group
  }

  if (simulation.poll) {
    simulation.polls = [simulation.poll]
    delete simulation.poll
  }

  // TODO: THIS SHOULD BE REMOVED WHEN WE LAUNCH THE EMPREINTE EAU
  // If the computedResults is of format { carbone: ..., eau: ...}, we revert it back to { bilan: ..., categories: ... }
  if ('carbone' in simulation.computedResults) {
    simulation.computedResults = simulation.computedResults
      .carbone as ComputedResults
  }
  return simulation
}
