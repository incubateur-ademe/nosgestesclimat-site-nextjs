import { SimulationRecap } from '@/types/organisations'

export function extractPostalCodesFromSimulationRecaps({
  simulationRecaps,
  filteredSimulationRecaps,
}: {
  simulationRecaps: SimulationRecap[]
  filteredSimulationRecaps: SimulationRecap[]
}) {
  const postalCodes = simulationRecaps
    .map(
      (simulationRecap) =>
        simulationRecap.defaultAdditionalQuestionsAnswers.postalCode
    )
    .filter((code) => !!code)

  const uniquePostalCodes = Array.from(new Set(postalCodes)).sort()

  const filteredPostalCodes = filteredSimulationRecaps.map(
    (simulationRecap) =>
      simulationRecap.defaultAdditionalQuestionsAnswers.postalCode
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
