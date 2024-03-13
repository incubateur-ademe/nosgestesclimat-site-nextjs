import { SimulationRecap } from '@/types/organisations'

type Props = {
  simulationRecaps: SimulationRecap[]
  ageFilters: { value: [number, number] }[]
  postalCodeFilters: { value: string }[]
}

export function filterSimulationRecaps({
  simulationRecaps,
  ageFilters,
  postalCodeFilters,
}: Props) {
  return simulationRecaps.filter(({ defaultAdditionalQuestionsAnswers }) => {
    const birthYear = new Date(
      defaultAdditionalQuestionsAnswers.birthdate
    ).getFullYear()

    const postalCode = defaultAdditionalQuestionsAnswers.postalCode
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
  })
}
