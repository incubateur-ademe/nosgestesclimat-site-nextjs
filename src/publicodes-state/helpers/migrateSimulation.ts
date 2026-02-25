import type { PollDefaultAdditionalQuestion } from '@/constants/organisations/pollDefaultAdditionalQuestion'
import { SimulationAdditionalQuestionAnswerType } from '@/constants/organisations/simulationAdditionalQuestionAnswerType'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { Migration } from '@publicodes/tools/migration'
import { migrateSituation } from '@publicodes/tools/migration'
import type { ComputedResults, Simulation } from '../types'

export function migrateSimulation(
  simulation: Omit<Simulation, 'polls'> & {
    group?: string
    poll?: string
    polls?: { id: string; slug: string }[] | string[] | null
    defaultAdditionalQuestionsAnswers?: Record<string, string>
    customAdditionalQuestionsAnswers?: Record<string, string>
    computedResults:
      | ComputedResults
      | { bilan?: number; categories?: Record<string, number> }
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
    // NOTE: We should filter foldedSteps that are not questions here
    simulation.foldedSteps = Object.keys(
      migrateSituation(
        Object.fromEntries(
          simulation.foldedSteps.map((step) => [step, undefined])
        ),
        migrationInstructions
      )
    ) as DottedName[]
  }

  // If group or poll is defined, we convert it to groups or polls and delete it
  if (simulation.group) {
    simulation.groups = [simulation.group]
    delete simulation.group
  }

  if (simulation.poll) {
    simulation.polls = [{ id: simulation.poll, slug: simulation.poll }]
    delete simulation.poll
  }

  if (simulation.polls && simulation.polls.length > 0) {
    if (typeof simulation.polls[0] === 'string') {
      simulation.polls = (simulation.polls as string[]).map((poll) => ({
        id: poll,
        slug: poll,
      }))
    }
  }

  if (
    simulation.defaultAdditionalQuestionsAnswers ||
    simulation.customAdditionalQuestionsAnswers
  ) {
    simulation.additionalQuestionsAnswers =
      simulation.additionalQuestionsAnswers || []
    if (simulation.defaultAdditionalQuestionsAnswers) {
      Object.entries(simulation.defaultAdditionalQuestionsAnswers).forEach(
        ([key, answer]) => {
          simulation.additionalQuestionsAnswers!.push({
            type: SimulationAdditionalQuestionAnswerType.default,
            key: key as PollDefaultAdditionalQuestion,
            answer,
          })
        }
      )
      delete simulation.defaultAdditionalQuestionsAnswers
    }
    if (simulation.customAdditionalQuestionsAnswers) {
      Object.entries(simulation.customAdditionalQuestionsAnswers).forEach(
        ([key, answer]) => {
          simulation.additionalQuestionsAnswers!.push({
            type: SimulationAdditionalQuestionAnswerType.custom,
            key,
            answer,
          })
        }
      )
      delete simulation.customAdditionalQuestionsAnswers
    }
  }

  // If the computedResults object does not take multiple metrics into account, we add them
  if (
    'bilan' in simulation.computedResults &&
    (simulation.computedResults as { bilan?: number }).bilan !== undefined
  ) {
    const newComputedResults: ComputedResults = {
      carbone: simulation.computedResults as ComputedResults['carbone'],
      eau: {
        bilan: 0,
        categories: {} as Record<DottedName, number>,
        subcategories: {} as Record<DottedName, number>,
      },
    }
    simulation.computedResults = newComputedResults
  }

  return simulation as Simulation
}
