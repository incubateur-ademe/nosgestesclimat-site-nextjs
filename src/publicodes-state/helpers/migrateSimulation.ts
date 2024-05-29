// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { migrateSituation } from '@publicodes/tools/migration'
import { MigrationType, Simulation } from '../types'

type Props = {
  simulation: Simulation
  migrationInstructions: MigrationType
}
type Return = Simulation

export function migrateSimulation({
  simulation: oldSimulation,
  migrationInstructions,
}: Props): Return {
  const simulation = JSON.parse(JSON.stringify(oldSimulation)) as Simulation

  const { situationMigrated, foldedStepsMigrated } = migrateSituation({
    situation: simulation.situation,
    foldedSteps: simulation.foldedSteps,
    migrationInstructions,
  })

  simulation.situation = situationMigrated
  simulation.foldedSteps = foldedStepsMigrated

  return simulation
}
