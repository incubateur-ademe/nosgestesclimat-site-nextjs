import { SimulationAdditionalQuestionAnswerType } from '@/constants/organisations/simulationAdditionalQuestionAnswerType'
import type { Simulation as OldSimulation } from '@/publicodes-state/types'
import type {
  AdditionalQuestionsAnswer,
  Simulation as NewSimulation,
} from '@/types/organisations'

export const mapNewSimulationToOld = (
  simulation: NewSimulation
): OldSimulation => ({
  ...simulation,
  defaultAdditionalQuestionsAnswers:
    simulation.additionalQuestionsAnswers.reduce(
      (acc: Record<string, string>, { answer, key, type }) => {
        if (type === SimulationAdditionalQuestionAnswerType.default) {
          acc[key] = answer
        }
        return acc
      },
      {}
    ),
  customAdditionalQuestionsAnswers:
    simulation.additionalQuestionsAnswers.reduce(
      (acc: Record<string, string>, { answer, key, type }) => {
        if (type === SimulationAdditionalQuestionAnswerType.custom) {
          acc[key] = answer
        }
        return acc
      },
      {}
    ),
  polls: simulation.polls?.map(({ slug }) => slug),
})

export const mapOldSimulationToNew = ({
  defaultAdditionalQuestionsAnswers,
  customAdditionalQuestionsAnswers,
  ...simulation
}: Omit<OldSimulation, 'polls'>): Omit<NewSimulation, 'polls'> => ({
  ...simulation,
  additionalQuestionsAnswers: [
    ...Object.entries(defaultAdditionalQuestionsAnswers || {}).map(
      ([key, answer]) => ({
        key,
        answer,
        type: SimulationAdditionalQuestionAnswerType.default,
      })
    ),
    ...Object.entries(customAdditionalQuestionsAnswers || {}).map(
      ([key, answer]) => ({
        key,
        answer,
        type: SimulationAdditionalQuestionAnswerType.custom,
      })
    ),
  ] as AdditionalQuestionsAnswer[],
})
