import { SimulationAdditionalQuestionAnswerType } from '@/constants/organisations/simulationAdditionalQuestionAnswerType'
import type {
  LocalStorageSimulation,
  Simulation,
} from '@/publicodes-state/types'
import type { AdditionalQuestionsAnswer } from '@/types/organisations'

export const mapOldSimulationToNew = ({
  polls: _,
  defaultAdditionalQuestionsAnswers,
  customAdditionalQuestionsAnswers,
  ...simulation
}: LocalStorageSimulation): Simulation => ({
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
