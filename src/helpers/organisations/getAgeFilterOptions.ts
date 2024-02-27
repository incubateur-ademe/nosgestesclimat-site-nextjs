import { SimulationRecap } from '@/types/organisations'
import dayjs from 'dayjs'

export function getAgeFilterOptions({
  filteredSimulationRecaps,
}: {
  filteredSimulationRecaps: SimulationRecap[]
}) {
  // Renvoie un tableau d'objets avec une valeur et un label
  // pour chaque tranche d'âge depuis "nés avant 1960" puis par dizaine : 1960-69 / 1970-1979...
  const currentYear = new Date().getFullYear()
  const firstYear = 1960

  const simulationsRecapUnder1960 = filteredSimulationRecaps.filter(
    (simulation) => {
      if (!simulation.defaultAdditionalQuestionsAnswers?.birthdate) return false

      const birthYear = dayjs(
        simulation.defaultAdditionalQuestionsAnswers?.birthdate
      ).year()

      return birthYear < firstYear
    }
  )

  const ageOptions = []

  if (simulationsRecapUnder1960.length > 0) {
    ageOptions.push({
      value: ['', currentYear - firstYear],
      label: `Nés avant 1960 (${simulationsRecapUnder1960?.length})`,
      isDisabled: simulationsRecapUnder1960.length === 0,
    })
  }

  for (let i = firstYear; i < currentYear; i += 10) {
    const simulationsRecapMatchingAge = filteredSimulationRecaps.filter(
      (simulation) => {
        const birthYear = dayjs(
          simulation.defaultAdditionalQuestionsAnswers?.birthdate
        ).year()

        if (!birthYear || isNaN(birthYear)) return false

        return birthYear >= i - 10 && birthYear < i
      }
    )

    if (simulationsRecapMatchingAge.length === 0) continue

    ageOptions.push({
      value: [
        // We subtract 1 to the current year to exclude the max value
        currentYear - (i + 1),
        currentYear - (i - 10) > 0 ? currentYear - (i - 10) : 0,
      ],
      label: `Nés entre ${i - 10} et ${i > currentYear ? currentYear : i} (${
        simulationsRecapMatchingAge.length
      })`,
      isDisabled: simulationsRecapMatchingAge.length < 3,
    })
  }

  return ageOptions
}
