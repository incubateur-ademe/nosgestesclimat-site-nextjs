import { PollDefaultAdditionalQuestion } from '@/constants/organisations/pollDefaultAdditionalQuestion'
import { SimulationAdditionalQuestionAnswerType } from '@/constants/organisations/simulationAdditionalQuestionAnswerType'
import type { PublicPollSimulation } from '@/types/organisations'

const filterMapPostalCodes = (
  acc: string[],
  simulation: PublicPollSimulation
) => {
  const code = simulation.additionalQuestionsAnswers.find(
    ({ type, key }) =>
      type === SimulationAdditionalQuestionAnswerType.default &&
      key === PollDefaultAdditionalQuestion.postalCode
  )?.answer

  if (code) {
    acc.push(code)
  }

  return acc
}

export function extractPostalCodesFromSimulations({
  simulations,
  filteredSimulations,
}: {
  simulations: PublicPollSimulation[]
  filteredSimulations: PublicPollSimulation[]
}) {
  const postalCodes = simulations.reduce(filterMapPostalCodes, [])

  const uniquePostalCodes = Array.from(new Set(postalCodes)).sort()

  const filteredPostalCodes = filteredSimulations.reduce(
    filterMapPostalCodes,
    []
  )

  return uniquePostalCodes.map((postalCode) => {
    return {
      value: postalCode,
      label: `${postalCode} (${
        filteredPostalCodes.filter((code) => code === postalCode).length
      })`,
      isDisabled:
        !filteredPostalCodes.includes(postalCode) ||
        filteredPostalCodes.filter((code) => code === postalCode).length < 3,
    }
  })
}
