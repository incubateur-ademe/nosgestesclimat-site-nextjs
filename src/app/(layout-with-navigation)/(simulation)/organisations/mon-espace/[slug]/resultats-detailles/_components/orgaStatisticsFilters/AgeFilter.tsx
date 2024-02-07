import Trans from '@/components/translation/Trans'
import ComplexSelect from '@/design-system/inputs/ComplexSelect'
import { SimulationRecap } from '@/types/organizations'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { MultiValue, SingleValue } from 'react-select'

const STORAGE_KEY = 'ngc-organization-age-filter'

function getAgeOptions(simulationsRecap: SimulationRecap[]) {
  // Renvoie un tableau d'objets avec une valeur et un label
  // pour chaque tranche d'âge depuis "nés avant 1960" puis par dizaine : 1960-69 / 1970-1979...
  const currentYear = new Date().getFullYear()
  const firstYear = 1960

  const simulationsRecapUnder1960 = simulationsRecap.filter((simulation) => {
    const birthYear = dayjs(
      simulation.defaultAdditionalQuestionsAnswers?.birthDate
    ).year()

    return birthYear < firstYear
  })

  const ageOptions = [
    {
      value: ['', currentYear - firstYear],
      label: `Nés avant 1960 (${simulationsRecapUnder1960?.length})`,
      isDisabled: simulationsRecapUnder1960.length === 0,
    },
  ]

  for (let i = firstYear; i < currentYear; i += 10) {
    const simulationsRecapMatchingAge = simulationsRecap.filter(
      (simulation) => {
        const birthYear = dayjs(
          simulation.defaultAdditionalQuestionsAnswers?.birthDate
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
  simulationRecaps,
}: {
  simulationRecaps: SimulationRecap[]
}) {
  const [savedSelection, setSavedSelection] = useState<(string | number)[]>([])

  function handleSaveSelectionToLocalStorage(
    selectedOptions: MultiValue<string | number> | SingleValue<string | number>
  ) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedOptions))
  }

  useEffect(() => {
    const savedSelection = localStorage.getItem(STORAGE_KEY)

    if (savedSelection) {
      const parsedSelection = JSON.parse(savedSelection)
      setSavedSelection(parsedSelection)
    }
  }, [])

  return (
    <ComplexSelect
      className="w-56"
      name="age"
      isMulti
      options={getAgeOptions(simulationRecaps)}
      placeholder={<Trans>Tranche d'âge</Trans>}
      value={savedSelection as unknown as string | number}
      onChange={handleSaveSelectionToLocalStorage}
    />
  )
}
