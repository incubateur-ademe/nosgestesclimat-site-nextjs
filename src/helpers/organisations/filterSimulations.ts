import type { Simulation } from '@/types/organisations'
import { PollDefaultAdditionalQuestion } from '../../constants/organisations/pollDefaultAdditionalQuestion'
import { SimulationAdditionalQuestionAnswerType } from '../../constants/organisations/simulationAdditionalQuestionAnswerType'

type Props = {
  simulations: Simulation[]
  ageFilters: { value: [number, number] }[]
  postalCodeFilters: { value: string }[]
}

export function filterSimulations({
  simulations,
  ageFilters,
  postalCodeFilters,
}: Props) {
  const filteredSimulationsByQuestions = simulations.filter(
    ({ additionalQuestionsAnswers }) => {
      const defaultAdditionalQuestionsAnswers =
        additionalQuestionsAnswers.filter(
          ({ type }) => type === SimulationAdditionalQuestionAnswerType.default
        )

      const birthdate = defaultAdditionalQuestionsAnswers.find(
        ({ key }) => key === PollDefaultAdditionalQuestion.birthdate
      )?.answer

      const birthYear = new Date(birthdate || 0).getFullYear()

      const postalCode = defaultAdditionalQuestionsAnswers.find(
        ({ key }) => key === PollDefaultAdditionalQuestion.postalCode
      )?.answer

      const isPassingAgeFilter =
        ageFilters.length === 0 ||
        ageFilters.some((ageFilter) => {
          const [min, max] = ageFilter.value as [number, number]

          const age = new Date().getFullYear() - birthYear

          return age >= min && age <= max
        })

      const isPassingPostalCodeFilter =
        postalCodeFilters.length === 0 ||
        postalCodeFilters.some(
          (filterObject) => filterObject.value === postalCode
        )
      return isPassingAgeFilter && isPassingPostalCodeFilter
    }
  )

  return filteredSimulationsByQuestions
}
