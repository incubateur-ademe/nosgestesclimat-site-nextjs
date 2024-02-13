import Trans from '@/components/translation/Trans'
import ComplexSelect from '@/design-system/inputs/ComplexSelect'
import { SimulationRecap } from '@/types/organisations'
import dayjs from 'dayjs'
import { SetStateAction, useContext } from 'react'
import { MultiValue, SingleValue } from 'react-select'
import { FiltersContext } from '../FiltersProvider'

function getAgeOptions({
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
      const birthYear = dayjs(
        simulation.defaultAdditionalQuestionsAnswers?.birthdate
      ).year()

      return birthYear < firstYear
    }
  )

  const ageOptions = [
    {
      value: ['', currentYear - firstYear],
      label: `Nés avant 1960 (${simulationsRecapUnder1960?.length})`,
      isDisabled: simulationsRecapUnder1960.length === 0,
    },
  ]

  for (let i = firstYear; i < currentYear; i += 10) {
    const simulationsRecapMatchingAge = filteredSimulationRecaps.filter(
      (simulation) => {
        const birthYear = dayjs(
          simulation.defaultAdditionalQuestionsAnswers?.birthdate
        ).year()

        return birthYear >= i - 10 && birthYear < i
      }
    )

    ageOptions.push({
      value: [
        currentYear - i,
        currentYear - (i + 9) > 0 ? currentYear - (i + 9) : 0,
      ],
      label: `Nés entre ${i} et ${i + 9 > currentYear ? currentYear : i + 9} (${
        simulationsRecapMatchingAge.length
      })`,
      isDisabled: simulationsRecapMatchingAge.length === 0,
    })
  }

  return ageOptions
}

export default function AgeFilter({
  filteredSimulationRecaps,
}: {
  filteredSimulationRecaps: SimulationRecap[]
}) {
  const { setAgeFilters } = useContext(FiltersContext)

  function handleChange(
    selectedOptions: MultiValue<string | number> | SingleValue<string | number>
  ) {
    setAgeFilters(
      selectedOptions as unknown as SetStateAction<
        { value: [number, number] }[]
      >
    )
  }

  return (
    <ComplexSelect
      className="w-56"
      name="age"
      isMulti
      // @ts-expect-error fix this
      options={
        getAgeOptions({
          filteredSimulationRecaps,
        }) as unknown as {
          value: string
          label: string
          isDisabled?: boolean
        }[]
      }
      placeholder={<Trans>Tranche d'âge</Trans>}
      onChange={handleChange}
    />
  )
}
