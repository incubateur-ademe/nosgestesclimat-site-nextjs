import { MigrationType, Simulation } from '../types'
import { convertSimulation } from './migration/convertSimulation'
import filterSimulationSituation from './migration/filterSimulation'

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

  // We migrate rules according to `dottedNamesMigration` table
  const filteredSimulation = filterSimulationSituation({
    simulation,
    migrationInstructions,
  })

  // If the value inside a situation key is an object {valeur: value}, we want to convert it to value
  const convertedSimulation = convertSimulation({
    simulation: filteredSimulation,
  })

  return convertedSimulation
}
