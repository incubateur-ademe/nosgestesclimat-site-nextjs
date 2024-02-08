import Trans from '@/components/translation/Trans'
import ComplexSelect from '@/design-system/inputs/ComplexSelect'
import { SimulationRecap } from '@/types/organizations'
import { SetStateAction, useContext, useEffect, useState } from 'react'
import { MultiValue, SingleValue } from 'react-select'
import { FiltersContext } from '../FiltersProvider'

const STORAGE_KEY = 'ngc-organization-postalCode-filter'

function extractPostalCodesFromSimulationRecaps(
  simulationRecaps: SimulationRecap[]
) {
  const postalCodes = simulationRecaps.map(
    (simulationRecap) =>
      simulationRecap.defaultAdditionalQuestionsAnswers.postalCode
  )

  return postalCodes.sort().reduce(
    (acc, postalCode) => {
      acc[postalCode] = (acc[postalCode] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )
}

export default function DepartementFilter({
  simulationRecaps,
  filteredSimulationRecaps,
}: {
  simulationRecaps: SimulationRecap[]
  filteredSimulationRecaps: SimulationRecap[]
}) {
  const [savedSelection, setSavedSelection] = useState<(string | number)[]>([])

  function handleSaveSelectionToLocalStorage(
    selectedOptions: MultiValue<string | number> | SingleValue<string | number>
  ) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedOptions))

    setPostalCodeFilters(
      selectedOptions as unknown as SetStateAction<{ value: string }[]>
    )
  }

  useEffect(() => {
    const savedSelection = localStorage.getItem(STORAGE_KEY)

    if (savedSelection) {
      const parsedSelection = JSON.parse(savedSelection)
      setSavedSelection(parsedSelection)
    }
  }, [])

  const { setPostalCodeFilters } = useContext(FiltersContext)

  const options = extractPostalCodesFromSimulationRecaps(simulationRecaps)

  return (
    <ComplexSelect
      className="w-56"
      name="age"
      isMulti
      isSearchable
      // @ts-expect-error fix this
      options={Object.keys(options).map((postalCode) => ({
        value: postalCode,
        label: `${postalCode} (${options[postalCode]})`,
        isDisabled: !filteredSimulationRecaps.some(
          (simulationRecap) =>
            simulationRecap.defaultAdditionalQuestionsAnswers.postalCode ===
            postalCode
        ),
      }))}
      placeholder={<Trans>Département</Trans>}
      value={savedSelection as unknown as string | number}
      onChange={handleSaveSelectionToLocalStorage}
    />
  )
}
