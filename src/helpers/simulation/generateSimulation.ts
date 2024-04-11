import { migrateSimulation } from '@/publicodes-state/helpers/migrateSimulation'
import { MigrationType, Simulation } from '@/publicodes-state/types'
import { v4 as uuidv4 } from 'uuid'

export function generateSimulation({
  id = uuidv4(),
  date = new Date().toISOString(),
  situation = {},
  foldedSteps = [],
  actionChoices = {},
  persona,
  computedResults,
  progression = 0,
  defaultAdditionalQuestionsAnswers,
  polls,
  groups,
  savedViaEmail,
  migrationInstructions,
}: Partial<Simulation> & {
  migrationInstructions?: MigrationType
} = {}): Simulation {
  let simulation = {
    id,
    date,
    situation,
    foldedSteps,
    actionChoices,
    persona,
    computedResults,
    progression,
    defaultAdditionalQuestionsAnswers,
    polls,
    groups,
    savedViaEmail,
  } as Simulation

  if (migrationInstructions) {
    simulation = migrateSimulation({
      simulation,
      migrationInstructions,
    })
  }

  return simulation
}
