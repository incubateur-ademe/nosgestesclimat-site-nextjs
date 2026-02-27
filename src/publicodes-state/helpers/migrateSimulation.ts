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
  // Clone simulation first
  const simulationCopy = { ...simulation }

  if (migrationInstructions) {
    simulationCopy.situation = migrateSituation(
      simulationCopy.situation,
      migrationInstructions
    )

    // NOTE: folded steps (i.e. answered rules) are can be map to a situation,
    // where the keys are the rule names and the value is undefined.
    // NOTE: We should filter foldedSteps that are not questions here
    simulationCopy.foldedSteps = Object.keys(
      migrateSituation(
        Object.fromEntries(
          simulationCopy.foldedSteps.map((step) => [step, undefined])
        ),
        migrationInstructions
      )
    ) as DottedName[]
  }

  // If group or poll is defined, we convert it to groups or polls and delete it
  if (simulationCopy.group) {
    simulationCopy.groups = [simulationCopy.group]
    delete simulationCopy.group
  }

  if (simulationCopy.poll) {
    simulationCopy.polls = [
      { id: simulationCopy.poll, slug: simulationCopy.poll },
    ]
    delete simulationCopy.poll
  }

  if (simulationCopy.polls && simulationCopy.polls.length > 0) {
    if (typeof simulationCopy.polls[0] === 'string') {
      simulationCopy.polls = (simulationCopy.polls as string[]).map((poll) => ({
        id: poll,
        slug: poll,
      }))
    }
  }

  if (
    simulationCopy.defaultAdditionalQuestionsAnswers ||
    simulationCopy.customAdditionalQuestionsAnswers
  ) {
    simulationCopy.additionalQuestionsAnswers =
      simulationCopy.additionalQuestionsAnswers || []
    if (simulationCopy.defaultAdditionalQuestionsAnswers) {
      Object.entries(simulationCopy.defaultAdditionalQuestionsAnswers).forEach(
        ([key, answer]) => {
          simulationCopy.additionalQuestionsAnswers!.push({
            type: SimulationAdditionalQuestionAnswerType.default,
            key: key as PollDefaultAdditionalQuestion,
            answer,
          })
        }
      )
      delete simulationCopy.defaultAdditionalQuestionsAnswers
    }
    if (simulationCopy.customAdditionalQuestionsAnswers) {
      Object.entries(simulationCopy.customAdditionalQuestionsAnswers).forEach(
        ([key, answer]) => {
          simulationCopy.additionalQuestionsAnswers!.push({
            type: SimulationAdditionalQuestionAnswerType.custom,
            key,
            answer,
          })
        }
      )
      delete simulationCopy.customAdditionalQuestionsAnswers
    }
  }

  // If the computedResults object does not take multiple metrics into account, we add them
  if (
    'bilan' in simulationCopy.computedResults &&
    (simulationCopy.computedResults as { bilan?: number }).bilan !== undefined
  ) {
    const newComputedResults: ComputedResults = {
      carbone: simulationCopy.computedResults as ComputedResults['carbone'],
      eau: {
        bilan: 0,
        categories: {} as Record<DottedName, number>,
        subcategories: {} as Record<DottedName, number>,
      },
    }
    simulationCopy.computedResults = newComputedResults
  }

  return simulationCopy as Simulation
}
