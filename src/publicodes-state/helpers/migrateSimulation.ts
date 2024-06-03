import { Migration, migrateSituation } from '@publicodes/tools/migration'
import { Simulation } from '../types'

export function migrateSimulation(
  simulation: Simulation,
  migrationInstructions: Migration
): Simulation {
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

  return simulation
}
